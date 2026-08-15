# ==========================================================
# Beatify Music Streaming Platform
#
# File: services/online_service.py
#
# Purpose:
# Handles active user tracking.
#
# ==========================================================

from datetime import timedelta

from database.db import db
from models.user import User
from models.user_session import UserSession
from utils.datetime_helper import utc_now


# ==========================================================
# Set User Active
# ==========================================================

def set_user_active(user_id):

    try:

        session = UserSession.query.filter_by(
            user_id=user_id
        ).first()

        if session:

            session.is_active = True
            session.last_seen = utc_now()

        else:

            session = UserSession(
                user_id=user_id,
                is_active=True,
                last_seen=utc_now()
            )

            db.session.add(session)

        db.session.commit()

        return True

    except Exception as error:

        db.session.rollback()

        print(
            "Set User Active Error:",
            error
        )

        return False


# ==========================================================
# Update User Activity
# ==========================================================

def update_user_activity(user_id):

    try:

        session = UserSession.query.filter_by(
            user_id=user_id
        ).first()

        if not session:

            return set_user_active(user_id)

        session.is_active = True
        session.last_seen = utc_now()

        db.session.commit()

        return True

    except Exception as error:

        db.session.rollback()

        print(
            "Update User Activity Error:",
            error
        )

        return False


# ==========================================================
# Set User Inactive
# ==========================================================

def set_user_inactive(user_id):

    try:

        session = UserSession.query.filter_by(
            user_id=user_id
        ).first()

        if not session:

            return True

        session.is_active = False
        session.last_seen = utc_now()

        db.session.commit()

        return True

    except Exception as error:

        db.session.rollback()

        print(
            "Set User Inactive Error:",
            error
        )

        return False


# ==========================================================
# Get Active Users
# ==========================================================

def get_active_users(current_user_id):

    try:

        # --------------------------------------------------
        # Active users whose last activity is recent
        # --------------------------------------------------

        active_limit = (
            utc_now() -
            timedelta(seconds=90)
        )

        users = (
            db.session.query(User)
            .join(
                UserSession,
                User.id == UserSession.user_id
            )
            .filter(
                UserSession.is_active == True,
                UserSession.last_seen >= active_limit,
                User.id != current_user_id
            )
            .order_by(
                User.full_name.asc()
            )
            .all()
        )

        return users

    except Exception as error:

        print(
            "Get Active Users Error:",
            error
        )

        return []