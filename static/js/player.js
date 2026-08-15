// ==========================================================
// Beatify Music Player
// ==========================================================

const playButton = document.getElementById("play");
// Audio Object

const audio = new Audio();


// Current Playlist

let currentPlaylist = [];


// Current Song Index

let currentSongIndex = -1;


// Current Song Object

let currentSong = null;


// Player State

let isPlaying = false;

// ==========================================================
// Initialize Player
// ==========================================================

function initializePlayer() {

    console.log("🎵 Beatify Player Ready");

    audio.addEventListener("loadedmetadata", function () {

        const duration = formatTime(audio.duration);

        document.querySelector(".songtime").textContent =
            `00:00 / ${duration}`;

    });

    audio.addEventListener("timeupdate", function () {

        const current = formatTime(audio.currentTime);

        const duration = formatTime(audio.duration);

        document.querySelector(".songtime").textContent =
            `${current} / ${duration}`;


    });

    playButton.addEventListener(

        "click",

        togglePlayPause

    );

    audio.addEventListener(

        "play",

        function () {

            playButton.src = "/static/svg/pause.svg";

        }

    );

    audio.addEventListener(

        "pause",

        function () {

            playButton.src = "/static/svg/play.svg";

        }

    );

}

initializePlayer();

// ==========================================================
// Play Song
// ==========================================================

function playSong(song) {

    if (!song) {

        console.error("No Song Found");

        return;

    }

    currentSong = song;

   
    loadSong(song);

    audio.play();

    isPlaying = true;
    playButton.src = "/static/svg/pause.svg";

    updatePlayerUI(song);

    console.log("Current Song :", currentSong);

    console.log("▶ Playing :", song.title);

}

// ==========================================================
// Update Bottom Player
// ==========================================================

function updatePlayerUI(song) {

    document.querySelector(".songinfo").textContent = song.title;

}

function formatTime(seconds) {

    if (isNaN(seconds)) {

        return "00:00";

    }

    const minutes = Math.floor(seconds / 60);

    const secs = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

}

// ==========================================================
// Toggle Play / Pause
// ==========================================================

function togglePlayPause() {

    if (!currentSong) {

        return;

    }

    if (audio.paused) {

        audio.play();

    } else {

        audio.pause();

    }

}

function loadSidebarCollectionSongs(songArray) {

    let songUl = document.querySelector(".songList ul");

    songUl.innerHTML = "";

    songArray.forEach(song => {

        songUl.innerHTML += `

            <li data-id="${song.id}">

                <div class="album">

                    <div>

                        <img src="/static/svg/music.svg"
                             class="invert1 musicimg">

                    </div>

                    <div class="info">

                        <div>${song.title}</div>

                    </div>

                </div>

                <div class="playnow">

                    <span>Play Now</span>

                    <img src="/static/svg/play.svg"
                         class="invert1 playimg">

                </div>

            </li>

        `;

    });

    document.querySelectorAll(".songList li").forEach(li => {

        li.addEventListener("click", function () {

            const id = this.dataset.id;

            const song = songArray.find(s => s.id === id);

            if (song) {

                playSong(song);

            }

        });

    });

}


function loadSong(song) {

    currentSong = song;

    audio.src = URL.createObjectURL(song.file);

    updatePlayerUI(song);

    playButton.src = "/static/svg/play.svg";

}