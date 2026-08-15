"""
=========================================================
Beatify Music Streaming Platform

File : routes/auth_routes.py

Purpose:
Authentication Routes

Author : Pallav Kumar
=========================================================
"""
import traceback
from services.online_service import (
    set_user_active,
    set_user_inactive,
    update_user_activity,
    get_active_users
)
from models.user import User
from flask import Blueprint, request, jsonify, session
from services.user_service import upload_profile_image
from utils.auth_helper import get_current_user
from flask import (
    Blueprint,
    request,
    jsonify,
    session,
    url_for
)
from services.email_service import (
    send_password_reset_otp
)
from datetime import timedelta
from services.auth_service import (
    check_signup_data,
    send_signup_otp,
    resend_signup_otp,
    login_user,
    get_user_by_id,
    update_user_profile,
    verify_signup_otp,

    # Password Reset
    verify_password_reset_otp,
    generate_otp,
    hash_otp,
    save_password_reset_otp,
    utc_now,
    reset_password,
    resend_password_reset_otp
)
auth_bp = Blueprint(
    "auth",
    __name__
)


# ==========================================================
# Signup Route
# ==========================================================

@auth_bp.route("/signup", methods=["POST"])
def signup():
    """
    Register a new user.
    """

    data = request.get_json()

    # ----------------------------------------
    # Validate Signup Data
    # ----------------------------------------

    result = check_signup_data(

        full_name=data.get("full_name"),

        username=data.get("username"),

        email=data.get("email"),

        password=data.get("password")

    )

    if not result["success"]:

        return jsonify(result), 400


    # ----------------------------------------
    # Send OTP
    # ----------------------------------------

    result = send_signup_otp(

        result["data"]["signup_data"]

    )

    # if result["success"]:

    #     return jsonify(result), 200

    # return jsonify(result), 400

    if result["success"]:

        return jsonify(result), 200

    print(result)

    return jsonify(result), 400

# ==========================================================
# Resend Signup OTP
# ==========================================================
@auth_bp.route("/resend-otp", methods=["POST"])
def resend_otp():
    """
    Resend verification code.
    """

    data = request.get_json()

    result = resend_signup_otp(

        email=data.get("email")

    )
    print(result)

    if result["success"]:

        return jsonify(result), 200

    return jsonify(result), 400

 

# ==========================================================
# Login Route
# ==========================================================

@auth_bp.route("/login", methods=["POST"])
def login():
    """
    Login existing user.
    """

    data = request.get_json()

    success, message, user = login_user(
    identifier=data.get("identifier"),
    password=data.get("password")
)

    if success:

        session["user_id"] = user.id
        session["username"] = user.username
        session["full_name"] = user.full_name
        session["is_admin"] = user.is_admin

        set_user_active(user.id)
        
        print(session)

        return jsonify({

            "success": True,

            "message": message,

            "user": {

                "id":
                    user.id,

                "full_name":
                    user.full_name,

                "username":
                    user.username,

                "email":
                    user.email,

                "profile_image":
                    user.profile_image,

                "is_admin":
                    user.is_admin

            }

        }), 200

    return jsonify({

        "success": False,

        "message": message

    }), 401

# ==========================================================
# Logout Route
# ==========================================================

@auth_bp.route("/logout", methods=["POST"])
def logout():
    """
    Logout current user.
    """

    user_id = session.get("user_id")

    if user_id:

        set_user_inactive(user_id)

    session.clear()

    return jsonify({

        "success": True,

        "message": "Logged out successfully."

    }), 200

@auth_bp.route("/activity/heartbeat", methods=["POST"])
def activity_heartbeat():
    """
    Update current user's activity.
    """

    user_id = session.get("user_id")

    if not user_id:

        return jsonify({
            "success": False,
            "message": "User not logged in."
        }), 401

    success = update_user_activity(user_id)

    if not success:

        return jsonify({
            "success": False,
            "message": "Unable to update activity."
        }), 500

    return jsonify({
        "success": True
    }), 200



@auth_bp.route("/api/active-users", methods=["GET"])
def active_users():

    user_id = session.get("user_id")

    if not user_id:

        return jsonify({

            "success": False,

            "message": "User not logged in."

        }), 401


    users = get_active_users(user_id)


    active_user_list = []


    for user in users:

        active_user_list.append({

            "id": user.id,

            "full_name": user.full_name,

            "username": user.username,

            "profile_image": user.profile_image

        })


    return jsonify({

        "success": True,

        "users": active_user_list,

        "count": len(active_user_list)

    }), 200

# ==========================================================
# Verify Signup OTP
# ==========================================================

