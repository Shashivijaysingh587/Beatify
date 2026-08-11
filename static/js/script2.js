
const currentsong = new Audio()
let songs;
let currFolder;

// ==========================================================
// OTP Countdown
// ==========================================================

let otpCountdown = null;

let otpRemainingSeconds = 0;

// =====================================================
// User Session
// =====================================================

let isLoggedIn = false;

let currentUser = null;

const FREE_SONG_LIMIT = 3;

const playedSongs = new Set(
    JSON.parse(localStorage.getItem("playedSongs")) || []
);


// =============================================================

// =====================================================
// Global DOM Elements
// =====================================================

const toast = document.getElementById("toast");

const toastMessage = document.getElementById("toast-message");

const toastIcon = document.getElementById("toast-icon");

const TOAST_DURATION = 3000;
const signupModal = document.getElementById("signup-modal");
const signupOverlay = document.querySelector(".signup-overlay");

const signupModalButton =
    document.querySelector(".signupbtn");
const signupCloseButton = document.getElementById("signup-close-btn");

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

// =====================================================
// Signup Form
// =====================================================

const signupForm = document.getElementById("signup-form");

const fullNameInput = document.getElementById("signup-fullname");
const usernameInput = document.getElementById("signup-username");
const emailInput = document.getElementById("signup-email");
const passwordInput = document.getElementById("signup-password");
const termsInput = document.getElementById("signup-terms");
const signupSubmitButton =
    document.getElementById("signup-btn");

const signupTerms =
    document.getElementById("signup-terms");


const confirmPasswordInput =
    document.getElementById("signup-confirm-password");

const toggleSignupPassword =
    document.getElementById("toggle-signup-password");

const toggleConfirmPassword =
    document.getElementById("toggle-confirm-password");


const passwordStrengthBar =
    document.getElementById("password-strength-bar");

const passwordStrengthText =
    document.getElementById("password-strength-text");

const ruleLength =
    document.getElementById("rule-length");

const ruleUppercase =
    document.getElementById("rule-uppercase");

const ruleLowercase =
    document.getElementById("rule-lowercase");

const ruleNumber =
    document.getElementById("rule-number");

const ruleSpecial =
    document.getElementById("rule-special");




// Error Elements

const fullNameError = document.getElementById("fullname-error");
const usernameError = document.getElementById("username-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirm-password-error");
const termsError = document.getElementById("terms-error");

// =====================================================
// Login Form
// =====================================================

const loginForm = document.getElementById("login-form");

const identifierInput = document.getElementById("login-identifier");
const loginPasswordInput = document.getElementById("login-password");

// Error Elements

const identifierError = document.getElementById("identifier-error");
const loginPasswordError = document.getElementById("login-password-error");

const play = document.getElementById("play")
const previous = document.getElementById("previous")
const next = document.getElementById("next")
const close = document.querySelector(".library-btn>img")
const hamburger = document.querySelector(".hamburger");
const seekbar = document.querySelector(".seekbar");
const circle = document.querySelector(".circle");
const songtime = document.querySelector(".songtime")
const songinfo = document.querySelector(".songinfo")
const library = document.querySelector(".library");
const cancelProfileButton =
    document.getElementById("update-profile-cancel-btn");


// ==========================================================
// OTP Elements
// ==========================================================

const otpModal =
    document.getElementById("otp-modal");

const otpCloseBtn =
    document.getElementById("otp-close-btn");

const otpEmail =
    document.getElementById("otp-email");

const otpInputs =
    document.querySelectorAll(".otp-input");

const otpError =
    document.getElementById("otp-error");

const verifyOtpBtn =
    document.getElementById("verify-otp-btn");

const otpTimer =
    document.getElementById("otp-timer");

const resendOtpButton =
    document.getElementById("resend-otp");

// =================== Profile Image ===================


const profileImageInput =
    document.getElementById("profile-image-input");

const sidebarProfilePhoto =
    document.getElementById("sidebar-profile-photo");

const sidebarProfileLetter =
    document.getElementById("sidebar-profile-letter");

//==================== profile update ======================

const updateProfilePhoto =
    document.getElementById(
        "update-profile-photo"
    );

const updateProfileLetter =
    document.getElementById(
        "update-profile-letter"
    );

const changeProfilePhotoBtn =
    document.getElementById(
        "change-profile-photo-btn"
    );
const updateProfileAvatar =
    document.getElementById(
        "update-profile-avatar"
    );

// ============ user song folder ===============


