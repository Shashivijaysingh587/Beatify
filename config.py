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
from dotenv import load_dotenv


load_dotenv()


# ======================================================
# Base Directory
# ======================================================

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

# ======================================================
# Flask Configuration
# ======================================================

SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "CHANGE_ME_LATER"
)

# =========================================================
# MySQL Database Configuration
# =========================================================

MYSQL_HOST = "localhost"
MYSQL_PORT = 3306
MYSQL_DATABASE = "beatify_db"
MYSQL_USERNAME = "beatify_user"
MYSQL_PASSWORD = "Beatify123"

SQLALCHEMY_DATABASE_URI = (
    f"mysql+pymysql://{MYSQL_USERNAME}:{MYSQL_PASSWORD}"
    f"@{MYSQL_HOST}:{MYSQL_PORT}/{MYSQL_DATABASE}"
)

SQLALCHEMY_TRACK_MODIFICATIONS = False

# ======================================================
# Upload Folder
# ======================================================

UPLOAD_FOLDER = os.path.join(BASE_DIR, "static", "uploads")

# ======================================================
# Profile Image Upload
# ======================================================

PROFILE_IMAGE_FOLDER = os.path.join(

    UPLOAD_FOLDER,

    "profile_images"

)

ALLOWED_IMAGE_EXTENSIONS = {

    "png",

    "jpg",

    "jpeg",

    "webp"

}

MAX_PROFILE_IMAGE_SIZE = 5 * 1024 * 1024

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

MAIL_USE_SSL = False

MAIL_USERNAME = os.getenv("MAIL_USERNAME")

MAIL_PASSWORD = os.getenv("MAIL_PASSWORD")

MAIL_DEFAULT_SENDER = os.getenv("MAIL_USERNAME")

# ======================================================
# OTP
# ======================================================

OTP_LENGTH = 6

OTP_EXPIRY_MINUTES = 5

RESEND_OTP_COOLDOWN = 60