@auth_bp.route("/verify-email-otp", methods=["POST"])
def verify_otp():
    """
    Verify signup OTP.
    """

    data = request.get_json()

    result = verify_signup_otp(

        email=data.get("email"),

        otp=data.get("otp")

    )

    status_code = 200 if result["success"] else 400

    return jsonify(result), status_code

# ==========================================================
# Get Current User Profile
# ==========================================================

@auth_bp.route("/profile", methods=["GET"])
def get_profile():
    """
    Return current logged-in user profile.
    """

    user = get_current_user()

    if user is None:

        return jsonify({

            "success": False,

            "message": "User not logged in."

        }), 401

    return jsonify({

        "success": True,

        "user": {

            "id": user.id,

            "full_name": user.full_name,

            "username": user.username,

            "email": user.email,
            
            "profile_image_url": url_for(

                "static",

                filename=f"uploads/profile_images/{user.profile_image}"

            )if user.profile_image else None
        
        }
        
    }), 200

# ==========================================================
# Update Current User Profile
# ==========================================================

@auth_bp.route("/profile", methods=["PUT"])
def update_profile():
    
    user = get_current_user()

    if user is None:

        return jsonify({

            "success": False,

            "message": "User not logged in."

        }), 401

    data = request.get_json()

    full_name = data.get("full_name", "").strip()

    username = data.get("username", "").strip()

    success, message = update_user_profile(

        user.id,

        full_name,

        username

    )
    if success:

        session["full_name"] = full_name

        session["username"] = username
    

    return jsonify({

        "success": success,

        "message": message

    })

# ==========================================================
# Current User
# ==========================================================

@auth_bp.route("/current-user", methods=["GET"])
def current_user():
    """
    Return current logged-in user.
    """

    user = get_current_user()

    if user is None:

        return jsonify({

            "logged_in": False

        }), 200

    return jsonify({

        "logged_in": True,

        "user": {

            "id": user.id,

            "full_name": user.full_name,

            "username": user.username,

            "email": user.email,

            "profile_image": user.profile_image

        }

    }),200

# ==========================================================
# Upload Profile Image
# ==========================================================

@auth_bp.route(

    "/profile/photo",

    methods=["POST"]

)
def upload_profile_photo():

    print("=" * 60)
    print("UPLOAD PHOTO ROUTE HIT")
    print("=" * 60)

    user = get_current_user()

    if user is None:

        return jsonify({

            "success": False,

            "message": "User not logged in."

        }), 401

    image = request.files.get(

        "image"

    )

    success, message, filename = upload_profile_image(

        user,

        image

    )

    if not success:

        return jsonify({

            "success": False,

            "message": message

        }), 400

    image_url = url_for(

        "static",

        filename=f"uploads/profile_images/{filename}"

    )

    return jsonify({

        "success": True,

        "message": message,

        "profile_image": filename,

        "image_url": image_url

    }), 200

@auth_bp.route(

    "/me",

    methods=["GET"]

)
def get_current_user_data():

    user = get_current_user()

    if user is None:

        return jsonify({

            "success": False,

            "user": None

        }), 401

    return jsonify({

        "success": True,

        "user": {

            "full_name": user.full_name,

            "username": user.username,

            "email": user.email,

            "profile_image": user.profile_image

        }

    }), 200

@auth_bp.route("/activity/offline", methods=["POST"])
def activity_offline():

    user_id = session.get("user_id")

    if not user_id:

        return jsonify({
            "success": False
        }), 401

    success = set_user_inactive(user_id)

    if not success:

        return jsonify({
            "success": False
        }), 500

    return jsonify({
        "success": True
    }), 200


@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():
    """
    Start password reset process.
    """

    data = request.get_json() or {}

    email = (
        data.get("email") or ""
    ).strip().lower()



    # ----------------------------------------
    # Validate Email
    # ----------------------------------------

    if not email:

        return jsonify({

            "success": False,

            "message":
                "Please enter your email address."

        }), 400


    # ----------------------------------------
    # Find User
    # ----------------------------------------

    user = User.query.filter_by(
        email=email
    ).first()


    if user is None:

        return jsonify({

            "success": False,

            "message":
                "No account found with this email address."

        }), 404


    # ----------------------------------------
    # Generate OTP
    # ----------------------------------------

    otp = generate_otp()


    # ----------------------------------------
    # Hash OTP
    # ----------------------------------------

    otp_hash = hash_otp(otp)
       


    # ----------------------------------------
    # OTP Expiry
    # ----------------------------------------

    otp_expiry = utc_now() + timedelta(
            minutes=5
        )



    # ----------------------------------------
    # Save OTP
    # ----------------------------------------

    try:

        save_password_reset_otp(

            email=email,

            otp_hash=otp_hash,

            otp_expiry=otp_expiry

        )

    except Exception as error:

        print(
            "Password Reset OTP Save Error:",
            error
        )

        return jsonify({

            "success": False,

            "message":
                "Something went wrong. Please try again."

        }), 500


    # ----------------------------------------
    # Send OTP Email
    # ----------------------------------------

    email_sent = send_password_reset_otp(

            email=email,

            full_name=user.full_name,

            otp=otp

        )



    if not email_sent:

        return jsonify({

            "success": False,

            "message":
                "Unable to send verification code. Please try again."

        }), 500


    # ----------------------------------------
    # Success
    # ----------------------------------------

    return jsonify({

        "success": True,

        "message":
            "A verification code has been sent to your email.",

        "data": {

            "email": email,

            "remaining_seconds": 300

        }

    }), 200

