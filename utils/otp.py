"""
=========================================================
Beatify Music Streaming Platform

File: utils/otp.py

Purpose:
OTP hashing and verification helper.

Author: Pallav Kumar
=========================================================
"""

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)


# ==========================================================
# Hash OTP
# ==========================================================

def hash_otp(otp):
    """
    Returns hashed OTP.
    """

    return generate_password_hash(otp)


# ==========================================================
# Verify OTP
# ==========================================================

def verify_otp(otp, otp_hash):
    """
    Returns True if OTP matches.
    """

    return check_password_hash(

        otp_hash,

        otp

    )