"""
=========================================================
Beatify Music Streaming Platform

File: models/collection_song.py

Purpose:
Stores songs inside user collections.

Author: Pallav Kumar
=========================================================
"""

from database.db import db


# =========================================================
# Collection Song Model
# =========================================================

class CollectionSong(db.Model):
    """
    Stores songs added to collections.
    """

    __tablename__ = "collection_songs"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    collection_id = db.Column(
        db.Integer,
        db.ForeignKey("collections.id"),
        nullable=False
    )

    song_name = db.Column(
        db.String(255),
        nullable=False
    )

    song_path = db.Column(
        db.String(500),
        nullable=False
    )

    def __repr__(self):

        return f"<CollectionSong {self.song_name}>"