@auth_bp.route(
    "/verify-password-reset-otp",
    methods=["POST"]
)
def verify_password_reset_otp_route():

    data = request.get_json() or {}


    email = (
        data.get("email") or ""
    ).strip().lower()


    otp = (
        data.get("otp") or ""
    ).strip()


    result = verify_password_reset_otp(
        email,
        otp
    )


    # ----------------------------------------
    # OTP Verification Failed
    # ----------------------------------------

    if not result["success"]:

        return jsonify(
            result
        ), 400


    # ----------------------------------------
    # OTP Verified
    # ----------------------------------------
    #
    # Allow password reset only after
    # successful OTP verification.
    # ----------------------------------------

    session[
        "password_reset_verified_email"
    ] = email


    # ----------------------------------------
    # Success
    # ----------------------------------------

    return jsonify(
        result
    ), 200



@auth_bp.route(
    "/resend-password-reset-otp",
    methods=["POST"]
)
def resend_password_reset_otp_route():

    try:

        # ----------------------------------------
        # Request Data
        # ----------------------------------------

        data = request.get_json() or {}


        email = (
            data.get("email") or ""
        ).strip().lower()


        print(
            "Password Reset Resend Email:",
            email
        )


        # ----------------------------------------
        # Validate Email
        # ----------------------------------------

        if not email:

            return jsonify({

                "success": False,

                "message":
                    "Email address is required."

            }), 400


        # ----------------------------------------
        # Resend OTP
        # ----------------------------------------

        result = resend_password_reset_otp(
            email
        )


        print(
            "Password Reset Resend Result:",
            result
        )


        # ----------------------------------------
        # Response
        # ----------------------------------------

        status_code = (
            200
            if result["success"]
            else 400
        )


        return jsonify(
            result
        ), status_code


    except Exception as error:

        print(
            "\n========================================"
        )

        print(
            "PASSWORD RESET RESEND ERROR"
        )

        print(
            "========================================"
        )

        print(
            traceback.format_exc()
        )

        print(
            "========================================\n"
        )


        return jsonify({

            "success": False,

            "message":
                "Something went wrong. Please try again.",

            "debug":
                str(error)

        }), 500

@auth_bp.route(
    "/reset-password",
    methods=["POST"]
)
def reset_password_route():

    # ----------------------------------------
    # Check OTP Verification
    # ----------------------------------------

    verified_email = session.get(
        "password_reset_verified_email"
    )


    if not verified_email:

        return jsonify({

            "success": False,

            "message":
                "Password reset session is invalid or expired."

        }), 401


    # ----------------------------------------
    # Request Data
    # ----------------------------------------

    data = request.get_json() or {}


    new_password = (
        data.get("new_password") or ""
    )


    # ----------------------------------------
    # Validate Password
    # ----------------------------------------

    if not new_password:

        return jsonify({

            "success": False,

            "message":
                "New password is required."

        }), 400


    # ----------------------------------------
    # Reset Password
    # ----------------------------------------

    success, message = reset_password(
        verified_email,
        new_password
    )


    if not success:

        return jsonify({

            "success": False,

            "message": message

        }), 400


    # ----------------------------------------
    # Remove Reset Authorization
    # ----------------------------------------

    session.pop(
        "password_reset_verified_email",
        None
    )


    # ----------------------------------------
    # Success
    # ----------------------------------------

    return jsonify({

        "success": True,

        "message":
            "Password reset successfully."

    }), 200

# =========================================================
# Session Status
# =========================================================

@auth_bp.route(
    "/session-status",
    methods=["GET"]
)
def session_status():

    user = get_current_user()


    # ----------------------------------------
    # User Not Logged In / Deactivated
    # ----------------------------------------

    if user is None:

        return jsonify({

            "success": True,

            "authenticated": False

        }), 200


    # ----------------------------------------
    # User Active
    # ----------------------------------------

    return jsonify({

        "success": True,

        "authenticated": True,

        "user": {

            "id": user.id,

            "username":
                user.username,

            "full_name":
                user.full_name,

            "is_admin":
                user.is_admin

        }

    }), 200