const viewAllButton =
    document.getElementById(
        "view-all-btn"
    );

const yourCollectionsButton =
    document.getElementById(
        "your-collections-btn"
    );

const viewAllSection =
    document.getElementById(
        "view-all-section"
    );

const yourCollectionsSection =
    document.getElementById(
        "your-collections-section"
    );

const playlistTitle =
    document.getElementById(
        "playlist-title"
    );

/* ========================= */
/* Collection Modal */
/* ========================= */

const createCollectionBtn =
    document.getElementById("create-collection-btn");

const collectionModal =
    document.getElementById("collection-modal");

const closeCollectionModalBtn =
    document.getElementById("close-collection-modal");

const cancelCollection =
    document.getElementById("cancel-collection");


// =================== user collection folder ===================

const collectionName =
    document.getElementById("collection-name");

const collectionDescription =
    document.getElementById("collection-description");

const collectionCover =
    document.getElementById("collection-cover");

const createCollection =
    document.getElementById("create-collection");

const featuredSection =
    document.getElementById("featured-section");

const collectionsSection =
    document.getElementById("collections-section");

const collectionsHeader =
    document.getElementById("collections-header");


const collectionDetailsSection =
    document.getElementById("collection-details-section");

const collectionTitle =
    document.getElementById("collection-title");

const collectionSongCount =
    document.getElementById("collection-song-count");

const backToCollections =
    document.getElementById("back-to-collections");

// ====================================
// Current Open Collection
// ====================================



const addSongBtn =
    document.getElementById("add-song-btn");

// ==========================================================
// Pending Signup Email
// ==========================================================

let pendingSignupEmail = "";



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

// =================== show all user song folder ========================

function showViewAll() {

    featuredSection.style.display = "block";

    collectionsSection.style.display = "none";

    createCollectionBtn.style.display = "none";

    viewAllButton.classList.add("active");

    yourCollectionsButton.classList.remove("active");

}

function showYourCollections() {

    featuredSection.style.display = "none";

    collectionsSection.style.display = "block";

    collectionsHeader.style.display = "flex";

    createCollectionBtn.style.display = "block";

    viewAllButton.classList.remove("active");

    yourCollectionsButton.classList.add("active");

}

viewAllButton.addEventListener(

    "click",

    showViewAll

);

yourCollectionsButton.addEventListener(

    "click",

    showYourCollections

);

addSongBtn.addEventListener(

    "click",

    function () {

        openSongPicker();

    }

);

// ================================
//  open model collection 
// ================================



createCollectionBtn.addEventListener(
    "click",
    openCollectionModal
);

closeCollectionModalBtn.addEventListener(
    "click",
    closeCollectionModal
);

cancelCollection.addEventListener(
    "click",
    closeCollectionModal
);

collectionModal.addEventListener(
    "click",
    function (e) {

        if (e.target === collectionModal) {

            closeCollectionModal();

        }

    }
);

document.addEventListener(
    "keydown",
    function (e) {

        if (

            e.key === "Escape" &&

            collectionModal.style.display === "flex"

        ) {

            closeCollectionModal();

        }

    }
);
console.log("Step 2 : Before saveCollection");
// ==============================
// save function for user collection 
// ===================================

function saveCollectionLocal(collection) {

    console.log("Step 3 : saveCollection Started");

    let collections =
        JSON.parse(
            localStorage.getItem("beatifyCollections")
        ) || [];

    collections.push(collection);

    localStorage.setItem(
        "beatifyCollections",
        JSON.stringify(collections)
    );



}

// ============================
// create function for user collection
// ================================

function createNewCollection() {

    const name = collectionName.value.trim();

    const description = collectionDescription.value.trim();

    if (name === "") {

        alert("Collection name is required.");

        collectionName.focus();

        return;

    }

    const collection = {

        id: "col_" + Date.now(),

        name: name,

        description: description,

        cover: "",

        songs: [],

        createdAt: new Date().toISOString()

    };

    saveCollection(collection, function () {

        console.log("Collection Saved Successfully");

        loadCollectionsFromDB();

    });

    collectionName.value = "";

    collectionDescription.value = "";

    closeCollectionModal();

}

// ======== button event user collection ====

createCollection.addEventListener(

    "click",

    createNewCollection

);


function loadCollections() {

    const collections =
        JSON.parse(
            localStorage.getItem("beatifyCollections")
        ) || [];

    const container =
        document.getElementById("collections-container");

    container.innerHTML = "";

    collections.forEach(collection => {

        container.innerHTML +=
            createCollectionCard(collection);

    });

}



