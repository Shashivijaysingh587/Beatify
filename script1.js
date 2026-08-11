
const currentsong = new Audio()
let songs;
let currFolder;
const loginModal =
    document.getElementById("login-modal");
// =====================================================
// User Session
// =====================================================

let isLoggedIn = false;

let currentUser = null;

const FREE_SONG_LIMIT = 3;

const playedSongs = new Set();


// =============================================================

const TOAST_DURATION = 3000;
const signupModal = document.getElementById("signup-modal");
const signupOverlay = document.querySelector(".signup-overlay");

const signupButton = document.querySelector(".signupbtn");
const signupCloseButton = document.getElementById("signup-close-btn");

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

            console.log("Song Clicked");

            console.log("Logged In :", isLoggedIn);

            console.log("Played Songs :", playedSongs);
            console.log("Played Songs Size :", playedSongs.size);


            const track =
                e.querySelector(".info div").innerHTML;

            playSelectedSong(track);

        });

    });

    return songs;
}


// =====================================================
// Check Guest Song Limit
// =====================================================

function canPlaySong(track) {

    console.log("canPlaySong :", track);

    // Logged-in users
    if (isLoggedIn) {
        return true;
    }

    // Song already played
    if (playedSongs.has(track)) {
        return true;
    }

    // Guest limit reached
    if (playedSongs.size >= FREE_SONG_LIMIT) {

        console.log("typeof openLoginModal =", typeof openLoginModal);
        document
            .getElementById("login-modal")
            .classList.add("active");

        document.body.style.overflow = "hidden";

        showToast(
            "Please login to continue listening.",
            "warning"
        );

        return false;
    }

    playedSongs.add(track);
    console.log("Added :", track);
    console.log("Played Songs :", playedSongs);



    return true;
}

// =====================================================
// Play Selected Song
// =====================================================

