"""
=========================================================
Beatify Music Streaming Platform

File : services/auth_service.py

Purpose:
Authentication related database operations.

Author : Pallav Kumar
=========================================================
"""

from utils.datetime_helper import (
    utc_now,
    normalize_datetime
)
from models.user import User
from models.pending_signup import PendingSignup
from database.db import db
from utils.password import hash_password
from utils.otp import (
    hash_otp,
    verify_otp
)
from datetime import datetime, timedelta, UTC
from flask import session
from utils.response_helper import (
    success_response,
    error_response
)

from services.email_service import (
    generate_otp,
    send_verification_otp
)


# ==========================================================
# Check Username
# ==========================================================

def username_exists(username):
    """
    Returns True if username already exists.
    """
    return User.query.filter_by(
        username=username
    ).first() is not None


# ==========================================================
# Check Email
# ==========================================================

def email_exists(email):
    """
    Returns True if email already exists.
    """
    return User.query.filter_by(
        email=email
    ).first() is not None

# ==========================================================
# Check Reserved Username
# ==========================================================

def username_reserved(username):
    """
    Returns True if username is currently reserved
    by a valid pending signup.
    """

    pending_signup = PendingSignup.query.filter_by(

        username=username

    ).first()

    # ----------------------------------------
    # No Pending Signup
    # ----------------------------------------

    if pending_signup is None:

        return False

    # ----------------------------------------
    # Expired Pending Signup
    # ----------------------------------------

    expiry = normalize_datetime(
    pending_signup.otp_expiry
    )

    if expiry <= utc_now():

        delete_pending_signup(pending_signup)

        return False

    # ----------------------------------------
    # Username Reserved
    # ----------------------------------------

    return True



# ==========================================================
# Check Reserved Email
# ==========================================================

def email_reserved(email):
    """
    Returns True if email is already reserved.
    """

    return PendingSignup.query.filter_by(

        email=email

    ).first() is not None

# ==========================================================
# Create Pending Signup
# ==========================================================

def create_pending_signup(
    full_name,
    username,
    email,
    password_hash,
    otp_hash,
    otp_expiry
):
    """
    Create a new pending signup record.
    """

    try:

        pending_signup = PendingSignup(

            full_name=full_name,

            username=username,

            email=email,

            password_hash=password_hash,

            otp_hash=otp_hash,

            otp_expiry=otp_expiry

        )

        db.session.add(pending_signup)

        db.session.commit()

        return pending_signup

    except Exception:

        db.session.rollback()

        raise

# ==========================================================
# Get Pending Signup By Email
# ==========================================================

def get_pending_signup_by_email(email):
    """
    Returns pending signup by email.
    """

    return PendingSignup.query.filter_by(
        email=email
    ).first()

# ==========================================================
# Get Pending Signup By Username
# ==========================================================

def get_pending_signup_by_username(username):
    """
    Returns pending signup by username.
    """

    return PendingSignup.query.filter_by(

        username=username

    ).first()

# ==========================================================
# Delete Pending Signup
# ==========================================================

def delete_pending_signup(pending_signup):
    """
    Delete pending signup from database.
    """

    try:

        db.session.delete(pending_signup)

        db.session.commit()

    except Exception as e:

        db.session.rollback()

        raise

# ==========================================================
# Cleanup Expired Pending Signups
# ==========================================================

def cleanup_expired_pending_signups():
    """
    Remove all expired pending signup records.

    Returns:
        int: Number of deleted records.
    """

    try:

        deleted_count = PendingSignup.query.filter(

            PendingSignup.otp_expiry < datetime.now(UTC)

        ).delete()

        db.session.commit()

        return deleted_count

    except Exception:

        db.session.rollback()

        raise

# ==========================================================
# Check Signup Data
# ==========================================================

