"""
=========================================================
Beatify Music Streaming Platform

File: database/db.py

Purpose:
Initialize SQLAlchemy database instance.

Author: Pallav Kumar
=========================================================
"""

from flask_sqlalchemy import SQLAlchemy

# =========================================================
# SQLAlchemy Database Object
# =========================================================

db = SQLAlchemy()


# =========================================================
# Initialize Database
# =========================================================

def init_db(app):
    """
    Initialize SQLAlchemy with Flask app.
    """
    db.init_app(app)