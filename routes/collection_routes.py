"""
=========================================================
Beatify Music Streaming Platform

File : routes/collection_routes.py

Purpose:
Collection routes.

Author : Pallav Kumar
=========================================================
"""

from flask import (
    Blueprint,
    request,
    session
)

from services.collection_service import (

    create_collection,

    get_user_collections,

    get_collection_by_id,

    delete_collection

)

collection_bp = Blueprint(

    "collection",

    __name__

)


# ==========================================================
# Create Collection
# ==========================================================

@collection_bp.route(

    "/collections/create",

    methods=["POST"]

)

def create_collection_route():

    if "user_id" not in session:

        return {

            "success": False,

            "message": "Please login first."

        }, 401

    name = request.form.get(

        "name",

        ""

    )

    description = request.form.get(

        "description",

        ""

    )

    cover = request.files.get(

        "cover_image"

    )

    cover_filename = None

    if cover:

        # Next step me upload logic add karenge

        cover_filename = cover.filename

    return create_collection(

        session["user_id"],

        name,

        description,

        cover_filename

    )


# ==========================================================
# Get User Collections
# ==========================================================

@collection_bp.route(

    "/collections",

    methods=["GET"]

)

def get_collections_route():

    if "user_id" not in session:

        return {

            "success": False,

            "message": "Please login first."

        }, 401

    return get_user_collections(

        session["user_id"]

    )


# ==========================================================
# Get Collection
# ==========================================================

@collection_bp.route(

    "/collections/<int:collection_id>",

    methods=["GET"]

)

def get_collection_route(

    collection_id

):

    if "user_id" not in session:

        return {

            "success": False,

            "message": "Please login first."

        }, 401

    return get_collection_by_id(

        collection_id

    )


# ==========================================================
# Delete Collection
# ==========================================================

@collection_bp.route(

    "/collections/<int:collection_id>",

    methods=["DELETE"]

)

def delete_collection_route(

    collection_id

):

    if "user_id" not in session:

        return {

            "success": False,

            "message": "Please login first."

        }, 401

    return delete_collection(

        collection_id

    )