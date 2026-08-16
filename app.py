"""
=========================================================
Beatify Music Streaming Platform

File: app.py

Purpose:
Main entry point of the Beatify application.

Author: Pallav Kumar
=========================================================
"""
from flask import send_from_directory
from sqlalchemy import inspect, text
from database.db import init_db, db
from routes.admin_routes import admin_bp
from models.user import User
from models.pending_signup import PendingSignup
import os
from routes.collection_routes import collection_bp
from routes.collection_routes import collection_bp
from routes.song_routes import get_all_albums
from routes.song_routes import song_bp
from routes.auth_routes import auth_bp
from services.email_service import init_mail
from flask import Flask, render_template
from config import (
    SECRET_KEY,
    SQLALCHEMY_DATABASE_URI,
    SQLALCHEMY_TRACK_MODIFICATIONS,
    SQLALCHEMY_ENGINE_OPTIONS,
)

# =========================================================
# Create Flask Application
# =========================================================

app = Flask(__name__)
app.register_blueprint(song_bp)
app.register_blueprint(auth_bp)
app.register_blueprint(admin_bp)

# =========================================================
# Load Configuration
# =========================================================

app.config["SECRET_KEY"] = SECRET_KEY

# =========================================================
# Database Configuration
# =========================================================



app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_ENGINE_OPTIONS"] = SQLALCHEMY_ENGINE_OPTIONS
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = SQLALCHEMY_TRACK_MODIFICATIONS





# =========================================================
# Mail Configuration
# =========================================================

from config import (
    MAIL_SERVER,
    MAIL_PORT,
    MAIL_USE_TLS,
    MAIL_USE_SSL,
    MAIL_USERNAME,
    MAIL_PASSWORD,
    MAIL_DEFAULT_SENDER
)

app.config["MAIL_SERVER"] = MAIL_SERVER
app.config["MAIL_PORT"] = MAIL_PORT
app.config["MAIL_USE_TLS"] = MAIL_USE_TLS
app.config["MAIL_USE_SSL"] = MAIL_USE_SSL
app.config["MAIL_USERNAME"] = MAIL_USERNAME
app.config["MAIL_PASSWORD"] = MAIL_PASSWORD
app.config["MAIL_DEFAULT_SENDER"] = MAIL_DEFAULT_SENDER


# Initialize Database
init_db(app)

print(app.config["SQLALCHEMY_DATABASE_URI"])

# Initialize Mail
init_mail(app)
# =========================================================
# Create Database Tables
# =========================================================

with app.app_context():

    db.create_all()


    # =====================================================
    # Check User Columns
    # =====================================================

    inspector = inspect(db.engine)

    user_columns = {
        column["name"]
        for column in inspector.get_columns("users")
    }


    print(
        "Users table columns:",
        user_columns
    )


    # =====================================================
    # Add is_admin if missing
    # =====================================================

    if "is_admin" not in user_columns:

        with db.engine.connect() as connection:

            connection.execute(
                text(
                    """
                    ALTER TABLE users
                    ADD COLUMN is_admin
                    BOOLEAN NOT NULL DEFAULT 0
                    """
                )
            )

            connection.commit()

        print(
            "Added missing 'is_admin' column to users table."
        )

    else:

        print(
            "'is_admin' column already exists."
        )


# =========================================================
# Home Route
# =========================================================

@app.route("/")
def home():

    albums = get_all_albums()

    return render_template(
        "index.html",
        albums=albums
    )
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SONG_FOLDER = os.path.join(BASE_DIR, "song")


@app.route("/song/<folder>/<filename>")
def serve_song_files(folder, filename):
    return send_from_directory(
        os.path.join(SONG_FOLDER, folder),
        filename
    )

# =========================================================
# Run Application
# =========================================================

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )