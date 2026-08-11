from utils.file_helper import (
    allowed_image_file,
    save_profile_image,
    delete_image
)
from database.db import db

import config

# ==========================================================
# Upload Profile Image
# ==========================================================

def upload_profile_image(user, image_file):
    """
    Upload user profile image.

    Returns:
        (success, message, filename)
    """

    # ----------------------------------------
    # No File
    # ----------------------------------------

    if image_file is None:

        return (

            False,

            "Please select an image.",

            None

        )

    # ----------------------------------------
    # Empty File Name
    # ----------------------------------------

    if image_file.filename.strip() == "":

        return (

            False,

            "Please select an image.",

            None

        )

    # ----------------------------------------
    # Invalid Extension
    # ----------------------------------------

    if not allowed_image_file(

        image_file.filename

    ):

        return (

            False,

            "Only JPG, JPEG, PNG and WEBP images are allowed.",

            None

        )

    old_image = user.profile_image

    # ----------------------------------------
    # File Size
    # ----------------------------------------

    image_file.seek(

        0,

        2

    )

    file_size = image_file.tell()

    image_file.seek(

        0

    )

    if file_size > config.MAX_PROFILE_IMAGE_SIZE:

        return (

            False,

            "Image size must be less than 5 MB.",

            None

        )



    # ----------------------------------------
    # Save New Image
    # ----------------------------------------

    try:

        filename = save_profile_image(

            image_file

        )

    except Exception as e:

        print("=" * 60)
        print("SAVE PROFILE IMAGE ERROR")
        print(type(e).__name__)
        print(e)
        print("=" * 60)

        return (

            False,

            "Unable to upload image. Please try again.",

            None

        )

    # ----------------------------------------
    # Update Database
    # ----------------------------------------

    try:

        user.profile_image = filename

        db.session.commit()

    except Exception:

        db.session.rollback()

        delete_image(filename)

        return (

            False,

            "Something went wrong. Please try again.",

            None

        )
    # ----------------------------------------
    # Delete Old Image
    # ----------------------------------------

    if old_image:

        delete_image(old_image)

    # ----------------------------------------
    # Success
    # ----------------------------------------

    return (

        True,

        "Profile photo updated successfully.",

        filename

    )