document.addEventListener("click", function (e) {

    const card = e.target.closest(".collection-card");

    if (!card) return;

    openCollection(card.dataset.id);
    

});

document.addEventListener("click", function (e) {

    if (e.target.classList.contains("collection-song-menu")) {

        openSongMenu(

            e.target.dataset.id,

            e.target

        );

        return;

    }

    closeSongMenu();

});



backToCollections.addEventListener("click", function () {

    collectionDetailsSection.style.display = "none";

    collectionsSection.style.display = "block";

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


function togglePasswordVisibility(input, button) {

    const icon = button.querySelector("i");

    if (input.type === "password") {

        input.type = "text";

        icon.classList.remove("fa-eye");

        icon.classList.add("fa-eye-slash");

    }

    else {

        input.type = "password";

        icon.classList.remove("fa-eye-slash");

        icon.classList.add("fa-eye");

    }

}


function checkPasswordRules(password) {

    return {

        length: password.length >= 8,

        uppercase: /[A-Z]/.test(password),

        lowercase: /[a-z]/.test(password),

        number: /[0-9]/.test(password),

        special: /[^A-Za-z0-9]/.test(password)

    };

}

function updateRule(ruleElement, isValid) {

    if (isValid) {

        ruleElement.classList.add("valid");

        ruleElement.textContent =
            "✔ " +
            ruleElement.textContent.replace("✔ ", "").replace("✖ ", "");

    }

    else {

        ruleElement.classList.remove("valid");

        ruleElement.textContent =
            "✖ " +
            ruleElement.textContent.replace("✔ ", "").replace("✖ ", "");

    }

}

function checkConfirmPassword() {

    const password =
        passwordInput.value;

    const confirmPassword =
        confirmPasswordInput.value;

    // User ne confirm password likhna start hi nahi kiya


    if (confirmPassword === "") {

        confirmPasswordError.textContent = "";

        return;

    }

    if (password === confirmPassword) {

        confirmPasswordError.textContent =
            "✔ Passwords match";

        confirmPasswordError.style.color =
            "#1DB954";

    }

    else {

        confirmPasswordError.textContent =
            "✖ Passwords do not match";

        confirmPasswordError.style.color =
            "#ff4d4d";

    }

}


function updatePasswordStrength(rules) {

    const password =
        passwordInput.value;

    if (password.length === 0) {

        passwordStrengthBar.style.width = "0%";

        passwordStrengthBar.style.background = "#2a2a2a";

        passwordStrengthText.textContent =
            "Strength: -";

        return;

    }

    let score = 0;

    if (rules.length) score++;
    if (rules.uppercase) score++;
    if (rules.lowercase) score++;
    if (rules.number) score++;
    if (rules.special) score++;

    if (score <= 2) {

        passwordStrengthBar.style.width = "33%";
        passwordStrengthBar.style.background = "#ff4d4d";

        passwordStrengthText.textContent =
            "Strength: Weak";

    }

    else if (score <= 4) {

        passwordStrengthBar.style.width = "66%";
        passwordStrengthBar.style.background = "#ffc107";

        passwordStrengthText.textContent =
            "Strength: Medium";

    }

    else {

        passwordStrengthBar.style.width = "100%";
        passwordStrengthBar.style.background = "#1DB954";

        passwordStrengthText.textContent =
            "Strength: Strong";

    }

}

function updateSignupButton() {

    const password =
        passwordInput.value;

    const confirmPassword =
        confirmPasswordInput.value;

    const rules =
        checkPasswordRules(password);

    const isPasswordValid =
        rules.length &&
        rules.uppercase &&
        rules.lowercase &&
        rules.number &&
        rules.special;

    console.log({
        fullName: fullNameInput.value.trim() !== "",
        username: usernameInput.value.trim() !== "",
        email: emailInput.value.trim() !== "",
        passwordValid: isPasswordValid,
        passwordMatch: password === confirmPasswordInput.value,
        terms: signupTerms.checked
    });


    const isFormValid =

        fullNameInput.value.trim() !== "" &&

        usernameInput.value.trim() !== "" &&

        emailInput.value.trim() !== "" &&

        isPasswordValid &&

        password === confirmPassword &&

        signupTerms.checked;

    if (isFormValid) {

        signupSubmitButton.disabled = false;
        signupSubmitButton.removeAttribute("disabled");

    }
    else {

        signupSubmitButton.disabled = true;
        signupSubmitButton.setAttribute("disabled", "disabled");

    }


}


// ==========================================================
// Open OTP Modal
// ==========================================================

function openOtpModal(email) {

    pendingSignupEmail = email;

    otpEmail.textContent = email;

    otpModal.classList.add("active");

    otpInputs[0].focus();

    otpInputs.forEach(input => {

        input.value = "";

    });

    otpError.textContent = "";

    updateVerifyOtpButton();

}

// ==========================================================
// Close OTP Modal
// ==========================================================

function closeOtpModal() {

    // ----------------------------------------
    // Close OTP Modal
    // ----------------------------------------

    otpModal.classList.remove("active");

    pendingSignupEmail = "";

    // ----------------------------------------
    // Enable Create Free Account Button
    // ----------------------------------------

    signupSubmitButton.disabled = false;

    signupSubmitButton.textContent =
        "Create Free Account";

}

// ==========================================================
// Format OTP Time
// ==========================================================

function formatOtpTime(seconds) {

    const minutes =
        String(Math.floor(seconds / 60))
            .padStart(2, "0");

    const secs =
        String(seconds % 60)
            .padStart(2, "0");

    return `${minutes}:${secs}`;

}

// ==========================================================
// Start OTP Countdown
// ==========================================================

function startOtpCountdown(seconds) {

    // ----------------------------------------
    // Stop Previous Timer
    // ----------------------------------------

    clearInterval(otpCountdown);

    // ----------------------------------------
    // Store Remaining Seconds
    // ----------------------------------------

    otpRemainingSeconds = seconds;

    // ----------------------------------------
    // Disable Resend Button
    // ----------------------------------------

    resendOtpButton.classList.add("disabled-resend");

    // ----------------------------------------
    // Update Timer Immediately
    // ----------------------------------------

    otpTimer.textContent =
        formatOtpTime(otpRemainingSeconds);

    // ----------------------------------------
    // Start Countdown
    // ----------------------------------------

    otpCountdown = setInterval(() => {

        otpRemainingSeconds--;

        // ----------------------------
        // Timer Finished
        // ----------------------------

        if (otpRemainingSeconds <= 0) {

            clearInterval(otpCountdown);

            otpRemainingSeconds = 0;

            otpTimer.textContent = "00:00";

            resendOtpButton.classList.remove(
                "disabled-resend"
            );

            return;

        }

        // ----------------------------
        // Update Timer
        // ----------------------------

        otpTimer.textContent =
            formatOtpTime(
                otpRemainingSeconds
            );

    }, 1000);

}

// ==========================================================
// Resend Verification Code
// ==========================================================

resendOtpButton.addEventListener("click", async function () {

    // ----------------------------------------
    // Disable Button
    // ----------------------------------------

    resendOtpButton.classList.add(
        "disabled-resend"
    );

    try {

        const response = await fetch(

            "/resend-otp",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    email: pendingSignupEmail

                })

            }

        );

        const result =
            await response.json();

        console.log(result);
        // ----------------------------------------
        // Success
        // ----------------------------------------

        if (result.success) {

            showToast(
                result.message,
                "success"
            );

            // Restart Timer
            startOtpCountdown(
                result.data.remaining_seconds
            );

            // Clear OTP Boxes
            otpInputs.forEach(input => {

                input.value = "";

            });

            // Focus First Input
            otpInputs[0].focus();

        }
        else {

            showToast(
                result.message,
                "error"
            );

            resendOtpButton.classList.remove(
                "disabled-resend"
            );

        }

    }

    catch (error) {

        console.error(error);
        showToast(
            "Something went wrong.",
            "error"
        );

        resendOtpButton.classList.remove(
            "disabled-resend"
        );

    }

});


