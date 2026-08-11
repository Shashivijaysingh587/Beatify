"""
=========================================================
Beatify Music Streaming Platform

File: services/email_service.py

Purpose:
Handles all outgoing emails:
- Email Verification OTP
- Forgot Password OTP
- Welcome Email (Future)
- Notifications (Future)

Author: Pallav Kumar
=========================================================
"""

from flask_mail import Mail, Message
from flask import current_app
import random

mail = Mail()

# =========================================================
# Generate OTP
# =========================================================

def generate_otp(length=6):
    """
    Generate numeric OTP.
    """

    digits = "0123456789"

    return "".join(
        random.choice(digits)
        for _ in range(length)
    )

# =========================================================
# Initialize Flask-Mail
# =========================================================

def init_mail(app):
    """
    Initialize Flask-Mail.
    """

    mail.init_app(app)

# =========================================================
# Send Email
# =========================================================

def send_email(subject, recipients, body):
    """
    Send plain text email.
    """

    try:

        message = Message(
            subject=subject,
            sender=current_app.config["MAIL_DEFAULT_SENDER"],
            recipients=recipients
        )

        message.body = body

        mail.send(message)

        return True

    except Exception as error:

        print("Email Error:", error)

        return False

# =========================================================
# Send Verification OTP
# =========================================================

def send_verification_otp(email, full_name, otp):
    """
    Send email verification OTP.
    """

    subject = "Verify your Beatify account"

    body = f"""
    Hi {full_name},

    Welcome to Beatify.

    Your verification code is:

    {otp}

    This code will expire in 5 minutes.

    If you didn't create this account,
    please ignore this email.

    Team Beatify
    """

    return send_email(
            subject,
            [email],
            body
        )