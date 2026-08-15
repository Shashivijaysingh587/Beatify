from datetime import datetime

from database.db import db
from utils.datetime_helper import utc_now


class UserSession(db.Model):
    """
    Stores the active/inactive status of a user.
    """

    __tablename__ = "user_sessions"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey(
            "users.id",
            ondelete="CASCADE"
        ),
        nullable=False,
        unique=True
    )

    is_active = db.Column(
        db.Boolean,
        default=True,
        nullable=False
    )

    last_seen = db.Column(
        db.DateTime,
        default=utc_now,
        nullable=False
    )

    created_at = db.Column(
        db.DateTime,
        default=utc_now
    )

    updated_at = db.Column(
        db.DateTime,
        default=utc_now,
        onupdate=utc_now
    )

    user = db.relationship(
        "User",
        backref=db.backref(
            "session",
            uselist=False
        )
    )

    def __repr__(self):
        return (
            f"<UserSession user_id={self.user_id} "
            f"active={self.is_active}>"
        )