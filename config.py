"""
==========================================
Beatify Music Streaming Platform

File : config.py

Purpose:
Stores all project configurations.

Author : Pallav Kumar
==========================================
"""

import os

# ======================================================
# Base Directory
# ======================================================

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# ======================================================
# Flask Configuration
# ======================================================

SECRET_KEY = "CHANGE_ME_LATER"

# ======================================================
# Upload Folder
# ======================================================

UPLOAD_FOLDER = os.path.join(BASE_DIR, "static", "uploads")

# ======================================================
# MySQL Configuration
# ======================================================

MYSQL_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "beatify"
}

# ======================================================
# Gmail Configuration
# ======================================================

MAIL_SERVER = "smtp.gmail.com"

MAIL_PORT = 587

MAIL_USE_TLS = True

MAIL_USERNAME = ""

MAIL_PASSWORD = ""

# ======================================================
# OTP
# ======================================================

OTP_LENGTH = 6

OTP_EXPIRY_MINUTES = 5