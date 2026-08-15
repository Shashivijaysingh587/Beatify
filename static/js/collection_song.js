let activeSongMenu = null;

// ========================================
// Add Song To Current Collection
// ========================================

function addSongToCurrentCollection(songId) {

    getAllCollections(function (collections) {

        const collection = collections.find(

            c => c.id === currentCollectionId

        );

        if (!collection) {

            console.error("Collection not found.");

            return;

        }

        if (!collection.songs) {

            collection.songs = [];

        }

        collection.songs.push(songId);

        saveCollection(collection, function () {

            console.log("✅ Song Added To Collection");

            openCollection(currentCollectionId);

        });

    });

}

// ========================================
// Load Collection Songs
// ========================================

function loadCollectionSongs() {

    getAllCollections(function (collections) {

        const collection = collections.find(

            c => c.id === currentCollectionId

        );

        if (!collection) {

            console.error("Collection not found.");

            return;

        }

        getAllSongsFromDB(function (songs) {

            const collectionSongs = songs.filter(

                song => collection.songs.includes(song.id)

            );

            console.log("Collection Songs :", collectionSongs);
            renderSongList(collectionSongs);

            currentPlaylist = collectionSongs;

            currentPlaylistIndex = 0;

            loadSidebarCollectionSongs(collectionSongs);
            if (collectionSongs.length > 0) {

                playCollectionSong(
                    collectionSongs[0],
                    true
                );

            }

        });

    });

}

// ========================================
// Render Collection Songs
// ========================================

function renderSongList(songArray) {

    const container =
        document.getElementById(
            "collection-song-list"
        );

    container.innerHTML = "";

    if (songArray.length === 0) {

        container.innerHTML = `

        <div class="empty-collection">

            <div class="empty-icon">

                🎵

            </div>

            <h2>

                No Songs Yet

            </h2>

            <p>

                Click "Add Songs" to add your first song.

            </p>

        </div>

        `;

        return;

    }

    songArray.forEach(function (song) {

        container.innerHTML += `

            <div class="collection-song-item"
                 data-id="${song.id}">

                <span class="collection-song-title">

                    🎵 ${song.title}

                </span>

                <button class="collection-song-menu" data-id="${song.id}">

                    ⋮

                </button>

            </div>

        `;

    });

    document.querySelectorAll(".collection-song-item").forEach(item => {

        item.addEventListener("click", function (e) {

            // Ignore menu button click
            if (e.target.classList.contains("collection-song-menu")) {

                return;

            }

            const songId = this.dataset.id;

            getAllSongsFromDB(function (songs) {

                const song = songs.find(s => s.id === songId);

                if (song) {

                    playCollectionSong(song);

                }

            });

        });

    });

}


function renameSong(songId) {

    const newName = prompt(

        "Enter New Song Name"

    );

    if (

        !newName ||

        newName.trim() === ""

    ) {

        return;

    }

    getAllSongsFromDB(function (songs) {

        const song = songs.find(

            s => s.id === songId

        );

        if (!song) {

            return;

        }

        song.title = newName.trim();

        saveSongToDB(

            song,

            function () {

                console.log(

                    "Song Renamed"

                );

                loadCollectionSongs();

            }

        );

    });

}

function removeSongFromCollection(songId) {

    getAllCollections(function (collections) {

        const collection = collections.find(

            c => c.id === currentCollectionId

        );

        if (!collection) {

            return;

        }

        collection.songs = collection.songs.filter(

            id => id !== songId

        );

        saveCollection(

            collection,

            function () {

                console.log(

                    "Song Removed"

                );

                loadCollectionSongs();

                loadCollectionsFromDB();

                openCollection(

                    currentCollectionId

                );

            }

        );

    });

}


function openSongMenu(songId, button) {

    closeSongMenu();

    const menu = document.createElement("div");

    menu.className = "song-menu";

    menu.innerHTML = `

    <button id="rename-song">

        Rename

    </button>

    <button id="remove-song">

        Remove from Collection

    </button>

    <button id="delete-song">

        Delete Song

    </button>

    `;

    menu.querySelector("#rename-song")
        .addEventListener(

            "click",

            function () {

                renameSong(songId);

                closeSongMenu();

            }

        );

    menu.querySelector("#remove-song")
        .addEventListener(

            "click",

            function () {

                removeSongFromCollection(songId);

                closeSongMenu();

            }

        );

    document.body.appendChild(menu);

    const rect = button.getBoundingClientRect();

    const menuWidth = 220;

    let left = rect.right - menuWidth;

    if (left < 10) {

        left = 10;

    }

    menu.style.left = left + "px";

    const menuHeight = 120;   // Approx menu height

    menu.style.top = (rect.top - menuHeight - 5) + "px";

    activeSongMenu = menu;

}



function closeSongMenu() {

    if (activeSongMenu) {

        activeSongMenu.remove();

        activeSongMenu = null;

    }

}