// ==========================================================
// OTP Input Navigation
// ==========================================================

otpInputs.forEach((input, index) => {

    input.addEventListener("input", function () {

        // Sirf number allow
        this.value = this.value.replace(/\D/g, "");

        // Next box
        if (this.value !== "" && index < otpInputs.length - 1) {

            otpInputs[index + 1].focus();

        }

        updateVerifyOtpButton();

    });

    input.addEventListener("keydown", function (event) {

        // Previous box
        if (

            event.key === "Backspace" &&

            this.value === "" &&

            index > 0

        ) {

            otpInputs[index - 1].focus();

        }

    });

});

// ==========================================================
// Prevent Skipping OTP Boxes
// ==========================================================

otpInputs.forEach((input, index) => {

    input.addEventListener("click", function () {

        // First empty box
        const firstEmpty =
            Array.from(otpInputs).findIndex(

                otp => otp.value === ""

            );

        // Agar sab filled hain
        if (firstEmpty === -1) {

            return;

        }

        // Wrong box pe click kiya
        if (index !== firstEmpty) {

            otpInputs[firstEmpty].focus();

        }

    });

});

// ==========================================================
// OTP Paste Support
// ==========================================================

otpInputs[0].addEventListener("paste", function (event) {

    event.preventDefault();

    const pastedData =
        event.clipboardData
            .getData("text")
            .trim();

    // Sirf 6 digit allow
    if (!/^\d{6}$/.test(pastedData)) {

        return;

    }

    pastedData
        .split("")
        .forEach((digit, index) => {

            otpInputs[index].value = digit;

        });

    otpInputs[5].focus();
    updateVerifyOtpButton();

});

