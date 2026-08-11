"""
=========================================================
Beatify Music Streaming Platform

File : services/collection_service.py

Purpose:
Collection related database operations.

Author : Pallav Kumar
=========================================================
"""

from database.db import db

from models.collection import Collection

from utils.response_helper import (
    success_response,
    error_response
)


# ==========================================================
# Create Collection
# ==========================================================

def create_collection(
    user_id,
    name,
    description,
    cover_image
):
    """
    Create a new music collection.
    """

    # ----------------------------------------
    # Validation
    # ----------------------------------------

    if not name.strip():

        return error_response(
            "Collection name is required."
        )

    # ----------------------------------------
    # Create Collection
    # ----------------------------------------

    try:

        collection = Collection(

            user_id=user_id,

            name=name.strip(),

            description=description.strip(),

            cover_image=cover_image

        )

        db.session.add(collection)

        db.session.commit()

        return success_response(

            "Collection created successfully.",

            {
                "collection": collection
            }

        )

    except Exception:

        db.session.rollback()

        return error_response(

            "Something went wrong. Please try again."

        )


# ==========================================================
# Get User Collections
# ==========================================================

def get_user_collections(user_id):
    """
    Return all collections of logged in user.
    """

    collections = Collection.query.filter_by(

        user_id=user_id

    ).order_by(

        Collection.created_at.desc()

    ).all()

    return success_response(

        "Collections loaded successfully.",

        {
            "collections": collections
        }

    )


# ==========================================================
# Get Collection By ID
# ==========================================================

def get_collection_by_id(
    collection_id
):
    """
    Return collection object.
    """

    collection = Collection.query.get(

        collection_id

    )

    if collection is None:

        return error_response(

            "Collection not found."

        )

    return success_response(

        "Collection found.",

        {
            "collection": collection
        }

    )


# ==========================================================
# Delete Collection
# ==========================================================

def delete_collection(
    collection_id
):
    """
    Delete collection.
    """

    collection = Collection.query.get(

        collection_id

    )

    if collection is None:

        return error_response(

            "Collection not found."

        )

    try:

        db.session.delete(

            collection

        )

        db.session.commit()

        return success_response(

            "Collection deleted successfully."

        )

    except Exception:

        db.session.rollback()

        return error_response(

            "Something went wrong. Please try again."

        )