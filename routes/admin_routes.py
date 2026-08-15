"""
=========================================================
Beatify Music Streaming Platform

File: routes/admin_routes.py

Purpose:
Admin dashboard and user management routes.

Author: Pallav Kumar
=========================================================
"""

from flask import (
    Blueprint,
    jsonify,
    session,
    render_template,
    redirect
)

from models.user import User
from database.db import db


# =========================================================
# Admin Blueprint
# =========================================================

admin_bp = Blueprint(
    "admin",
    __name__,
    url_prefix="/admin"
)

@admin_bp.route(
    "/test",
    methods=["GET"]
)
def admin_test():

    return jsonify({
        "success": True,
        "message": "Admin route is working."
    })

# =========================================================
# Admin Dashboard Page
# =========================================================

@admin_bp.route(
    "/",
    methods=["GET"]
)
def admin_dashboard():

    # ----------------------------------------
    # Admin Check
    # ----------------------------------------

    if not session.get("is_admin"):

        return jsonify({

            "success": False,

            "message":
                "Unauthorized."

        }), 401


    # ----------------------------------------
    # Admin Dashboard
    # ----------------------------------------

   

    return render_template(
        "admin_dashboard.html"
    )

# =========================================================
# Admin Logout
# =========================================================

@admin_bp.route(
    "/logout",
    methods=["POST"]
)
def admin_logout():

    # ----------------------------------------
    # Clear Session
    # ----------------------------------------

    # session.clear()


    # ----------------------------------------
    # Response
    # ----------------------------------------

    return jsonify({

        "success": True,

        "message":
            "Logged out successfully."

    }), 200


# =========================================================
# Admin Users
# =========================================================

@admin_bp.route(
    "/users",
    methods=["GET"]
)
def get_admin_users():

    # ----------------------------------------
    # Temporary Admin Check
    # ----------------------------------------

    if not session.get("is_admin"):

        return jsonify({

            "success": False,

            "message":
                "Unauthorized."

        }), 401


    # ----------------------------------------
    # Get Users
    # ----------------------------------------

    users = User.query.all()


    # ----------------------------------------
    # Prepare Users
    # ----------------------------------------

    user_list = []


    for user in users:

        user_list.append({

            "id": user.id,

            "full_name":
                user.full_name,

            "username":
                user.username,

            "email":
                user.email,

            "profile_image":
                user.profile_image,

            "is_active":
                user.is_active,

        })


    # ----------------------------------------
    # Response
    # ----------------------------------------

    return jsonify({

        "success": True,

        "total_users":
            len(user_list),

        "users":
            user_list

    }), 200

# =========================================================
# Toggle User Active Status
# =========================================================

@admin_bp.route(
    "/users/<int:user_id>/toggle-status",
    methods=["POST"]
)
def toggle_user_status(user_id):

    # ----------------------------------------
    # Admin Check
    # ----------------------------------------

    if not session.get("is_admin"):

        return jsonify({

            "success": False,

            "message":
                "Unauthorized."

        }), 401


    # ----------------------------------------
    # Find User
    # ----------------------------------------

    user = User.query.get(user_id)


    if user is None:

        return jsonify({

            "success": False,

            "message":
                "User not found."

        }), 404


    # ----------------------------------------
    # Prevent Admin From Deactivating Himself
    # ----------------------------------------

    if user.id == session.get("user_id"):

        return jsonify({

            "success": False,

            "message":
                "You cannot deactivate your own account."

        }), 400


    # ----------------------------------------
    # Toggle Status
    # ----------------------------------------

    try:

        user.is_active = not user.is_active

        db.session.commit()


    except Exception as error:

        db.session.rollback()

        print(
            "Admin User Status Error:",
            error
        )

        return jsonify({

            "success": False,

            "message":
                "Unable to update user status."

        }), 500


    # ----------------------------------------
    # Response
    # ----------------------------------------

    return jsonify({

        "success": True,

        "message":
            (
                "User activated successfully."
                if user.is_active
                else
                "User deactivated successfully."
            ),

        "user": {

            "id":
                user.id,

            "is_active":
                user.is_active

        }

    }), 200