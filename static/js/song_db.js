// ==========================================================
// Beatify Song Database
// ==========================================================

const songUploader =
    document.getElementById("songUploader");

// ===============================
// Save Song
// ===============================

function saveSongToDB(song, callback) {

    if (!db) {

        console.error("Database not ready.");

        return;

    }

    const transaction =
        db.transaction(
            "uploadedSongs",
            "readwrite"
        );

    const store =
        transaction.objectStore(
            "uploadedSongs"
        );

    const request =
        store.put(song);

    request.onsuccess = function () {

        console.log("✅ Song Saved");

        if (callback) {

            callback();

        }

    };

    request.onerror = function (event) {

        console.error(
            "Song Save Failed",
            event.target.error
        );

    };

}

// ===============================
// Get All Songs
// ===============================

function getAllSongsFromDB(callback) {

    if (!db) {

        console.error("Database not ready.");

        return;

    }

    const transaction =
        db.transaction(
            "uploadedSongs",
            "readonly"
        );

    const store =
        transaction.objectStore(
            "uploadedSongs"
        );

    const request =
        store.getAll();

    request.onsuccess = function () {

        callback(request.result);

    };

    request.onerror = function (event) {

        console.error(
            event.target.error
        );

    };

}

// ========================================
// Open Song Picker
// ========================================

function openSongPicker() {

    songUploader.click();

}



songUploader.addEventListener(

    "change",

    function () {

        for (const file of this.files) {

            const song = {

                id: crypto.randomUUID(),

                title: file.name,

                file: file,

                type: file.type,

                size: file.size,

                cover: "",

                createdAt: Date.now()

            };

            saveSongToDB(song, function () {

                console.log("Upload Complete");

                addSongToCurrentCollection(song.id);

            });

        }

        this.value = "";

    }

);