// ==========================================================
// OTP Button State
// ==========================================================

function updateVerifyOtpButton() {

    const otp = Array.from(otpInputs)
        .map(input => input.value)
        .join("");

    verifyOtpBtn.disabled = otp.length !== 6;

}

// ==========================================================
// Verify Signup OTP
// ==========================================================

verifyOtpBtn.addEventListener(

    "click",

    async function () {

        // code yaha aayega
        const otp = Array.from(

            otpInputs

        ).map(

            input => input.value.trim()

        ).join("");

        otpError.textContent = "";



        if (otp.length !== 6) {

            otpError.textContent =
                "Please enter the complete 6-digit verification code.";

            return;

        }

        if (!/^\d{6}$/.test(otp)) {

            otpError.textContent =
                "Please enter a valid 6-digit verification code.";

            return;

        }

        verifyOtpBtn.disabled = true;

        verifyOtpBtn.textContent =
            "Verifying...";



        try {

            // fetch
            const response = await fetch(

                "/verify-email-otp",

                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        email: otpEmail.textContent.trim(),

                        otp: otp

                    })

                }

            );
            const result =
                await response.json();

            if (result.success) {


                // clearOtpInputs();

                // stopOtpCountdown();

                // checkLoginStatus();
                verifyOtpBtn.disabled = false;

                verifyOtpBtn.textContent =
                    "Verify OTP";

                closeOtpModal();

                showToast(

                    result.message,

                    "success"

                );

                otpError.textContent = "";
                location.reload();

                return;

            }
            // Failed Verification

            verifyOtpBtn.disabled = false;

            verifyOtpBtn.textContent = "Verify OTP";

            otpError.textContent = result.message;


        }

        catch (error) {

            console.error(error);
            otpError.textContent = "";

            showToast(

                "Something went wrong.",

                "error"

            );

            verifyOtpBtn.disabled = false;

            verifyOtpBtn.textContent =
                "Verify OTP";


        }

    }

);



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
// =====================================================
// Check Current User
// =====================================================

async function checkCurrentUser() {

    try {

        const response = await fetch("/current-user");

        const result = await response.json();




        if (result.logged_in) {

            isLoggedIn = true;

            currentUser = result.user;

            updateUserInterface(currentUser);

            // Hide Login & Signup

            loginButton.style.display = "none";
            signupModalButton.style.display = "none";

            // Show Greeting

            userGreeting.style.display = "flex";

            // Extract First Name

            const firstName =
                currentUser.full_name.trim().split(" ")[0];

            // Capitalize first letter
            let displayName =
                firstName.charAt(0).toUpperCase() +
                firstName.slice(1).toLowerCase();

            // Mobile ke liye maximum 10 characters
            if (displayName.length > 10) {

                displayName =
                    displayName.substring(0, 10) + "...";

            }

            userFirstName.textContent = displayName;

            return true;

        }
        else {

            isLoggedIn = false;

            currentUser = null;

            loginButton.style.display = "block";

            signupModalButton.style.display = "block";

            userGreeting.style.display = "none";

            return false;

        }

    } catch (error) {

        console.error(error);

        showToast(
            "Something went wrong.",
            "error"
        );

        return false;

    }

}

// =====================================================
// Ensure User Session
// =====================================================

async function ensureLoggedIn() {

    const loggedIn = await checkCurrentUser();

    if (!loggedIn) {

        if (!signupModal.classList.contains("active")) {

            openSignupModal();

            showToast(

                "Please create an account to continue.",

                "warning"

            );

        }

        return false;
    }

    return true;
}

// =====================================================
// Load User Profile
// =====================================================

