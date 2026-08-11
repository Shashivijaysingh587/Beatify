"""
=========================================================
Beatify Music Streaming Platform

File : routes/auth_routes.py

Purpose:
Authentication Routes

Author : Pallav Kumar
=========================================================
"""


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
from services.auth_service import (
    check_signup_data,
    send_signup_otp,
    resend_signup_otp,
    login_user,
    get_user_by_id,
    update_user_profile,
    verify_signup_otp
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
        
        print(session)

        return jsonify({

            "success": True,

            "message": message
            

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

    session.clear()

    return jsonify({

        "success": True,

        "message": "Logged out successfully."

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
