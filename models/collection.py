"""
=========================================================
Beatify Music Streaming Platform

File: models/collection.py

Purpose:
Collection model for user created music collections.

Author: Pallav Kumar
=========================================================
"""

from utils.datetime_helper import utc_now
from database.db import db


# =========================================================
# Collection Model
# =========================================================

class Collection(db.Model):
    """
    Stores user created collections.
    """

    __tablename__ = "collections"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=False
    )

    name = db.Column(
        db.String(100),
        nullable=False
    )

    description = db.Column(
        db.String(255),
        nullable=True
    )

    cover_image = db.Column(
        db.String(255),
        nullable=True
    )

    created_at = db.Column(
        db.DateTime,
        default=utc_now
    )

    def __repr__(self):

        return f"<Collection {self.name}>"