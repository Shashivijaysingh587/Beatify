"""
=========================================================
Beatify Music Streaming Platform

File: models/pending_signup.py

Purpose:
Stores temporary pending signup records until
email verification is completed.

Author: Pallav Kumar
=========================================================
"""

from datetime import datetime,UTC
from utils.datetime_helper import (
    utc_now,
    normalize_datetime
)

from database.db import db


# =========================================================
# Pending Signup Model
# =========================================================

class PendingSignup(db.Model):
    """
    Stores temporary signup information
    before email verification.
    """

    __tablename__ = "pending_signups"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

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

    password_hash = db.Column(
        db.String(255),
        nullable=False
    )

    otp_hash = db.Column(
        db.String(255),
        nullable=False
    )

    otp_expiry = db.Column(
        db.DateTime,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=utc_now,
    )

    def __repr__(self):
        return f"<PendingSignup {self.email}>"