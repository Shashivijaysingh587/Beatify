"""
=========================================================
Beatify Music Streaming Platform

File : config.py

Purpose:
Stores all project configurations.

Author : Pallav Kumar
=========================================================
"""

import os
from dotenv import load_dotenv

load_dotenv()


# ======================================================
# Base Directory
# ======================================================

BASE_DIR = os.path.abspath(
    os.path.dirname(__file__)
)


# ======================================================
# Flask Configuration
# ======================================================

SECRET_KEY = os.getenv(
    "SECRET_KEY",
    "CHANGE_ME_LATER"
)




# ======================================================
# MySQL Database Configuration
# ======================================================

MYSQL_HOST = os.getenv(
    "MYSQL_HOST",
    "localhost"
)

MYSQL_PORT = int(
    os.getenv(
        "MYSQL_PORT",
        "3306"
    )
)

MYSQL_DATABASE = os.getenv(
    "MYSQL_DATABASE",
    "beatify_db"
)

MYSQL_USERNAME = os.getenv(
    "MYSQL_USERNAME",
    "beatify_user"
)

MYSQL_PASSWORD = os.getenv(
    "MYSQL_PASSWORD",
     "Beatify123"
)

# ======================================================
# Aiven CA Certificate
# ======================================================

CA_CERT_PATH = os.path.join(
    BASE_DIR,
    "ca.pem"
)

# ======================================================
# SQLAlchemy Database URI
# ======================================================

from urllib.parse import quote_plus

SQLALCHEMY_DATABASE_URI = (
    f"mysql+pymysql://"
    f"{quote_plus(MYSQL_USERNAME)}:"
    f"{quote_plus(MYSQL_PASSWORD)}"
    f"@{MYSQL_HOST}:"
    f"{MYSQL_PORT}/"
    f"{MYSQL_DATABASE}"
)

# ======================================================
# SQLAlchemy SSL Configuration
# ======================================================

if MYSQL_HOST not in ("localhost", "127.0.0.1"):
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_recycle": 1800,
        "connect_args": {
            "ssl": {
                "ca": CA_CERT_PATH
            }
        }
    }
else:
    SQLALCHEMY_ENGINE_OPTIONS = {
        "pool_pre_ping": True,
        "pool_recycle": 1800
    }


SQLALCHEMY_TRACK_MODIFICATIONS = False


# ======================================================
# Upload Folder
# ======================================================

UPLOAD_FOLDER = os.path.join(
    BASE_DIR,
    "static",
    "uploads"
)


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


MAX_PROFILE_IMAGE_SIZE = (
    5 * 1024 * 1024
)


# ======================================================
# Legacy MySQL Configuration
# ======================================================

MYSQL_CONFIG = {

    "host": MYSQL_HOST,

    "user": MYSQL_USERNAME,

    "password": MYSQL_PASSWORD,

    "database": MYSQL_DATABASE

}


# ======================================================
# Gmail Configuration
# ======================================================

MAIL_SERVER = os.getenv(
    "MAIL_SERVER",
    "smtp.gmail.com"
)

MAIL_PORT = int(
    os.getenv(
        "MAIL_PORT",
        "587"
    )
)

MAIL_USE_TLS = os.getenv(
    "MAIL_USE_TLS",
    "True"
).lower() == "true"

MAIL_USE_SSL = os.getenv(
    "MAIL_USE_SSL",
    "False"
).lower() == "true"

MAIL_USERNAME = os.getenv(
    "MAIL_USERNAME"
)

MAIL_PASSWORD = os.getenv(
    "MAIL_PASSWORD"
)

MAIL_DEFAULT_SENDER = os.getenv(
    "MAIL_DEFAULT_SENDER",
    MAIL_USERNAME
)



# =========================================================
# Brevo Email API
# =========================================================

BREVO_API_KEY = os.getenv(
    "BREVO_API_KEY"
)

BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"

BREVO_SENDER_NAME = "Beatify"

BREVO_SENDER_EMAIL = os.getenv(
    "BREVO_SENDER_EMAIL",
    "beatify.music.app@gmail.com"
)

# ======================================================
# OTP
# ======================================================

OTP_LENGTH = 6

OTP_EXPIRY_MINUTES = 5

RESEND_OTP_COOLDOWN = 60