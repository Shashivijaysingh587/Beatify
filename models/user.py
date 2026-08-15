"""
=========================================================
Beatify Music Streaming Platform

File: models/user.py

Purpose:
User model for Beatify authentication system.

Author: Pallav Kumar
=========================================================
"""

from datetime import datetime
from utils.datetime_helper import (
    utc_now,
    normalize_datetime
)

from database.db import db


# =========================================================
# User Model
# =========================================================

class User(db.Model):
    """
    Stores registered users.
    """

    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    full_name = db.Column(
        db.String(100),
        nullable=False
    )

    username = db.Column(
        db.String(50),
        unique=True,
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    profile_image = db.Column(
        db.String(255),
        nullable=True
    )

    password_hash = db.Column(
        db.String(255),
        nullable=False
    )

    is_verified = db.Column(
        db.Boolean,
        default=False
    )

    is_active = db.Column(
    db.Boolean,
    default=True,
    nullable=False
    )

    is_admin = db.Column(
    db.Boolean,
    default=False,
    nullable=False
    )

    reset_password_otp = db.Column(
        db.String(6),
        nullable=True
    )

    reset_password_otp_expiry = db.Column(
        db.DateTime,
        nullable=True
    )

    created_at = db.Column(
        db.DateTime,
        default=utc_now,
    )

    updated_at = db.Column(
        db.DateTime,
        default=utc_now,
        onupdate=utc_now,
    )

    def __repr__(self):
        return f"<User {self.username}>"