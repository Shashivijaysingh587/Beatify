import os

import boto3

from dotenv import load_dotenv


# =========================================================
# Load Environment Variables
# =========================================================

load_dotenv(override=True)


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


# =========================================================
# Validate Configuration
# =========================================================

required_values = {

    "R2_ENDPOINT_URL":
        R2_ENDPOINT_URL,

    "R2_ACCESS_KEY_ID":
        R2_ACCESS_KEY_ID,

    "R2_SECRET_ACCESS_KEY":
        R2_SECRET_ACCESS_KEY,

    "R2_BUCKET_NAME":
        R2_BUCKET_NAME

}


for key, value in required_values.items():

    if not value:

        raise RuntimeError(
            f"Missing environment variable: {key}"
        )


# =========================================================
# Create R2 Client
# =========================================================

s3 = boto3.client(

    "s3",

    endpoint_url=R2_ENDPOINT_URL,

    aws_access_key_id=R2_ACCESS_KEY_ID,

    aws_secret_access_key=R2_SECRET_ACCESS_KEY,

    region_name=R2_REGION

)


# =========================================================
# Local Song Folder
# =========================================================

BASE_DIR = os.path.abspath(
    os.path.dirname(__file__)
)

SONG_FOLDER = os.path.join(
    BASE_DIR,
    "song"
)


# =========================================================
# Allowed Files
# =========================================================

ALLOWED_EXTENSIONS = {

    ".mp3",

    ".jpg",

    ".jpeg",

    ".png",

    ".json"

}


# =========================================================
# Content Types
# =========================================================

CONTENT_TYPES = {

    ".mp3":
        "audio/mpeg",

    ".jpg":
        "image/jpeg",

    ".jpeg":
        "image/jpeg",

    ".png":
        "image/png",

    ".json":
        "application/json"

}


# =========================================================
# Upload Function
# =========================================================

def upload_songs():

    if not os.path.isdir(
        SONG_FOLDER
    ):

        raise FileNotFoundError(

            f"Song folder not found:\n"
            f"{SONG_FOLDER}"

        )


    total_files = 0

    uploaded_files = 0

    failed_files = 0


    print()
    print("=" * 70)
    print("Beatify - Cloudflare R2 Upload")
    print("=" * 70)

    print()

    print(
        f"Local folder : {SONG_FOLDER}"
    )

    print(
        f"R2 bucket    : {R2_BUCKET_NAME}"
    )

    print()


    # -----------------------------------------------------
    # Find Files
    # -----------------------------------------------------

    files_to_upload = []


    for root, directories, files in os.walk(
        SONG_FOLDER
    ):

        for filename in files:

            extension = os.path.splitext(
                filename
            )[1].lower()


            if extension not in ALLOWED_EXTENSIONS:

                continue


            local_path = os.path.join(
                root,
                filename
            )


            relative_path = os.path.relpath(
                local_path,
                SONG_FOLDER
            )


            object_key = relative_path.replace(
                os.sep,
                "/"
            )


            files_to_upload.append(
                (
                    local_path,
                    object_key,
                    extension
                )
            )


    total_files = len(
        files_to_upload
    )


    print(
        f"Files found: {total_files}"
    )

    print()


    # -----------------------------------------------------
    # Upload Files
    # -----------------------------------------------------

    for index, (
        local_path,
        object_key,
        extension
    ) in enumerate(
        files_to_upload,
        start=1
    ):


        print(
            f"[{index}/{total_files}] "
            f"Uploading:"
        )

        print(
            f"    {object_key}"
        )


        try:

            content_type = CONTENT_TYPES.get(
                extension,
                "application/octet-stream"
            )


            s3.upload_file(

                local_path,

                R2_BUCKET_NAME,

                object_key,

                ExtraArgs={

                    "ContentType":
                        content_type

                }

            )


            uploaded_files += 1


            print(
                "    ✓ Uploaded"
            )


        except Exception as error:

            failed_files += 1


            print(
                "    ✗ Upload failed"
            )

            print(
                f"    Error: {error}"
            )


        print()


    # -----------------------------------------------------
    # Final Result
    # -----------------------------------------------------

    print("=" * 70)
    print("Upload Complete")
    print("=" * 70)

    print(
        f"Total files : {total_files}"
    )

    print(
        f"Uploaded    : {uploaded_files}"
    )

    print(
        f"Failed      : {failed_files}"
    )

    print("=" * 70)


# =========================================================
# Main
# =========================================================

if __name__ == "__main__":

    upload_songs()