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


from flask import current_app
from flask_mail import Mail
import random
import requests

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
    Send plain text email using Brevo Email API.
    """

    try:
        api_key = current_app.config["BREVO_API_KEY"]
        api_url = current_app.config["BREVO_API_URL"]

        sender_name = current_app.config["BREVO_SENDER_NAME"]
        sender_email = current_app.config["BREVO_SENDER_EMAIL"]

        headers = {
            "accept": "application/json",
            "api-key": api_key,
            "content-type": "application/json"
        }

        payload = {
            "sender": {
                "name": sender_name,
                "email": sender_email
            },

            "to": [
                {
                    "email": email
                }
                for email in recipients
            ],

            "subject": subject,
            "textContent": body
        }

        response = requests.post(
            api_url,
            headers=headers,
            json=payload,
            timeout=10
        )

        response.raise_for_status()

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

# =========================================================
# Send Password Reset OTP
# =========================================================

def send_password_reset_otp(email, full_name, otp):
    """
    Send password reset OTP.
    """

    subject = "Reset your Beatify password"

    body = f"""
Hi {full_name},

We received a request to reset your Beatify password.

Your password reset verification code is:

{otp}

This code will expire in 5 minutes.

If you did not request a password reset,
please ignore this email.

Team Beatify
"""

    return send_email(
        subject,
        [email],
        body
    )
# =========================================================
# Send Welcome Email
# =========================================================

def send_welcome_email(email, full_name):
    """
    Send welcome email after successful signup.
    """

    subject = "Welcome to Beatify 🎧"

    body = f"""
Hi {full_name},

Welcome to Beatify! 🎧

Your account has been successfully created.

We're happy to have you with us.

Start listening to your favorite songs
and enjoy every beat.

🎧 Beatify
Feel Every Beat

Team Beatify
"""

    return send_email(
        subject,
        [email],
        body
    )