async function loadUserProfile() {

    try {

        const response = await fetch("/profile");

        const result = await response.json();

        if (!result.success) {

            showToast(result.message, "error");

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

        updateProfileLetter.textContent = firstLetter;

        console.log("PROFILE DATA:", result.user);

        if (result.user.profile_image_url) {

            updateProfilePhoto.src =
                result.user.profile_image_url;

            updateProfilePhoto.style.display =
                "block";

            updateProfileLetter.style.display =
                "none";

        }
        else {

            updateProfileLetter.textContent =
                firstLetter;

            updateProfilePhoto.style.display =
                "none";

            updateProfileLetter.style.display =
                "flex";

        }

    }

    catch (error) {

        console.error(error);

        showToast(
            "Something went wrong.",
            "error"
        );

    }

}

// =====================================================
// Update User Interface
// =====================================================

function updateUserInterface(user) {

    console.trace("updateUserInterface", user);

    const firstName =
        user.full_name.trim().split(" ")[0];

    let displayName =
        firstName.charAt(0).toUpperCase() +
        firstName.slice(1).toLowerCase();

    if (displayName.length > 10) {

        displayName =
            displayName.substring(0, 10) + "...";

    }

    userFirstName.textContent =
        displayName;

    // Sidebar

    sidebarFullName.textContent =
        "@" + user.username;

    if (user.profile_image) {

        sidebarProfilePhoto.src =
            "/static/uploads/profile_images/" +
            user.profile_image;

        updateProfilePhoto.src =
            "/static/uploads/profile_images/" +
            user.profile_image;

        sidebarProfilePhoto.style.display =
            "block";
        updateProfilePhoto.style.display =
            "block";

        sidebarProfileLetter.style.display =
            "none";
        updateProfileLetter.style.display =
            "none";

    }

    else {

        sidebarProfileLetter.textContent =
            firstName.charAt(0).toUpperCase();

        updateProfileLetter.textContent =
            firstName.charAt(0).toUpperCase();

        sidebarProfilePhoto.style.display =
            "none";

        updateProfilePhoto.style.display =
            "none";

        sidebarProfileLetter.style.display =
            "flex";

        updateProfileLetter.style.display =
            "flex";

    }

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

        currentUser.full_name =
            updateFullName.value.trim();

        currentUser.username =
            updateUsername.value.trim();

        updateUserInterface(currentUser);

        showToast(result.message, "success");

        closeUpdateProfileModal();

    }

    catch (error) {

        console.error(error);

        showToast(
            "Something went wrong.",
            "error"
        );

    }

}


// ================= profile image click ================

sidebarProfileImage.addEventListener(

    "click",

    function () {

        profileImageInput.click();

    }

);

updateProfileAvatar.addEventListener(

    "click",

    function () {

        profileImageInput.click();

    }

);

changeProfilePhotoBtn.addEventListener(

    "click",

    function () {

        profileImageInput.click();

    }

);


profileImageInput.addEventListener(

    "change",

    async function () {

        const image = profileImageInput.files[0];

        if (!image) {

            return;

        }

        console.log(image);

        const formData = new FormData();

        formData.append(

            "image",

            image

        );

        try {

            const response = await fetch(

                "/profile/photo",

                {

                    method: "POST",

                    body: formData

                }

            );

            const result = await response.json();

            console.log(result);
            // if (result.success) {

            //     sidebarProfilePhoto.src = result.image_url;

            //     updateProfilePhoto.src =
            //         result.image_url;

            //     sidebarProfilePhoto.style.display = "block";

            //     updateProfilePhoto.style.display =
            //         "block";

            //     sidebarProfileLetter.style.display = "none";

            //     updateProfileLetter.style.display =
            //         "none";

            //     profileImageInput.value = "";

            //     showToast(

            //         result.message,

            //         "success"

            //     );

            // }
            if (result.success) {

                // Current user object update karo
                if (currentUser) {

                    currentUser.profile_image =
                        result.profile_image;

                }

                sidebarProfilePhoto.src =
                    result.image_url;

                updateProfilePhoto.src =
                    result.image_url;

                sidebarProfilePhoto.style.display =
                    "block";

                updateProfilePhoto.style.display =
                    "block";

                sidebarProfileLetter.style.display =
                    "none";

                updateProfileLetter.style.display =
                    "none";

                profileImageInput.value = "";

                // Modal ka latest data reload karo
                await loadUserProfile();

                showToast(

                    result.message,

                    "success"

                );

            }

            else {

                showToast(

                    result.message,

                    "error"

                );

            }

        }

        catch (error) {

            console.error(error);

        }

    }

);