def check_signup_data(full_name, username, email, password):
    """
    Validate signup data before sending OTP.
    """
   

    # ----------------------------------------
    # Cleanup Expired Pending Signups
    # ----------------------------------------

    cleanup_expired_pending_signups()

    # ----------------------------------------
    # Debug
    # ----------------------------------------

        
    # ----------------------------------------
    # Username Already Exists
    # ----------------------------------------

    if username_exists(username):

        return error_response(

            "Username already taken.",

            {

                "field": "username"

            }

        )
    
    # ----------------------------------------
    # Pending Username
    # ----------------------------------------

    pending_username = get_pending_signup_by_username(

        username

    )

    if (

        pending_username is not None

        and

        pending_username.email != email.lower().strip()

    ):

        return error_response(

            "This username is currently being verified. Please try again later.",

            {

                "field": "username"

            }

        )

    # ----------------------------------------
    # Email Already Exists
    # ----------------------------------------

    if email_exists(email):

        return error_response(

            "Email already exists.",

            {

                "field": "email"

            }

        )

    # ----------------------------------------
    # Pending Email
    # ----------------------------------------

    pending_email = get_pending_signup_by_email(

        email.lower().strip()

    )

    if (

        pending_email is not None

        and

        pending_email.username != username.strip()

    ):

        return error_response(

            "This email is currently being verified. Please complete verification first or try again later.",

            {

                "field": "email"

            }

        )


    # ----------------------------------------
    # Prepare Signup Data
    # ----------------------------------------

    signup_data = {

        "full_name": full_name.strip(),

        "username": username.strip(),

        "email": email.strip().lower(),

        "password_hash": hash_password(password)

    }

    return success_response(

        "Signup data validated.",

        {

            "signup_data": signup_data

        }

    )



# ==========================================================
# Send Signup OTP
# ==========================================================

def send_signup_otp(signup_data):
    """
    Generate and send signup OTP.

    Flow:
        1. Remove expired pending signups.
        2. Check existing pending signup.
        3. Generate OTP.
        4. Hash OTP.
        5. Send verification email.
        6. Store pending signup.
    """

    # ----------------------------------------
    # Track Expired OTP
    # ----------------------------------------

    otp_expired = False

    # ----------------------------------------
    # Cleanup Expired Pending Signups
    # ----------------------------------------

    try:

        cleanup_expired_pending_signups()

    except Exception:

        return error_response(

            "Something went wrong. Please try again."

        )

    # ----------------------------------------
    # Get Existing Pending Signup
    # ----------------------------------------

    try:

        pending_signup = get_pending_signup_by_email(

            signup_data["email"]

        )

    except Exception:

        return error_response(

            "Something went wrong. Please try again."

        )

    # ----------------------------------------
    # Existing Pending Signup
    # ----------------------------------------

    if pending_signup:

        signup_changed = (

            pending_signup.username != signup_data["username"]

            or

            pending_signup.full_name != signup_data["full_name"]

            or

            pending_signup.password_hash != signup_data["password_hash"]

        )

        # ----------------------------------------
        # Signup Data Changed
        # ----------------------------------------

        if signup_changed:

            current_time = utc_now()

            expiry_time = normalize_datetime(

                pending_signup.otp_expiry

            )

            remaining_seconds = max(

                0,

                int(

                    (

                        expiry_time -

                        current_time

                    ).total_seconds()

                )

            )

            return error_response(

                "A verification is already in progress. Starting a new signup will invalidate your previous verification code.",

                {

                    "pending_signup_changed": True,

                    "email": pending_signup.email,

                    "remaining_seconds": remaining_seconds

                }

            )

            # ----------------------------------------
            # Same Signup Data
            # ----------------------------------------

        else:

                current_time = utc_now()

                expiry_time = normalize_datetime(

                    pending_signup.otp_expiry

                )

                # ----------------------------------------
                # OTP Still Valid
                # ----------------------------------------

                if current_time < expiry_time:

                    remaining_seconds = int(

                        (expiry_time - current_time).total_seconds()

                    )

                    return error_response(

                        "Your verification code is still valid. Please enter the OTP to continue.",

                        {

                            "pending_verification": True,

                            "email": pending_signup.email,

                            "remaining_seconds": remaining_seconds

                        }

                    )

                # ----------------------------------------
                # OTP Expired
                # ----------------------------------------

                try:

                    delete_pending_signup(

                        pending_signup

                    )

                except Exception:

                    return error_response(

                        "Something went wrong. Please try again."

                    )

                pending_signup = None

                otp_expired = True

    # # ----------------------------------------
    # # Continue New Signup
    # # ----------------------------------------

    # pending_signup = None

    # otp_expired = True

    # ----------------------------------------
    # Generate OTP
    # ----------------------------------------

    otp = generate_otp()

    otp_hash = hash_otp(otp)

    otp_expiry = utc_now() + timedelta(minutes=5)

    # ----------------------------------------
    # Send Verification Email
    # ----------------------------------------

    email_sent = send_verification_otp(

        email=signup_data["email"],

        full_name=signup_data["full_name"],

        otp=otp

    )

    if not email_sent:

        return error_response(

            "Failed to send verification email."

        )


    # ----------------------------------------
    # Create Pending Signup
    # ----------------------------------------

    try:

        pending_signup = create_pending_signup(

            full_name=signup_data["full_name"],

            username=signup_data["username"],

            email=signup_data["email"],

            password_hash=signup_data["password_hash"],

            otp_hash=otp_hash,

            otp_expiry=otp_expiry

        )

    except Exception:

        return error_response(

            "Something went wrong. Please try signing up again."

        )



    # ----------------------------------------
    # Success Message
    # ----------------------------------------

    if otp_expired:

        message = (

            "Your previous verification code expired. "
            "A new verification code has been sent to your email."

        )

    else:

        message = (

            "Verification code sent successfully."

        )


    return success_response(

        message,

        {

            "otp_sent": True,

            "email": signup_data["email"],

            "remaining_seconds": 300

        }

    )