function playSelectedSong(track) {

    console.log("playSelectedSong :", track);

    if (!canPlaySong(track)) {

        return;

    }

    playMusic(track);

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
                playSelectedSong(songs[0]);
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

    // =====================================================
    // Signup Modal
    // =====================================================



    signupButton.addEventListener("click", openSignupModal);

    signupCloseButton.addEventListener("click", closeSignupModal);

    signupOverlay.addEventListener("click", function (event) {

        if (event.target === signupOverlay) {

            closeSignupModal();

        }

    });


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeSignupModal();

        }

    });


    // =====================================================
    // Login Modal
    // =====================================================

    const loginModal = document.getElementById("login-modal");
    const loginOverlay = document.querySelector(".login-overlay");

    const loginButton = document.querySelector(".loginbtn");

    // =====================================================
    // Update Profile Modal
    // =====================================================

    const updateProfileModal =
        document.getElementById("update-profile-modal");

    const updateProfileOverlay =
        document.querySelector(".update-profile-overlay");

    const updateProfileCloseButton =
        document.getElementById("update-profile-close-btn");

    // =====================================================
    // Update Profile Form Inputs
    // =====================================================

    const updateFullName =
        document.getElementById("update-full-name");

    const updateUsername =
        document.getElementById("update-username");

    const updateEmail =
        document.getElementById("update-email");

    const updateAvatar =
        document.getElementById("update-profile-avatar");

    const saveProfileButton =
        document.getElementById("save-profile-btn");


    // ============  Save Button Event ============

    saveProfileButton.addEventListener("click", function (event) {

        event.preventDefault();

        saveUserProfile();

    });



    // =====================================================
    // Navbar User Greeting
    // =====================================================

    const userGreeting = document.getElementById("user-greeting");
    const userFirstName = document.getElementById("user-firstname");

    const sidebarFullName =
        document.getElementById("sidebar-fullname");

    const sidebarProfileImage =
        document.getElementById("sidebar-profile-image");

    const loginCloseButton = document.getElementById("login-close-btn");

    const openLoginLink = document.getElementById("open-login-modal");
    const openSignupLink = document.getElementById("open-signup-modal");

    // =====================================================
    // Sidebar User Menu
    // =====================================================

    const sidebarMenuButton = document.getElementById("sidebar-menu-btn");

    const sidebarDropdown = document.getElementById("sidebar-dropdown");

    const updateProfileButton = document.getElementById("update-profile-btn");

    const logoutButton = document.getElementById("logout-btn");

    // ============= Logout user ========
    logoutButton.addEventListener("click", function () {

        logoutUser();

    });

    console.log(sidebarMenuButton);
    console.log(sidebarDropdown);

    // =====================================================
    // Toggle Sidebar Dropdown
    // =====================================================

    sidebarMenuButton.addEventListener("click", function (event) {

        event.stopPropagation();

        console.log("Before:", sidebarDropdown.style.display);

        if (sidebarDropdown.style.display === "block") {

            sidebarDropdown.style.display = "none";

        } else {

            sidebarDropdown.style.display = "block";

        }

        console.log("After:", sidebarDropdown.style.display);

    });



    sidebarDropdown.addEventListener("click", function (event) {

        event.stopPropagation();

    });

    document.addEventListener("click", function () {

        sidebarDropdown.style.display = "none";

    });




    // Open Login Modal

    loginButton.addEventListener("click", openLoginModal);

    // Close Login Modal

    loginCloseButton.addEventListener("click", closeLoginModal);

    // Overlay Close

    loginOverlay.addEventListener("click", function (event) {

        if (event.target === loginOverlay) {

            closeLoginModal();

        }

    });


    // =====================================================
    // Signup Form
    // =====================================================

    const signupForm = document.getElementById("signup-form");

    const fullNameInput = document.getElementById("signup-fullname");
    const usernameInput = document.getElementById("signup-username");
    const emailInput = document.getElementById("signup-email");
    const passwordInput = document.getElementById("signup-password");
    const confirmPasswordInput = document.getElementById("signup-confirm-password");
    const termsInput = document.getElementById("signup-terms");

    // Error Elements

    const fullNameError = document.getElementById("fullname-error");
    const usernameError = document.getElementById("username-error");
    const emailError = document.getElementById("email-error");
    const passwordError = document.getElementById("password-error");
    const confirmPasswordError = document.getElementById("confirm-password-error");
    const termsError = document.getElementById("terms-error");


    signupForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (!validateSignupForm()) {
            return;
        }

        console.log("Validation Passed");

        const userData = {

            full_name: fullNameInput.value.trim(),

            username: usernameInput.value.trim(),

            email: emailInput.value.trim(),

            password: passwordInput.value

        };

        try {

            const response = await fetch("/signup", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(userData)

            });

            const result = await response.json();

            if (result.success) {

                alert(result.message);

                resetSignupForm();

                closeSignupModal();

            } else {

                alert(result.message);


            }

        } catch (error) {

            console.error("Signup Error:", error);

        }

    });

    // =====================================================
    // Signup Modal Functions
    // =====================================================

    function openSignupModal() {

        signupModal.classList.add("active");

        document.body.style.overflow = "hidden";

    }

    function closeSignupModal() {

        signupModal.classList.remove("active");

        document.body.style.overflow = "auto";

    }


    // =====================================================
    // Login Modal Functions
    // =====================================================

    function openLoginModal() {

        loginModal.classList.add("active");

        document.body.style.overflow = "hidden";

    }

    function closeLoginModal() {

        loginModal.classList.remove("active");

        document.body.style.overflow = "auto";

    }

    // =====================================================
    // Logout User
    // =====================================================

    async function logoutUser() {

        try {

            const response = await fetch("/logout", {

                method: "POST"

            });

            const result = await response.json();

            if (!result.success) {

                showToast(result.message, "error");

                return;

            }

            showToast(result.message, "success");

            location.reload();

        }

        catch (error) {

            console.error("Logout Error:", error);

            showToast(
                "Something went wrong.",
                "error"
            );

        }

    }

    // =====================================================
    // Validate Login Form
    // =====================================================

    function validateLoginForm() {

        let isValid = true;

        // Clear Previous Errors

        identifierError.textContent = "";

        loginPasswordError.textContent = "";

        // Email / Username

        if (identifierInput.value.trim() === "") {

            identifierError.textContent =
                "Please enter your email or username.";

            isValid = false;

        }

        // Password

        if (loginPasswordInput.value.trim() === "") {

            loginPasswordError.textContent =
                "Please enter your password.";

            isValid = false;

        }

        return isValid;

    }

    // =====================================================
    // Reset Signup Form
    // =====================================================

    function resetSignupForm() {

        signupForm.reset();

        fullNameError.textContent = "";
        usernameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        confirmPasswordError.textContent = "";
        termsError.textContent = "";

    }

    // =====================================================
    // Validate Signup Form
    // =====================================================

    function validateSignupForm() {

        let isValid = true;

        // Clear Previous Errors
        fullNameError.textContent = "";
        usernameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        confirmPasswordError.textContent = "";
        termsError.textContent = "";

        // Full Name
        if (fullNameInput.value.trim().length < 3) {

            fullNameError.textContent =
                "Full name must be at least 3 characters.";

            isValid = false;
        }

        // Username
        if (usernameInput.value.trim().length < 4) {

            usernameError.textContent =
                "Username must be at least 4 characters.";

            isValid = false;
        }

        // Email
        if (!emailInput.value.includes("@")) {

            emailError.textContent =
                "Please enter a valid email address.";

            isValid = false;
        }

        // Password
        if (passwordInput.value.length < 8) {

            passwordError.textContent =
                "Password must be at least 8 characters.";

            isValid = false;
        }

        // Confirm Password
        if (passwordInput.value !== confirmPasswordInput.value) {

            confirmPasswordError.textContent =
                "Passwords do not match.";

            isValid = false;
        }

        // Terms
        if (!termsInput.checked) {

            termsError.textContent =
                "Please accept the Terms & Privacy Policy.";

            isValid = false;
        }

        return isValid;

    }

    // =====================================================
    // Login Form
    // =====================================================

    const loginForm = document.getElementById("login-form");

    const identifierInput = document.getElementById("login-identifier");
    const loginPasswordInput = document.getElementById("login-password");

    // Error Elements

    const identifierError = document.getElementById("identifier-error");
    const loginPasswordError = document.getElementById("login-password-error");


    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (!validateLoginForm()) {
            return;
        }

        const loginData = {

            identifier: identifierInput.value.trim(),

            password: loginPasswordInput.value

        };

        try {

            const response = await fetch("/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(loginData)

            });

            const result = await response.json();

            if (result.success) {

                alert(result.message);

                loginForm.reset();

                closeLoginModal();

            } else {

                alert(result.message);

            }

        } catch (error) {

            console.error("Login Error:", error);

        }

    });



    // =====================================================
    // Signup ↔ Login Switch
    // =====================================================

    // Signup → Login

    openLoginLink.addEventListener("click", function (event) {

        event.preventDefault();

        closeSignupModal();

        openLoginModal();

    });

    // Login → Signup

    openSignupLink.addEventListener("click", function (event) {

        event.preventDefault();

        closeLoginModal();

        openSignupModal();

    });

    function openUpdateProfileModal() {

        loadUserProfile();

        updateProfileModal.classList.add("active");

        sidebarDropdown.style.display = "none";

        document.body.style.overflow = "hidden";

    }

    function closeUpdateProfileModal() {

        updateProfileModal.classList.remove("active");

        document.body.style.overflow = "auto";

    }

    updateProfileButton.addEventListener("click", function () {

        openUpdateProfileModal();

    });

    updateProfileCloseButton.addEventListener("click", function () {

        closeUpdateProfileModal();

    });

    updateProfileOverlay.addEventListener("click", function (event) {

        if (event.target === updateProfileOverlay) {

            closeUpdateProfileModal();

        }

    });

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
            playSelectedSong(songs[index - 1])
        } else {
            playSelectedSong(songs[songs.length - 1])
        }

    })

    //    Add an event listner for next song
    let next = document.getElementById("next")
    next.addEventListener("click", () => {

        // let index = songs.indexOf(currentsong.src.split("song/")[1])
        let index = songs.indexOf(currentsong.src.split("song/").slice(-1)[0])
        //  playMusic(songs[index+1]);

        if (index == songs.length - 1) {
            playSelectedSong(songs[0])
        } else {
            playSelectedSong(songs[index + 1])
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

    // =====================================================
    // Check Current User
    // =====================================================

    async function checkCurrentUser() {

        try {

            const response = await fetch("/current-user");

            const result = await response.json();

            console.log(result);


            if (result.logged_in) {

                isLoggedIn = true;

                currentUser = result.user;

                // Hide Login & Signup

                loginButton.style.display = "none";
                signupButton.style.display = "none";

                // Show Greeting

                userGreeting.style.display = "flex";

                // Extract First Name

                const firstName = currentUser.full_name.split(" ")[0];

                userFirstName.textContent =
                    firstName.charAt(0).toUpperCase() +
                    firstName.slice(1).toLowerCase();

            }
            else {

                isLoggedIn = false;

                currentUser = null;

                loginButton.style.display = "block";

                signupButton.style.display = "block";

                userGreeting.style.display = "none";

            }

        } catch (error) {

            console.error("Current User Error:", error);

        }

    }

    // =====================================================
    // Load User Profile
    // =====================================================

    async function loadUserProfile() {

        try {

            const response = await fetch("/profile");

            const result = await response.json();

            if (!result.success) {

                alert(result.message);

                return;

            }

            updateFullName.value = result.user.full_name;

            updateUsername.value = result.user.username;

            updateEmail.value = result.user.email;

            const firstLetter =
                result.user.full_name
                    .trim()
                    .charAt(0)
                    .toUpperCase();

            updateAvatar.textContent = firstLetter;

        }

        catch (error) {

            console.error("Profile Load Error:", error);

        }

    }

    // =====================================================
    // Update User Interface
    // =====================================================

    function updateUserInterface(user) {

        const firstName =
            user.full_name
                .trim()
                .split(" ")[0];

        // Navbar

        userFirstName.textContent =
            firstName.charAt(0).toUpperCase() +
            firstName.slice(1).toLowerCase();

        // Sidebar

        sidebarFullName.textContent =
            user.full_name;

        sidebarProfileImage.textContent =
            firstName.charAt(0).toUpperCase();

    }

    // =====================================================
    // Show Toast
    // =====================================================

    function showToast(message, type = "success") {

        toastMessage.textContent = message;

        switch (type) {

            case "success":

                toast.style.background = "#1DB954";

                toastIcon.textContent = "✓";

                break;

            case "error":

                toast.style.background = "#E53935";

                toastIcon.textContent = "✕";

                break;

            case "warning":

                toast.style.background = "#FB8C00";

                toastIcon.textContent = "⚠";

                break;

            case "info":

                toast.style.background = "#1E88E5";

                toastIcon.textContent = "ℹ";

                break;

        }

        toast.classList.add("show");

        setTimeout(function () {

            toast.classList.remove("show");

        }, TOAST_DURATION);

    }

    // =====================================================
    // Save User Profile
    // =====================================================

    async function saveUserProfile() {

        try {

            const response = await fetch("/profile", {

                method: "PUT",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    full_name: updateFullName.value.trim(),

                    username: updateUsername.value.trim()

                })

            });

            const result = await response.json();

            if (!result.success) {
                showToast(result.message, "error");

                return;

            }

            updateUserInterface({

                full_name: updateFullName.value.trim()

            });

            showToast(result.message, "success");

            closeUpdateProfileModal();

        }

        catch (error) {

            console.error("Profile Update Error:", error);

        }

    }

    checkCurrentUser();

}

main()