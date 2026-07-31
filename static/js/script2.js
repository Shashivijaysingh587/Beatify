
const currentsong = new Audio()
let songs;
let currFolder;

function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00"
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

async function getSongs(folder) {

    currFolder = folder;

    // folder = "song/Bhakti"
    const folderName = folder.split("/")[1];

    let response = await fetch(`/api/songs/${folderName}`);

    songs = await response.json();

    let songUl = document.querySelector(".songList ul");

    songUl.innerHTML = "";

    for (const song of songs) {

        songUl.innerHTML += `
        <li>
            <div class="album">
                <div>
                    <img src="/static/svg/music.svg" alt="" class="invert1 musicimg">
                </div>

                <div class="info">
                    <div>${decodeURIComponent(song)}</div>
                </div>
            </div>

            <div class="playnow">
                <span>Play Now</span>
                <img src="/static/svg/play.svg" alt="" class="invert1 playimg">
            </div>
        </li>`;
    }

    Array.from(document.querySelectorAll(".songList li")).forEach((e) => {

        e.addEventListener("click", () => {

            playMusic(
                e.querySelector(".info div").innerHTML
            );

        });

    });

    return songs;
}

const playMusic = (track, pause = false) => {
    // let audio = new Audio("song/"+track)

    const folderName = currFolder.split("/")[1];
    currentsong.src = `/song/${folderName}/${track}`;
    if (!pause) {
        currentsong.play();
        play.src = "/static/svg/pause.svg";;

    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00/00:00";

    // play.click()
}

// const playlab = (img)=>{
//     if(currentsong.paused){
//         img.src = "pause.svg"
//     }else{
//         img.src = "play.svg"
//     }
//     img.src = "pause.svg"
// }

async function displayAlbum() {

    let cards = document.querySelectorAll(".card");

    cards.forEach((card) => {

        card.addEventListener("click", async () => {

            const folder = card.dataset.folder;

            songs = await getSongs(`song/${folder}`);

            if (songs.length > 0) {
                playMusic(songs[0]);
            }

        });

    });

}
async function main() {


    // Get the all list of songs
    await getSongs("song/Arjit");

    playMusic(songs[0], true)

    // show all the albums
    displayAlbum()


    let play = document.getElementById("play")

    play.addEventListener("click", () => {
        if (currentsong.paused) {
            currentsong.play()
            play.src = "/static/svg/pause.svg";
        }
        else {
            currentsong.pause()
            play.src = "/static/svg/play.svg";
        }
    })


    currentsong.addEventListener("timeupdate", () => {

        document.querySelector(".songtime").innerHTML = `${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)}`

        document.querySelector(".circle").style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%"
        if (currentsong.currentTime === currentsong.duration) {
            play.src = "/static/svg/play.svg";
            document.querySelector(".circle").style.left = "0%"
        }

    })

    let seekbar = document.querySelector(".seekbar");
    seekbar.addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%"
        currentsong.currentTime = (currentsong.duration) * percent / 100;

    })

    //    Add an event listener for hamburger

    let hamburger = document.querySelector(".hamburger");
    hamburger.addEventListener("click", () => {
        let library = document.querySelector(".library");
        library.style.left = "0%"
    })

    //    Add an event listener for close library button

    let close = document.querySelector(".library-btn>img")
    close.addEventListener("click", () => {
        document.querySelector(".library").style.left = "-120%"
    })

    //    Add an event listner for previous song
    let previous = document.getElementById("previous")
    previous.addEventListener("click", () => {
        let index = songs.indexOf(currentsong.src.split("song/").slice(-1)[0])
        //  playMusic(songs[index-1]);

        if (index > 0) {
            playMusic(songs[index - 1])
        } else {
            playMusic(songs[songs.length - 1])
        }

    })

    //    Add an event listner for next song
    let next = document.getElementById("next")
    next.addEventListener("click", () => {

        // let index = songs.indexOf(currentsong.src.split("song/")[1])
        let index = songs.indexOf(currentsong.src.split("song/").slice(-1)[0])
        //  playMusic(songs[index+1]);

        if (index == songs.length - 1) {
            playMusic(songs[0])
        } else {
            playMusic(songs[index + 1])
        }
        console.log(songs, index);
        console.log(songs.length);
    })

    // Load the playlist whenever card is clicked
    // Array.from(document.getElementsByClassName("card")).forEach((e)=>{
    //     e.addEventListener("click", item=>{
    //         item.dataset.folder
    //     })
    // })



}
main()