async function loadCurrentUser() {

    try {

        const response = await fetch("/me");

        if (!response.ok) {

            return;

        }

        const result = await response.json();

        if (!result.success) {

            return;

        }

        updateUserInterface(

            result.user

        );

    }

    catch (error) {

        console.error(

            error

        );

    }

}



// =====================================================
// Check Guest Song Limit
// =====================================================

async function canPlaySong(track) {

    if (isLoggedIn) {

        const validUser = await ensureLoggedIn();

        if (!validUser) {

            currentsong.pause();

            play.src = "/static/svg/play.svg";

            return false;
        }

        return true;
    }

    // Logged-in users
    if (isLoggedIn) {
        return true;
    }

    // Already played
    if (playedSongs.has(track)) {
        return true;
    }

    // Guest limit reached
    if (playedSongs.size >= FREE_SONG_LIMIT) {

        // Pause current song
        currentsong.pause();

        play.src = "/static/svg/play.svg";

        // Open Signup Modal
        openSignupModal();

        showToast(
            "Create a free account to continue listening.",
            "warning"
        );

        return false;

    }

    // Save new song
    playedSongs.add(track);

    localStorage.setItem(
        "playedSongs",
        JSON.stringify([...playedSongs])
    );

    return true;

}

// =====================================================
// Play Selected Song
// =====================================================

async function playSelectedSong(track) {

    console.log("playSelectedSong :", track);

    if (!(await canPlaySong(track))) {
        return;
    }

    playMusic(track);

}

