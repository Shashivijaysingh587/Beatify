"""
==========================================
Beatify Music Streaming Platform

File : database/db.py

Purpose:
Handles MySQL Database Connection.

Author : Pallav Kumar
==========================================
"""

import mysql.connector
from mysql.connector import Error

from config import MYSQL_CONFIG


def get_db_connection():
    """
    Create and return MySQL connection.
    """

    try:

        connection = mysql.connector.connect(
            **MYSQL_CONFIG
        )

        if connection.is_connected():

            print("✅ MySQL Connected Successfully")

            return connection

    except Error as error:

        print("❌ MySQL Connection Failed")

        print(error)

        return None