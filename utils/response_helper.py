"""
=========================================================
Beatify Music Streaming Platform

File: utils/response_helper.py

Purpose:
Standard API response helpers.

Author: Pallav Kumar
=========================================================
"""


# ==========================================================
# Success Response
# ==========================================================

def success_response(message, data=None):
    """
    Return a standard success response.
    """

    return {

        "success": True,

        "message": message,

        "data": data or {}

    }


# ==========================================================
# Error Response
# ==========================================================

def error_response(message, data=None):
    """
    Return a standard error response.
    """

    return {

        "success": False,

        "message": message,

        "data": data or {}

    }