const playMusic = (track, pause = false) => {
    // let audio = new Audio("song/"+track)


    const folderName = currFolder.split("/")[1];
    currentsong.src = `/song/${folderName}/${track}`;
    if (!pause) {

        currentsong.play().catch((error) => {

            console.error("Audio Play Error:", error);

        });

        play.src = "/static/svg/pause.svg";

    } else {

        play.src = "/static/svg/play.svg";

    }
    songinfo.innerHTML = decodeURI(track);
    songtime.innerHTML = "00:00/00:00";

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


// =====================================================
// Toast
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

    setTimeout(() => {

        toast.classList.remove("show");

    }, TOAST_DURATION);

}
async function main() {


    // Get the all list of songs
    await getSongs("song/Arjit");

    playMusic(songs[0], true)

    // show all the albums
    displayAlbum()




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

        songtime.innerHTML = `${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)}`

        circle.style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%"
        if (currentsong.currentTime === currentsong.duration) {
            play.src = "/static/svg/play.svg";
            circle.style.left = "0%"
        }

    })


    seekbar.addEventListener("click", (e) => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        circle.style.left = percent + "%"
        currentsong.currentTime = (currentsong.duration) * percent / 100;

    })

    //    Add an event listener for hamburger


    hamburger.addEventListener("click", () => {

        library.style.left = "0%"
    })

    // =====================================================
    // Signup Modal
    // =====================================================



    signupModalButton.addEventListener(
        "click",
        openSignupModal
    );

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


    toggleSignupPassword.addEventListener("click", function () {

        togglePasswordVisibility(
            passwordInput,
            toggleSignupPassword
        );

    });

    toggleConfirmPassword.addEventListener("click", function () {

        togglePasswordVisibility(
            confirmPasswordInput,
            toggleConfirmPassword
        );

    });


    passwordInput.addEventListener("input", function () {

        const password = passwordInput.value;

        const rules = checkPasswordRules(password);

        updateRule(ruleLength, rules.length);

        updateRule(ruleUppercase, rules.uppercase);

        updateRule(ruleLowercase, rules.lowercase);

        updateRule(ruleNumber, rules.number);

        updateRule(ruleSpecial, rules.special);
        updatePasswordStrength(
            rules,
            password
        );

    });


    passwordInput.addEventListener(
        "input",
        checkConfirmPassword
    );

    confirmPasswordInput.addEventListener(
        "input",
        checkConfirmPassword
    );



    [
        fullNameInput,
        usernameInput,
        emailInput,
        passwordInput,
        confirmPasswordInput,
        signupTerms
    ].forEach(function (element) {

        element.addEventListener(
            "input",
            updateSignupButton
        );

        element.addEventListener(
            "change",
            updateSignupButton
        );

    });

    // ======== Otp close button ==============

    otpCloseBtn.addEventListener(
        "click",
        closeOtpModal
    );



    // ============ profile cancle button ============


    cancelProfileButton.addEventListener("click", function () {

        closeUpdateProfileModal();

    });


    // ============  Save Button Event ============

    saveProfileButton.addEventListener("click", function (event) {

        event.preventDefault();

        saveUserProfile();

    });


    // ============= Logout user ========
    logoutButton.addEventListener("click", function () {

        logoutUser();

    });



    // =====================================================
    // Toggle Sidebar Dropdown
    // =====================================================

    sidebarMenuButton.addEventListener("click", function (event) {

        event.stopPropagation();



        if (sidebarDropdown.style.display === "block") {

            sidebarDropdown.style.display = "none";

        } else {

            sidebarDropdown.style.display = "block";

        }



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


    signupForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        if (!validateSignupForm()) {
            return;
        }

        // ----------------------------------------
        // Prevent Double Click
        // ----------------------------------------

        signupSubmitButton.disabled = true;

        signupSubmitButton.textContent =
            "Creating Account...";


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

                // ----------------------------------------
                // Success Toast
                // ----------------------------------------

                showToast(
                    result.message,
                    "success"
                );

                // ----------------------------------------
                // Close Signup Modal
                // ----------------------------------------

                closeSignupModal();

                // ----------------------------------------
                // Open OTP Modal
                // ----------------------------------------

                openOtpModal(
                    userData.email
                );
                startOtpCountdown(
                    result.data.remaining_seconds
                );


            } else {

                signupSubmitButton.disabled = false;

                signupSubmitButton.textContent =
                    "Create Free Account";

                // ----------------------------------------
                // Clear Previous Backend Errors
                // ----------------------------------------

                usernameError.textContent = "";

                emailError.textContent = "";

                // ----------------------------------------
                // Pending Verification
                // ----------------------------------------

                if (result.data.pending_verification) {



                    showToast(result.message, "info");

                    closeSignupModal();

                    openOtpModal(result.data.email);



                    startOtpCountdown(

                        result.data.remaining_seconds

                    );

                    return;

                }

                // ----------------------------------------
                // Pending Signup Changed
                // ----------------------------------------

                if (result.data.pending_signup_changed) {

                    const continueVerification = confirm(

                        result.message +

                        "\n\nPress OK to continue your current verification.\nPress Cancel to start a new signup."

                    );

                    if (continueVerification) {

                        closeSignupModal();

                        openOtpModal(

                            result.data.email

                        );

                        startOtpCountdown(

                            result.data.remaining_seconds

                        );

                    }

                    else {

                        // Next step:
                        // We'll call /restart-signup here

                    }

                    return;

                }

                // ----------------------------------------
                // Username Error
                // ----------------------------------------

                if (result.data.field === "username") {

                    usernameError.textContent = result.message;

                }

                // ----------------------------------------
                // Email Error
                // ----------------------------------------

                else if (result.data.field === "email") {

                    emailError.textContent = result.message;

                }

                // ----------------------------------------
                // Other Errors
                // ----------------------------------------

                else {

                    showToast(

                        result.message,

                        "error"

                    );

                }

            }

        } catch (error) {

            console.error(error);

            showToast(
                "Something went wrong.",
                "error"
            );
            signupSubmitButton.disabled = false;

            signupSubmitButton.textContent =
                "Create Free Account";

        }

    });


    usernameInput.addEventListener("input", function () {

        usernameError.textContent = "";

    });

    emailInput.addEventListener("input", function () {

        emailError.textContent = "";

    });


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

                showToast(result.message, "success");

                loginForm.reset();

                closeLoginModal();
                await checkCurrentUser();

            } else {

                showToast(result.message, "error");

            }

        } catch (error) {

            console.error(error);

            showToast(
                "Something went wrong.",
                "error"
            );

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


    close.addEventListener("click", () => {
        library.style.left = "-120%"
    })

    //    Add an event listner for previous song

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

    next.addEventListener("click", () => {

        // let index = songs.indexOf(currentsong.src.split("song/")[1])
        let index = songs.indexOf(currentsong.src.split("song/").slice(-1)[0])
        //  playMusic(songs[index+1]);

        if (index == songs.length - 1) {
            playSelectedSong(songs[0])
        } else {
            playSelectedSong(songs[index + 1])
        }

    })

    // Load the playlist whenever card is clicked
    // Array.from(document.getElementsByClassName("card")).forEach((e)=>{
    //     e.addEventListener("click", item=>{
    //         item.dataset.folder
    //     })
    // })


    checkCurrentUser();
    loadCurrentUser();
    loadCollections();
    loadCollectionsFromDB();

}

main();