# ==========================================================
# Resend Signup OTP
# ==========================================================

def resend_signup_otp(email):
    """
    Generate and send a new verification code
    for a pending signup.
    """


    # ----------------------------------------
    # Cleanup Expired Pending Signups
    # ----------------------------------------



    # ----------------------------------------
    # Find Pending Signup
    # ----------------------------------------

    try:

        pending_signup = get_pending_signup_by_email(

            email.strip().lower()

        )

    except Exception:

        return error_response(

            "Something went wrong. Please try again."

        )

    if pending_signup is None:

    
        return error_response(

            "Your signup session has expired. Please sign up again."

        )

    # ----------------------------------------
    # Generate New OTP
    # ----------------------------------------

    otp = generate_otp()

    otp_hash = hash_otp(otp)

    otp_expiry = utc_now() + timedelta(minutes=5)

    # ----------------------------------------
    # Send Verification Email
    # ----------------------------------------

    email_sent = send_verification_otp(

        email=pending_signup.email,

        full_name=pending_signup.full_name,

        otp=otp

    )

    if not email_sent:

        return error_response(

            "We couldn't send the verification code. Please try again."

        )

    # ----------------------------------------
    # Update Pending Signup
    # ----------------------------------------

    try:

        pending_signup.otp_hash = otp_hash

        pending_signup.otp_expiry = otp_expiry
    

        db.session.commit()

  
        updated_pending_signup = get_pending_signup_by_email(

            pending_signup.email

        )

 

    except Exception:

        db.session.rollback()

        return error_response(

            "Something went wrong. Please try again."

        )



    # ----------------------------------------
    # Success
    # ----------------------------------------

    return success_response(

        "Verification code sent successfully.",

        {

            "email": pending_signup.email,

            "remaining_seconds": 300

        }

    )


# ==========================================================
# Verify Signup OTP
# ==========================================================

def verify_signup_otp(email, otp):
    """
    Verify signup OTP and create a verified user.
    """

    # ----------------------------------------
    # Get Pending Signup
    # ----------------------------------------

    try:

        pending_signup = get_pending_signup_by_email(

            email.strip().lower()

        )

    except Exception:

        return error_response(

            "Something went wrong. Please try again."

        )

    if pending_signup is None:

        return error_response(

            "Your signup session has expired. Please create your account again."

        )

    if not otp.isdigit() or len(otp) != 6:

        return error_response(

            "Please enter a valid 6-digit verification code."

        )

    # ----------------------------------------
    # OTP Expired
    # ----------------------------------------

    expiry_time = normalize_datetime(

        pending_signup.otp_expiry

    )

    if utc_now() > expiry_time:

        try:

            delete_pending_signup(

                pending_signup

            )

        except Exception:

            return error_response(

                "Something went wrong. Please try again."

            )

        return error_response(

            "Your verification code has expired. Please sign up again."

        )

    # ----------------------------------------
    # Invalid OTP
    # ----------------------------------------

    if not verify_otp(

        otp,

        pending_signup.otp_hash

    ):

        return error_response(

            "The verification code you entered is incorrect. Please try again."

        )

    # ----------------------------------------
    # Username Already Exists
    # ----------------------------------------

    if username_exists(

        pending_signup.username

    ):

        try:

            delete_pending_signup(

                pending_signup

            )

        except Exception as e:

            print(e)

        return error_response(

            "Username already taken.",

            {

                "field": "username"

            }

        )

    # ----------------------------------------
    # Email Already Exists
    # ----------------------------------------

    if email_exists(

        pending_signup.email

    ):

        try:

            delete_pending_signup(

                pending_signup

            )

        except Exception as e:

            print(e)

        return error_response(

            "Email already exists.",

            {

                "field": "email"

            }

        )

    # ----------------------------------------
    # Create User
    # ----------------------------------------

    try:

        user = User(

            full_name=pending_signup.full_name,

            username=pending_signup.username,

            email=pending_signup.email,

            password_hash=pending_signup.password_hash,

            is_verified=True

        )

        db.session.add(user)

        db.session.commit()
        print("=" * 60)
        print("USER CREATED SUCCESSFULLY")
        print("ID :", user.id)
        print("Username :", user.username)
        print("Email :", user.email)
        print("=" * 60)

        saved_user = User.query.filter_by(

            email=user.email

        ).first()

        print("DATABASE CHECK :", saved_user)
        print("=" * 60)

    except Exception:

        db.session.rollback()

        return error_response(

            "Something went wrong. Please try again."

        )

    # ----------------------------------------
    # Remove Pending Signup
    # ----------------------------------------

    try:

        delete_pending_signup(

            pending_signup

        )

    except Exception:

        return error_response(

            "Your account was created successfully, but cleanup failed. Please contact support."

        )

    # ----------------------------------------
    # Login User
    # ----------------------------------------

    session["user_id"] = user.id
    session["email"] = user.email

    session["username"] = user.username

    session["full_name"] = user.full_name

    # ----------------------------------------
    # Success
    # ----------------------------------------

    return success_response(

        "Email verified successfully. Welcome to Beatify!"
    )
    




 

