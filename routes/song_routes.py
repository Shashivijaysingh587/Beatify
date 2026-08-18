# """
# Beatify Music Streaming Platform
#
# File: routes/song_routes.py
#
# Purpose:
# Reads all albums and songs.
#
# Author: Pallav Kumar
# """

import os
import json

import boto3

from dotenv import load_dotenv

from flask import Blueprint, jsonify


# =========================================================
# Load Environment Variables
# =========================================================

load_dotenv(override=True)


# =========================================================
# Blueprint
# =========================================================

song_bp = Blueprint(
    "song",
    __name__
)


# =========================================================
# Root Project Folder
# =========================================================

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.abspath(__file__)
    )
)


# =========================================================
# Local Song Folder
#
# अभी info.json पढ़ने के लिए रखा गया है.
# =========================================================

SONG_FOLDER = os.path.join(
    BASE_DIR,
    "song"
)


# =========================================================
# R2 Configuration
# =========================================================

R2_ENDPOINT_URL = os.getenv(
    "R2_ENDPOINT_URL"
)

R2_ACCESS_KEY_ID = os.getenv(
    "R2_ACCESS_KEY_ID"
)

R2_SECRET_ACCESS_KEY = os.getenv(
    "R2_SECRET_ACCESS_KEY"
)

R2_BUCKET_NAME = os.getenv(
    "R2_BUCKET_NAME"
)

R2_REGION = os.getenv(
    "R2_REGION",
    "auto"
)

R2_PUBLIC_URL = os.getenv(
    "R2_PUBLIC_URL",
    "https://pub-612f37d74f7f435cb2385d11b9e0d0e0.r2.dev"
).rstrip("/")


# =========================================================
# R2 Client
# =========================================================

s3 = boto3.client(

    "s3",

    endpoint_url=R2_ENDPOINT_URL,

    aws_access_key_id=R2_ACCESS_KEY_ID,

    aws_secret_access_key=R2_SECRET_ACCESS_KEY,

    region_name=R2_REGION
)


# =========================================================
# Get All Albums
# =========================================================

def get_all_albums():
    """
    Read all albums from Cloudflare R2.
    """

    albums = []

    try:

        response = s3.list_objects_v2(
            Bucket=R2_BUCKET_NAME
        )

        folders = set()

        for obj in response.get("Contents", []):

            key = obj.get("Key", "")

            if "/" not in key:
                continue

            folder = key.split("/", 1)[0]

            folders.add(folder)


        for folder in sorted(folders):

            cover_url = (
                f"{R2_PUBLIC_URL}/"
                f"{folder}/cover.jpg"
            )

            try:

                # Read info.json directly from R2
                info_response = s3.get_object(
                    Bucket=R2_BUCKET_NAME,
                    Key=f"{folder}/info.json"
                )

                info_data = info_response["Body"].read()

                info = json.loads(
                    info_data.decode("utf-8")
                )

            except Exception as error:

                print(
                    f"Could not read info.json "
                    f"for {folder}: {error}"
                )

                continue


            albums.append({

                "folder": folder,

                "title": info.get(
                    "title",
                    folder
                ),

                "description": info.get(
                    "description",
                    ""
                ),

                "cover": cover_url

            })


    except Exception as error:

        print(
            f"R2 album listing error: {error}"
        )

        return []


    return albums


# =========================================================
# Get Album Songs From R2
# =========================================================

def get_album_songs(folder_name):
    """
    Return all MP3 songs from a selected album
    stored in Cloudflare R2.
    """

    prefix = (
        f"{folder_name}/"
    )


    songs = []


    try:

        response = s3.list_objects_v2(

            Bucket=R2_BUCKET_NAME,

            Prefix=prefix

        )


        for obj in response.get(
            "Contents",
            []
        ):

            object_key = obj.get(
                "Key",
                ""
            )


            if not object_key.lower().endswith(
                ".mp3"
            ):
                continue


            # Remove folder prefix
            filename = object_key[
                len(prefix):
            ]


            # Ignore nested folders
            if "/" in filename:
                continue


            songs.append(
                filename
            )


    except Exception as error:

        print(
            f"R2 song listing error: {error}"
        )

        return []


    songs.sort()

    return songs


# =========================================================
# API - Album Songs
# =========================================================

@song_bp.route(
    "/api/songs/<folder_name>"
)
def api_album_songs(
    folder_name
):

    songs = get_album_songs(
        folder_name
    )

    return jsonify(
        songs
    )