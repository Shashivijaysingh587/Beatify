"""
=========================================================
Beatify Music Streaming Platform

File: routes/song_routes.py

Purpose:
Reads all albums from the song folder.

Author: Pallav Kumar
=========================================================
"""

import os
import json

from flask import Blueprint, jsonify

# Blueprint
song_bp = Blueprint("song", __name__)

# Root Project Folder
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Song Folder
SONG_FOLDER = os.path.join(BASE_DIR, "song")


def get_all_albums():
    """
    Read all album folders from the song directory.

    Returns:
        list
    """

    albums = []

    if not os.path.exists(SONG_FOLDER):
        return albums

    for folder in os.listdir(SONG_FOLDER):

        folder_path = os.path.join(SONG_FOLDER, folder)

        if not os.path.isdir(folder_path):
            continue

        info_path = os.path.join(folder_path, "info.json")

        if not os.path.exists(info_path):
            continue

        with open(info_path, "r", encoding="utf-8") as file:
            info = json.load(file)

        albums.append({
            "folder": folder,
            "title": info.get("title", folder),
            "description": info.get("description", ""),
            "cover": f"song/{folder}/cover.jpg"
        })

    return albums
    from flask import jsonify

def get_album_songs(folder_name):
    """
    Return all mp3 songs from a selected album.
    """

    folder_path = os.path.join(SONG_FOLDER, folder_name)

    if not os.path.exists(folder_path):
        return []

    songs = []

    for file in os.listdir(folder_path):

        if file.lower().endswith(".mp3"):
            songs.append(file)

    songs.sort()

    return songs


@song_bp.route("/api/songs/<folder_name>")
def api_album_songs(folder_name):

    songs = get_album_songs(folder_name)

    return jsonify(songs)