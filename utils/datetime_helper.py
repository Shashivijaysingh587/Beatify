"""
=========================================================
Beatify Music Streaming Platform

File: utils/datetime_helper.py

Purpose:
Centralized datetime helper.

Author: Pallav Kumar
=========================================================
"""

from datetime import datetime, UTC


# =========================================================
# Current UTC Time
# =========================================================

def utc_now():
    """
    Return current UTC datetime.
    """
    return datetime.now(UTC)


# =========================================================
# Normalize Database Datetime
# =========================================================

def normalize_datetime(dt):
    """
    Convert database datetime to UTC-aware datetime.
    """

    if dt is None:
        return None

    if dt.tzinfo is None:
        return dt.replace(tzinfo=UTC)

    return dt