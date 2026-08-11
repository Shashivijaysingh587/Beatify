"""
=========================================================
Beatify Music Streaming Platform

File: utils/auth_helper.py

Purpose:
Authentication helper functions.

Author: Pallav Kumar
=========================================================
"""

from flask import session

from services.auth_service import get_user_by_id


# ==========================================================
# Get Current User
# ==========================================================

def get_current_user():
    """
    Return the currently logged-in user.

    Automatically clears an invalid session.

    Returns:
        User | None
    """

    user_id = session.get("user_id")

    if user_id is None:

        return None

    user = get_user_by_id(user_id)

    if user is None:

        session.clear()

        return None

    return user