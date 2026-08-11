// ==========================================================
// Beatify IndexedDB
// ==========================================================

console.log("✅ indexeddb.js Loaded");

const DB_NAME = "BeatifyDB";
const DB_VERSION = 5;

let db = null;

function initDatabase() {

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = function () {

        console.error("❌ IndexedDB open failed.");

    };

    request.onsuccess = function (event) {

        db = event.target.result;
        console.log("Step 4 : IndexedDB Success");

        console.log("✅ IndexedDB Connected");

         

    };

    request.onupgradeneeded = function (event) {

        db = event.target.result;

        console.log("⚡ Creating Database...");

        // ============================
        // Uploaded Songs Store
        // ============================

        if (!db.objectStoreNames.contains("uploadedSongs")) {

            const songStore = db.createObjectStore("uploadedSongs", {
                keyPath: "id"
            });

            songStore.createIndex("title", "title", { unique: false });

            console.log("✅ uploadedSongs Store Created");

        }

        // ============================
        // Collections Store
        // ============================

        if (!db.objectStoreNames.contains("collections")) {

            const collectionStore = db.createObjectStore("collections", {
                keyPath: "id"
            });

            collectionStore.createIndex("name", "name", {
                unique: false
            });

            console.log("✅ collections Store Created");

        }

    };

}

initDatabase();

// ==========================================================
// Save Collection
// ==========================================================

function saveCollection(collection, callback) {

    if (!db) {

        console.error("Database not ready.");

        return;

    }

    const transaction = db.transaction(
        "collections",
        "readwrite"
    );

    const store = transaction.objectStore(
        "collections"
    );

    const request = store.put(collection);

    request.onsuccess = function () {

        console.log("✅ Collection Saved");
        console.log("Step 4 : IndexedDB Success");

        if (callback) {

            callback();

        }

    };

    request.onerror = function (event) {

        console.error(
            "❌ Failed to Save Collection",
            event.target.error
        );

    };

}

// ==========================================================
// Get All Collections
// ==========================================================

function getAllCollections(callback) {

    if (!db) {

        console.error("Database not ready.");

        return;

    }

    const transaction = db.transaction(
        "collections",
        "readonly"
    );

    const store = transaction.objectStore(
        "collections"
    );

    const request = store.getAll();

    request.onsuccess = function () {

        console.log("Collections:", request.result);
        console.log("Step 4 : IndexedDB Success");

        callback(request.result);

    };

    request.onerror = function (event) {

        console.error(
            "Failed",
            event.target.error
        );

    };

}

// ==========================================================
// Save + Refresh Collections
// ==========================================================

function saveCollectionAndRefresh(collection) {

    saveCollection(collection);

    setTimeout(function () {

        getAllCollections(function (collections) {

            console.log("IndexedDB Collections");

            console.log(collections);

        });

    }, 100);

}