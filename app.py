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
from database.db import init_db
from database.db import db
from models.user import User
import os
from routes.song_routes import get_all_albums
from routes.song_routes import song_bp
from flask import Flask, render_template
from config import SECRET_KEY

# =========================================================
# Create Flask Application
# =========================================================

app = Flask(__name__)
app.register_blueprint(song_bp)

# =========================================================
# Load Configuration
# =========================================================

app.config["SECRET_KEY"] = SECRET_KEY

# =========================================================
# Database Configuration
# =========================================================

from config import (
    SQLALCHEMY_DATABASE_URI,
    SQLALCHEMY_TRACK_MODIFICATIONS
)

app.config["SQLALCHEMY_DATABASE_URI"] = SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = SQLALCHEMY_TRACK_MODIFICATIONS

# Initialize Database
init_db(app)

# =========================================================
# Create Database Tables
# =========================================================

with app.app_context():
    db.create_all()
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
        debug=True,
        host="127.0.0.1",
        port=5000
    )