"""
=========================================================
Beatify Music Streaming Platform

File: utils/password.py

Purpose:
Password hashing and verification utility.

Author: Pallav Kumar
=========================================================
"""

from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash


# ==========================================================
# Generate Password Hash
# ==========================================================

def hash_password(password: str) -> str:
    """
    Convert plain password into hashed password.
    """
    return generate_password_hash(password)


# ==========================================================
# Verify Password
# ==========================================================

def verify_password(password: str, password_hash: str) -> bool:
    """
    Verify plain password with stored hash.
    """
    return check_password_hash(password_hash, password)