# TODO:
# Remove after verify_signup_otp() is completed.

# ==========================================================
# Create User
# ==========================================================

def create_user(full_name, username, email, password):
    """
    Create a new user account.
    """

    # Check username
    if username_exists(username):

        return (
            False,
            "Username already taken.",
            "username"
        )

    # Check email
    if email_exists(email):

        return (
            False,
            "Email already exists.",
            "email"
        )

    # Hash password
    password_hash = hash_password(password)

    # Generate OTP
    otp = generate_otp()

    # Create user object
    user = User(
        full_name=full_name,
        username=username,
        email=email,
        password_hash=password_hash,

        is_verified=False,

        verification_otp=otp,

        verification_otp_expiry=
            datetime.now(UTC) + timedelta(minutes=5)
    )

    # Save to database
    db.session.add(user)
    db.session.commit()

    # Send OTP Email
    email_sent = send_verification_otp(
        email=user.email,
        full_name=user.full_name,
        otp=otp
    )

    if not email_sent:

        return (
            False,
            "Failed to send verification email.",
            None
        )

    return (
        True,
        "Verification OTP sent successfully.",
        None
    )

# ==========================================================
# Login User
# ==========================================================

from utils.password import verify_password


def login_user(identifier, password):
    """
    Login using username or email.
    """

    # Find user by username or email
    user = User.query.filter(
        (User.username == identifier) |
        (User.email == identifier)
    ).first()

    # User not found
    if not user:
        return False, "Invalid username/email or password.",None

    # Verify password
    if not verify_password(password, user.password_hash):
        return False, "Invalid username/email or password.",None

    return True, "Login successful.",user

# ==========================================================
# Get User By ID
# ==========================================================

def get_user_by_id(user_id):
    """
    Return user object using user id.
    """
    return User.query.get(user_id)

# ==========================================================
# Update User Profile
# ==========================================================

def update_user_profile(user_id, full_name, username):
    """
    Update user's full name and username.
    """

    user = db.session.get(User, user_id)

    if user is None:

        return False, "User not found."

    # ----------------------------------------
    # Username Already Exists
    # ----------------------------------------

    existing_user = User.query.filter_by(username=username).first()

    if existing_user and existing_user.id != user.id:

        return False, "Username already exists."

    # ----------------------------------------
    # Update
    # ----------------------------------------

    user.full_name = full_name.strip()

    user.username = username.strip()

    db.session.commit()

    return True, "Profile updated successfully."


# Legacy Function
# Will be removed after new authentication flow is complete.

# ==========================================================
# Verify Email OTP
# ==========================================================

def verify_email_otp(email, otp):
    """
    Verify email OTP.
    """

    user = User.query.filter_by(
        email=email
    ).first()

    if user is None:

        return (
            False,
            "User not found."
        )

    if user.is_verified:

        return (
            False,
            "Account already verified."
        )

    if user.verification_otp != otp:

        return (
            False,
            "Invalid OTP."
        )

    if (
        user.verification_otp_expiry is None or
        datetime.now(UTC) > user.verification_otp_expiry
    ):

        return (
            False,
            "OTP has expired."
        )

    # Account Verified
    user.is_verified = True

    user.verification_otp = None

    user.verification_otp_expiry = None

    db.session.commit()

    return (
        True,
        "Account verified successfully."
    )