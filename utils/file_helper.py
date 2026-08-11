"""
==========================================
File Helper

Purpose:
Common helper functions for file uploads.
==========================================
"""

import os
import uuid

from werkzeug.utils import secure_filename

import config

# ==========================================================
# Allowed Image Extension
# ==========================================================

def allowed_image_file(filename):
    """
    Returns True if image extension is allowed.
    """

    if "." not in filename:

        return False

    extension = filename.rsplit(

        ".",

        1

    )[1].lower()

    return (

        extension in

        config.ALLOWED_IMAGE_EXTENSIONS

    )

# ==========================================================
# Generate Unique Image Name
# ==========================================================

def generate_unique_filename(filename):
    """
    Generate unique filename.
    """

    extension = filename.rsplit(

        ".",

        1

    )[1].lower()

    return (

        f"{uuid.uuid4().hex}.{extension}"

    )

# ==========================================================
# Delete Image
# ==========================================================

def delete_image(filename):
    """
    Delete image from profile folder.
    """

    if not filename:

        return

    path = os.path.join(

        config.PROFILE_IMAGE_FOLDER,

        filename

    )

    if os.path.exists(path):

        os.remove(path)

# ==========================================================
# Save Profile Image
# ==========================================================

def save_profile_image(file):
    """
    Save uploaded profile image.

    Returns:
        filename
    """

    filename = secure_filename(

        file.filename

    )

    filename = generate_unique_filename(

        filename

    )

    path = os.path.join(

        config.PROFILE_IMAGE_FOLDER,

        filename

    )

    file.save(path)

    return filename