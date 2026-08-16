
const currentsong = new Audio()
let songs;
let currFolder;

const R2_PUBLIC_URL =
    "https://pub-612f37d74f7f435cb2385d11b9e0d0e0.r2.dev";

// ==========================================================
// OTP Countdown
// ==========================================================

let otpCountdown = null;

let otpRemainingSeconds = 0;


// =====================================================
// User Session
// =====================================================

let isLoggedIn = false;

let userHeartbeatInterval = null;

let activeUsersCheckInterval = null;

const activeUsersDot =
    document.getElementById("active-users-dot");

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

const adminDashboardButton =
    document.getElementById(
        "admin-dashboard-btn"
    );

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


// trackig song
let currentPlaylist = [];

let currentPlaylistIndex = -1;

let currentPlaylistType = "viewall";

// online user popup

const activeUsersButton =
    document.getElementById(
        "active-users-button"
    );

const activeUsersPopup =
    document.getElementById(
        "active-users-popup"
    );
// mobile collection 


const mobileCollectionMenu =
    document.getElementById("mobile-collection-menu");

const collectionTabs =
    document.querySelector(".collection-tabs");


// =====================================================
// Song Search Popup
// =====================================================

const songSearchInput =
    document.getElementById("song-search-input");

const songSearchPopup =
    document.getElementById("song-search-popup");

const songSearchResults =
    document.getElementById("song-search-results");

const closeSongSearch =
    document.getElementById("close-song-search");


// =====================================================
// Verification Warning Modal
// =====================================================

const verificationWarningModal =
    document.getElementById(
        "verification-warning-modal"
    );

const continueVerificationBtn =
    document.getElementById(
        "continue-verification-btn"
    );

const newSignupBtn =
    document.getElementById(
        "new-signup-btn"
    );

const verificationWarningClose =
    document.getElementById(
        "verification-warning-close"
    );

// collection card delete conformation
const deleteCollectionModal =
    document.getElementById(
        "delete-collection-modal"
    );

const deleteCollectionMessage =
    document.getElementById(
        "delete-collection-message"
    );

const cancelDeleteCollection =
    document.getElementById(
        "cancel-delete-collection"
    );

const confirmDeleteCollection =
    document.getElementById(
        "confirm-delete-collection"
    );


let collectionToDelete = null;

// forgot password
const forgotPasswordEmail =
    document.getElementById(
        "forgot-password-email"
    );

const forgotPasswordEmailError =
    document.getElementById(
        "forgot-password-email-error"
    );

const sendForgotPasswordOtp =
    document.getElementById(
        "send-forgot-password-otp"
    );


// reset password

// ==========================================================
// Password Reset Modal
// ==========================================================

const passwordResetModal =
    document.getElementById(
        "password-reset-modal"
    );

const passwordResetCloseBtn =
    document.getElementById(
        "password-reset-close-btn"
    );

const resetPasswordInput =
    document.getElementById(
        "reset-password"
    );

const resetConfirmPasswordInput =
    document.getElementById(
        "reset-confirm-password"
    );

const toggleResetPassword =
    document.getElementById(
        "toggle-reset-password"
    );

const toggleResetConfirmPassword =
    document.getElementById(
        "toggle-reset-confirm-password"
    );

const resetPasswordError =
    document.getElementById(
        "reset-password-error"
    );

const resetConfirmPasswordError =
    document.getElementById(
        "reset-confirm-password-error"
    );

const resetPasswordStrengthBar =
    document.getElementById(
        "reset-password-strength-bar"
    );

const resetPasswordStrengthText =
    document.getElementById(
        "reset-password-strength-text"
    );

const resetPasswordBtn =
    document.getElementById(
        "reset-password-btn"
    );

// ==========================================================
// Pending Signup Email
// ==========================================================

let pendingSignupEmail = "";

let otpVerificationMode = "signup";



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

    currentPlaylist = songs;
    currentPlaylistType = "viewall";
    currentPlaylistIndex = -1;

    let songUl = document.querySelector(".songList ul");

    songUl.innerHTML = "";

    for (const song of songs) {

        songUl.innerHTML += `
        <li data-track="${encodeURIComponent(song)}">
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

viewAllButton.addEventListener(
    "click",
    function () {

        collectionTabs.classList.remove(
            "show-mobile-tabs"
        );

    }
);


yourCollectionsButton.addEventListener(

    "click",

    showYourCollections


);

yourCollectionsButton.addEventListener(
    "click",
    function () {

        collectionTabs.classList.remove(
            "show-mobile-tabs"
        );

    }
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

    const name =
        collectionName.value.trim();

    const description =
        collectionDescription.value.trim();


    if (name === "") {

        alert("Collection name is required.");

        collectionName.focus();

        return;

    }


    // ----------------------------------------
    // Get Selected Cover Image
    // ----------------------------------------

    const coverInput =
        document.getElementById(
            "collection-cover"
        );

    const coverFile =
        coverInput.files[0] || null;


    // ----------------------------------------
    // Create Collection
    // ----------------------------------------

    const collection = {

        id: "col_" + Date.now(),

        name: name,

        description: description,

        cover: coverFile,

        songs: [],

        createdAt:
            new Date().toISOString()

    };


    saveCollection(
        collection,
        function () {

            console.log(
                "Collection Saved Successfully"
            );

            loadCollectionsFromDB();

        }
    );


    // ----------------------------------------
    // Clear Form
    // ----------------------------------------

    collectionName.value = "";

    collectionDescription.value = "";

    coverInput.value = "";


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



document.addEventListener("click", function (event) {

    // Collection menu/button par click hua hai
    if (
        event.target.closest(".collection-menu-btn") ||
        event.target.closest(".collection-menu")
    ) {
        return;
    }


    const card =
        event.target.closest(".collection-card");

    if (!card) {
        return;
    }


    openCollection(
        card.dataset.id
    );

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
// Open Warning Modal
// =====================================================

function openVerificationWarning() {

    verificationWarningModal.classList.add(
        "show"
    );

}


// =====================================================
// Close Warning Modal
// =====================================================

function closeVerificationWarning() {

    verificationWarningModal.classList.remove(
        "show"
    );

}

// =====================================================
// Continue Existing Verification
// =====================================================

continueVerificationBtn.addEventListener(
    "click",
    function () {

        closeVerificationWarning();

        otpVerificationMode = "signup";

        // Existing OTP modal खोलो
        openOtpModal();

    }
);

verificationWarningClose.addEventListener(
    "click",
    function () {

        closeVerificationWarning();

    }
);


verificationWarningModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            verificationWarningModal
        ) {

            closeVerificationWarning();

        }

    }
);

function openDeleteCollectionModal(collection) {

    collectionToDelete =
        collection;

    deleteCollectionMessage.textContent =
        `Are you sure you want to delete "${collection.name}"?`;

    deleteCollectionModal.classList.add(
        "show"
    );

}
cancelDeleteCollection.addEventListener(
    "click",
    function () {

        collectionToDelete =
            null;

        deleteCollectionModal.classList.remove(
            "show"
        );

    }
);

confirmDeleteCollection.addEventListener(
    "click",
    function () {

        if (!collectionToDelete) {
            return;
        }


        const collectionId =
            collectionToDelete.id;


        deleteCollectionModal.classList.remove(
            "show"
        );


        deleteCollectionFromDB(
            collectionId,
            function () {

                loadCollectionsFromDB();


                if (
                    currentCollectionId ===
                    collectionId
                ) {

                    currentCollectionId =
                        null;

                    collectionDetailsSection
                        .style
                        .display = "none";

                    collectionsSection
                        .style
                        .display = "block";

                }


                showToast(
                    "Collection deleted successfully.",
                    "success"
                );


                collectionToDelete =
                    null;

            }
        );

    }
);

// collection card operation

document.addEventListener(
    "click",
    function (event) {

        // ========================================
        // COLLECTION MENU BUTTON
        // ========================================

        const menuButton =
            event.target.closest(
                ".collection-menu-btn"
            );

        if (menuButton) {

            event.stopPropagation();

            const card =
                menuButton.closest(
                    ".collection-card"
                );

            if (!card) {
                return;
            }


            const menu =
                card.querySelector(
                    ".collection-menu"
                );

            if (!menu) {
                return;
            }


            // Close other menus

            document
                .querySelectorAll(
                    ".collection-menu.show"
                )
                .forEach(
                    function (otherMenu) {

                        if (
                            otherMenu !== menu
                        ) {

                            otherMenu.classList.remove(
                                "show"
                            );

                        }

                    }
                );


            // Toggle current menu

            menu.classList.toggle("show");

            return;
        }


        // ========================================
        // RENAME
        // ========================================

        const renameButton =
            event.target.closest(
                ".rename-collection-btn"
            );

        if (renameButton) {

            event.stopPropagation();

            const collectionId =
                renameButton.dataset.id;


            // Close menu

            const menu =
                renameButton.closest(
                    ".collection-menu"
                );

            if (menu) {

                menu.classList.remove(
                    "show"
                );

            }


            renameCollection(
                collectionId
            );

            return;
        }


        // ========================================
        // DELETE
        // ========================================

        const deleteButton =
            event.target.closest(
                ".delete-collection-btn"
            );

        if (deleteButton) {

            event.stopPropagation();

            const collectionId =
                deleteButton.dataset.id;


            // Close menu

            const menu =
                deleteButton.closest(
                    ".collection-menu"
                );

            if (menu) {

                menu.classList.remove(
                    "show"
                );

            }


            deleteCollection(
                collectionId
            );

            return;
        }


        // ========================================
        // CLICK OUTSIDE
        // ========================================

        document
            .querySelectorAll(
                ".collection-menu.show"
            )
            .forEach(
                function (menu) {

                    menu.classList.remove(
                        "show"
                    );

                }
            );

    }
);

function renameCollection(collectionId) {

    getAllCollections(function (collections) {

        const collection =
            collections.find(
                function (item) {

                    return item.id === collectionId;

                }
            );


        if (!collection) {

            console.error(
                "Collection not found."
            );

            return;

        }


        const newName =
            prompt(
                "Enter new collection name:",
                collection.name
            );


        // Cancel
        if (newName === null) {
            return;
        }


        const trimmedName =
            newName.trim();


        // Empty name
        if (trimmedName === "") {

            showToast(
                "Collection name cannot be empty.",
                "error"
            );

            return;

        }


        // Same name
        if (
            trimmedName ===
            collection.name
        ) {

            return;

        }


        collection.name =
            trimmedName;


        saveCollection(
            collection,
            function () {

                console.log(
                    "✅ Collection Renamed"
                );

                loadCollectionsFromDB();


                // If currently opened
                // collection is same one

                if (
                    currentCollectionId ===
                    collectionId
                ) {

                    collectionTitle.textContent =
                        collection.name;

                }


                showToast(
                    "Collection renamed successfully.",
                    "success"
                );

            }
        );

    });

}

function deleteCollection(collectionId) {

    getAllCollections(function (collections) {

        const collection =
            collections.find(
                function (item) {

                    return item.id === collectionId;

                }
            );


        if (!collection) {

            console.error(
                "Collection not found."
            );

            return;

        }


        openDeleteCollectionModal(
            collection
        );

    });

}

function deleteCollectionFromDB(
    collectionId,
    callback
) {

    if (!db) {

        console.error(
            "Database not ready."
        );

        return;

    }


    const transaction =
        db.transaction(
            "collections",
            "readwrite"
        );


    const store =
        transaction.objectStore(
            "collections"
        );


    const request =
        store.delete(
            collectionId
        );


    request.onsuccess =
        function () {

            console.log(
                "Collection deleted from IndexedDB."
            );

            if (callback) {

                callback();

            }

        };


    request.onerror =
        function (event) {

            console.error(
                "Failed to delete collection:",
                event.target.error
            );

        };

}

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

    let passwordResetEmail = "";
    let otpVerificationMode = "signup";

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

resendOtpButton.addEventListener(
    "click",
    async function () {

        // ----------------------------------------
        // Prevent Multiple Clicks
        // ----------------------------------------

        resendOtpButton.disabled = true;


        try {

            // ------------------------------------
            // Select Endpoint
            // ------------------------------------

            const resendUrl =
                otpVerificationMode === "password-reset"
                    ? "/resend-password-reset-otp"
                    : "/resend-otp";


            // ------------------------------------
            // Send Request
            // ------------------------------------

            const response = await fetch(
                resendUrl,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        email:
                            pendingSignupEmail

                    })
                }
            );


            const result =
                await response.json();


            // ------------------------------------
            // Failed
            // ------------------------------------

            if (!result.success) {

                showToast(
                    result.message,
                    "error"
                );

                resendOtpButton.disabled =
                    false;

                return;
            }


            // ------------------------------------
            // Success
            // ------------------------------------

            showToast(
                result.message,
                "success"
            );

            otpInputs.forEach(
                input => {
                    input.value = "";
                }
            );

            // ------------------------------------
            // Update Email
            // ------------------------------------

            if (
                result.data &&
                result.data.email
            ) {

                pendingSignupEmail =
                    result.data.email;

                otpEmail.textContent =
                    result.data.email;

            }


            // ------------------------------------
            // Restart Countdown
            // ------------------------------------

            startOtpCountdown(
                result.data.remaining_seconds
            );


        }
        catch (error) {

            console.error(
                "Resend OTP Error:",
                error
            );


            showToast(
                "Something went wrong. Please try again.",
                "error"
            );

        }


        // ----------------------------------------
        // Enable Button
        // ----------------------------------------

        resendOtpButton.disabled =
            false;

    }
);

// forgot password button event

sendForgotPasswordOtp.addEventListener(
    "click",
    async function () {

        const email =
            forgotPasswordEmail.value
                .trim()
                .toLowerCase();


        // ----------------------------------------
        // Clear Previous Error
        // ----------------------------------------

        forgotPasswordEmailError.textContent =
            "";


        // ----------------------------------------
        // Validate Email
        // ----------------------------------------

        if (!email) {

            forgotPasswordEmailError.textContent =
                "Please enter your email address.";

            forgotPasswordEmail.focus();

            return;

        }


        // ----------------------------------------
        // Prevent Double Click
        // ----------------------------------------

        sendForgotPasswordOtp.disabled =
            true;

        sendForgotPasswordOtp.textContent =
            "Sending OTP...";


        try {

            const response =
                await fetch(
                    "/forgot-password",
                    {

                        method: "POST",

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body: JSON.stringify({
                            email: email
                        })

                    }
                );


            const result =
                await response.json();


            // ----------------------------------------
            // Failed
            // ----------------------------------------

            if (!result.success) {

                forgotPasswordEmailError.textContent =
                    result.message ||
                    "Unable to send OTP.";

                sendForgotPasswordOtp.disabled =
                    false;

                sendForgotPasswordOtp.textContent =
                    "Send OTP";

                return;

            }


            // ----------------------------------------
            // Success
            // ----------------------------------------

            showToast(
                result.message,
                "success"
            );


            // ----------------------------------------
            // Password Reset OTP Mode
            // ----------------------------------------

            otpVerificationMode =
                "password-reset";


            // ----------------------------------------
            // Close Forgot Password Modal
            // ----------------------------------------

            forgotPasswordModal.classList.remove(
                "show"
            );


            // ----------------------------------------
            // Open Existing OTP Modal
            // ----------------------------------------

            openOtpModal(
                result.data.email
            );


            // ----------------------------------------
            // Start Countdown
            // ----------------------------------------

            startOtpCountdown(
                result.data.remaining_seconds
            );


            console.log(
                "Password Reset OTP Sent:",
                result.data
            );


            sendForgotPasswordOtp.disabled =
                false;

            sendForgotPasswordOtp.textContent =
                "Send OTP";

            return;


        } catch (error) {

            console.error(
                "Forgot Password Error:",
                error
            );


            showToast(
                "Something went wrong. Please try again.",
                "error"
            );


            sendForgotPasswordOtp.disabled =
                false;

            sendForgotPasswordOtp.textContent =
                "Send OTP";

        }

    }
);


// ==========================================================
// Password Reset Modal Functions
// ==========================================================

function openPasswordResetModal() {

    passwordResetModal.style.display =
        "block";


    resetPasswordInput.value = "";

    resetConfirmPasswordInput.value = "";

    resetPasswordError.textContent = "";

    resetConfirmPasswordError.textContent = "";

    resetPasswordStrengthBar.style.width =
        "0%";

    resetPasswordStrengthText.textContent =
        "Strength: -";


    resetPasswordInput.focus();
}


function closePasswordResetModal() {

    passwordResetModal.style.display =
        "none";


    resetPasswordInput.value = "";

    resetConfirmPasswordInput.value = "";

    resetPasswordError.textContent = "";

    resetConfirmPasswordError.textContent = "";
}

passwordResetCloseBtn.addEventListener(
    "click",
    function () {

        closePasswordResetModal();

    }
);

toggleResetPassword.addEventListener(
    "click",
    function () {

        togglePasswordVisibility(
            resetPasswordInput,
            toggleResetPassword
        );

    }
);


toggleResetConfirmPassword.addEventListener(
    "click",
    function () {

        togglePasswordVisibility(
            resetConfirmPasswordInput,
            toggleResetConfirmPassword
        );

    }
);

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

            const message =
                "Please enter the complete 6-digit verification code.";

            otpError.textContent = message;

            showToast(
                message,
                "error"
            );

            return;
        }

        if (!/^\d{6}$/.test(otp)) {

            const message =
                "Please enter a valid 6-digit verification code.";

            otpError.textContent = message;

            showToast(
                message,
                "error"
            );

            return;
        }

        verifyOtpBtn.disabled = true;

        verifyOtpBtn.textContent =
            "Verifying...";



        try {

            // fetch
            const verifyUrl =
                otpVerificationMode === "password-reset"
                    ? "/verify-password-reset-otp"
                    : "/verify-email-otp";


            const response = await fetch(
                verifyUrl,
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

                verifyOtpBtn.disabled = false;

                verifyOtpBtn.textContent =
                    "Verify OTP";


                otpError.textContent = "";


                // ========================================
                // PASSWORD RESET OTP
                // ========================================

                if (
                    otpVerificationMode ===
                    "password-reset"
                ) {

                    // ----------------------------------------
                    // Save Email Before Closing OTP Modal
                    // ----------------------------------------

                    passwordResetEmail =
                        pendingSignupEmail;


                    // ----------------------------------------
                    // Close OTP Modal
                    // ----------------------------------------

                    closeOtpModal();


                    // ----------------------------------------
                    // Open New Password Modal
                    // ----------------------------------------

                    openPasswordResetModal();


                    showToast(
                        result.message,
                        "success"
                    );


                    console.log(
                        "Password reset OTP verified."
                    );


                    return;
                }


                // ========================================
                // NORMAL SIGNUP OTP
                // ========================================

                closeOtpModal();

                showToast(
                    result.message,
                    "success"
                );

                location.reload();

                return;
            }

            // Failed Verification

            verifyOtpBtn.disabled = false;

            verifyOtpBtn.textContent = "Verify OTP";

            otpError.textContent = result.message;

            showToast(
                result.message,
                "error"
            );


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

const loginPassword =
    document.getElementById(
        "login-password"
    );

const toggleLoginPassword =
    document.getElementById(
        "toggle-login-password"
    );


toggleLoginPassword.addEventListener(
    "click",
    function () {

        if (
            loginPassword.type ===
            "password"
        ) {

            loginPassword.type =
                "text";

            this.innerHTML =
                '<i class="fa-regular fa-eye-slash"></i>';

            this.setAttribute(
                "aria-label",
                "Hide password"
            );

        } else {

            loginPassword.type =
                "password";

            this.innerHTML =
                '<i class="fa-regular fa-eye"></i>';

            this.setAttribute(
                "aria-label",
                "Show password"
            );

        }

    }
);

const forgotPasswordLink =
    document.getElementById(
        "forgot-password"
    );

const forgotPasswordModal =
    document.getElementById(
        "forgot-password-modal"
    );


forgotPasswordLink.addEventListener(
    "click",
    function (event) {

        event.preventDefault();

        closeLoginModal();

        // Forgot password modal open
        forgotPasswordModal.classList.add(
            "show"
        );

    }
);

const backToLogin =
    document.getElementById(
        "back-to-login"
    );


backToLogin.addEventListener(
    "click",
    function () {

        forgotPasswordModal.classList.remove(
            "show"
        );


    }
);

const closeForgotPassword =
    document.getElementById(
        "close-forgot-password"
    );


closeForgotPassword.addEventListener(
    "click",
    function () {

        forgotPasswordModal.classList.remove(
            "show"
        );

    }
);

function validateResetPassword() {

    const password =
        resetPasswordInput.value.trim();

    const confirmPassword =
        resetConfirmPasswordInput.value.trim();


    // ----------------------------------------
    // Clear Errors
    // ----------------------------------------

    resetPasswordError.textContent = "";

    resetConfirmPasswordError.textContent = "";


    // ----------------------------------------
    // Password Required
    // ----------------------------------------

    if (password === "") {

        resetPasswordError.textContent =
            "Please enter a new password.";

        resetPasswordInput.focus();

        return false;
    }


    // ----------------------------------------
    // Password Length
    // ----------------------------------------

    if (password.length < 8) {

        resetPasswordError.textContent =
            "Password must be at least 8 characters.";

        resetPasswordInput.focus();

        return false;
    }


    // ----------------------------------------
    // Uppercase
    // ----------------------------------------

    if (!/[A-Z]/.test(password)) {

        resetPasswordError.textContent =
            "Password must contain an uppercase letter.";

        resetPasswordInput.focus();

        return false;
    }


    // ----------------------------------------
    // Lowercase
    // ----------------------------------------

    if (!/[a-z]/.test(password)) {

        resetPasswordError.textContent =
            "Password must contain a lowercase letter.";

        resetPasswordInput.focus();

        return false;
    }


    // ----------------------------------------
    // Number
    // ----------------------------------------

    if (!/[0-9]/.test(password)) {

        resetPasswordError.textContent =
            "Password must contain a number.";

        resetPasswordInput.focus();

        return false;
    }


    // ----------------------------------------
    // Special Character
    // ----------------------------------------

    if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]\/'`~+=;']/.test(password)) {

        resetPasswordError.textContent =
            "Password must contain a special character.";

        resetPasswordInput.focus();

        return false;
    }


    // ----------------------------------------
    // Confirm Password
    // ----------------------------------------

    if (confirmPassword === "") {

        resetConfirmPasswordError.textContent =
            "Please confirm your new password.";

        resetConfirmPasswordInput.focus();

        return false;
    }


    // ----------------------------------------
    // Password Match
    // ----------------------------------------

    if (password !== confirmPassword) {

        resetConfirmPasswordError.textContent =
            "Passwords do not match.";

        resetConfirmPasswordInput.focus();

        return false;
    }


    return true;
}

resetPasswordBtn.addEventListener(
    "click",
    async function () {

        // ----------------------------------------
        // Validate
        // ----------------------------------------

        if (!validateResetPassword()) {
            return;
        }


        const newPassword =
            resetPasswordInput.value;


        // ----------------------------------------
        // Disable Button
        // ----------------------------------------

        resetPasswordBtn.disabled = true;

        resetPasswordBtn.textContent =
            "Resetting Password...";


        try {

            const response = await fetch(
                "/reset-password",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        new_password:
                            newPassword

                    })
                }
            );


            const result =
                await response.json();


            // ------------------------------------
            // Failed
            // ------------------------------------

            if (!result.success) {

                showToast(
                    result.message,
                    "error"
                );

                resetPasswordBtn.disabled =
                    false;

                resetPasswordBtn.textContent =
                    "Reset Password";

                return;
            }


            // ------------------------------------
            // Success
            // ------------------------------------

            showToast(
                result.message,
                "success"
            );


            closePasswordResetModal();


            // ------------------------------------
            // Clear Password Fields
            // ------------------------------------

            resetPasswordInput.value = "";

            resetConfirmPasswordInput.value = "";


            // ------------------------------------
            // Open Login Modal
            // ------------------------------------

            openLoginModal();


            resetPasswordBtn.disabled =
                false;

            resetPasswordBtn.textContent =
                "Reset Password";


        }
        catch (error) {

            console.error(
                "Password Reset Error:",
                error
            );


            showToast(
                "Something went wrong. Please try again.",
                "error"
            );


            resetPasswordBtn.disabled =
                false;

            resetPasswordBtn.textContent =
                "Reset Password";
        }

    }
);

resetPasswordInput.addEventListener(
    "input",
    function () {

        updateResetPasswordStrength(
            this.value
        );

    }
);

function updateResetPasswordStrength(password) {

    if (password === "") {

        resetPasswordStrengthBar.style.width =
            "0%";

        resetPasswordStrengthText.textContent =
            "Strength: -";

        return;
    }


    let score = 0;


    if (password.length >= 8) {
        score++;
    }

    if (/[A-Z]/.test(password)) {
        score++;
    }

    if (/[a-z]/.test(password)) {
        score++;
    }

    if (/[0-9]/.test(password)) {
        score++;
    }

    if (
        /[!@#$%^&*(),.?":{}|<>_\-[\]/\\'`~+=;]/.test(password)
    ) {
        score++;
    }


    const percentage =
        (score / 5) * 100;


    resetPasswordStrengthBar.style.width =
        `${percentage}%`;


    if (score <= 2) {

        resetPasswordStrengthText.textContent =
            "Strength: Weak";

    }
    else if (score <= 4) {

        resetPasswordStrengthText.textContent =
            "Strength: Medium";

    }
    else {

        resetPasswordStrengthText.textContent =
            "Strength: Strong";

    }

}
resetConfirmPasswordInput.addEventListener(
    "input",
    function () {

        resetConfirmPasswordError.textContent =
            "";

    }
);

resetPasswordInput.addEventListener(
    "input",
    function () {

        resetPasswordError.textContent =
            "";

    }
);


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

            startUserHeartbeat();

            startActiveUsersCheck();

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

            stopUserHeartbeat();

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
// Active Users Variables
// =====================================================




// =====================================================
// Check Active Users
// =====================================================

async function checkActiveUsers() {

    try {

        const response =
            await fetch("/api/active-users");

        if (!response.ok) {
            return;
        }

        const result =
            await response.json();

        if (!result.success) {
            return;
        }

        if (!activeUsersDot) {
            return;
        }

        if (result.count > 0) {

            activeUsersDot.style.display =
                "block";

        }
        else {

            activeUsersDot.style.display =
                "none";

        }

    }
    catch (error) {

        console.error(
            "Active Users Error:",
            error
        );

    }

}


// =====================================================
// Start Active Users Check
// =====================================================

function startActiveUsersCheck() {

    if (activeUsersCheckInterval !== null) {
        return;
    }

    checkActiveUsers();

    activeUsersCheckInterval =
        setInterval(
            checkActiveUsers,
            30 * 1000
        );

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

        // setTopUserInitial(result.user.full_name);

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

    setTopUserInitial(firstName);

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

// Admin dashboard
function updateAdminDashboardButton(isAdmin) {

    if (!adminDashboardButton) {
        return;
    }


    if (isAdmin === true) {

        adminDashboardButton.style.display =
            "block";

    }
    else {

        adminDashboardButton.style.display =
            "none";

    }

}

async function loadAdminStatus() {

    try {

        const response =
            await fetch(
                "/session-status",
                {
                    method: "GET",

                    headers: {
                        "Accept":
                            "application/json"
                    },

                    credentials:
                        "same-origin"
                }
            );


        if (!response.ok) {
            return;
        }


        const result =
            await response.json();


        if (
            result.success &&
            result.authenticated &&
            result.user
        ) {

            updateAdminDashboardButton(
                result.user.is_admin === true
            );

        }
        else {

            updateAdminDashboardButton(
                false
            );

        }

    }
    catch (error) {

        console.error(
            "Admin Status Error:",
            error
        );

        updateAdminDashboardButton(
            false
        );

    }

}

if (adminDashboardButton) {

    adminDashboardButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            window.location.href =
                "/admin/";

        }
    );

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



function startUserHeartbeat() {

    // Agar heartbeat already chal raha hai
    // to dobara interval mat banao.

    if (userHeartbeatInterval !== null) {
        return;
    }

    async function sendUserHeartbeat() {

        try {

            const response = await fetch(
                "/activity/heartbeat",
                {
                    method: "POST"
                }
            );

            if (!response.ok) {

                console.log(
                    "Heartbeat failed:",
                    response.status
                );

            }

        }
        catch (error) {

            console.error(
                "Heartbeat Error:",
                error
            );

        }

    }

    // Login/current-user detect hote hi
    // ek heartbeat immediately bhejo.

    sendUserHeartbeat();

    // Uske baad har 30 seconds me.
    userHeartbeatInterval = setInterval(
        sendUserHeartbeat,
        30 * 1000
    );

}


function stopUserHeartbeat() {

    if (userHeartbeatInterval !== null) {

        clearInterval(
            userHeartbeatInterval
        );

        userHeartbeatInterval = null;

    }

}

function markUserInactiveOnExit() {

    if (!isLoggedIn || !currentUser) {
        return;
    }

    const data = new Blob(
        [
            JSON.stringify({
                user_id: currentUser.id
            })
        ],
        {
            type: "application/json"
        }
    );

    navigator.sendBeacon(
        "/activity/heartbeat",
        data
    );
}

function markUserInactiveOnExit() {

    if (!isLoggedIn) {
        return;
    }

    navigator.sendBeacon(
        "/activity/offline"
    );
}

window.addEventListener(
    "pagehide",
    markUserInactiveOnExit
);


// ========================
// Heartbeat
// =======================

function startUserHeartbeat() {

    async function sendHeartbeat() {

        try {

            const response =
                await fetch("/activity/heartbeat", {
                    method: "POST"
                });

            if (!response.ok) {

                console.log(
                    "Heartbeat failed:",
                    response.status
                );

            }

        }
        catch (error) {

            console.error(
                "Heartbeat Error:",
                error
            );

        }

    }


    // Immediately send once
    sendHeartbeat();


    // Then every 30 seconds
    setInterval(
        sendHeartbeat,
        30 * 1000
    );

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
// Open / Close Popup
// =====================================================

function openSongSearchPopup() {

    songSearchPopup.classList.add("show");

}


function closeSongSearchPopup() {

    songSearchPopup.classList.remove("show");

}

// =====================================================
// Search View All Songs
// =====================================================

function searchViewAllSongs(query) {

    if (!Array.isArray(songs)) {

        return [];

    }

    return songs.filter(function (song) {

        return song
            .toLowerCase()
            .includes(query);

    });

}


// =====================================================
// Search Your Collections
// =====================================================

function searchCollectionSongs(query) {

    return new Promise(function (resolve) {

        getAllCollections(function (collections) {

            const collectionSongIds =
                new Set();


            // Get song IDs from collections

            for (const collection of collections) {

                if (!Array.isArray(collection.songs)) {

                    continue;

                }

                for (const songId of collection.songs) {

                    collectionSongIds.add(songId);

                }

            }


            // Get actual uploaded songs

            getAllSongsFromDB(function (allSongs) {

                const result =
                    allSongs.filter(function (song) {

                        return (
                            collectionSongIds.has(song.id) &&
                            song.title
                                .toLowerCase()
                                .includes(query)
                        );

                    });

                resolve(result);

            });

        });

    });

}


// =====================================================
// Show Search Results
// =====================================================

async function showSongSearchResults(query) {

    query =
        query.trim().toLowerCase();


    // Empty search

    if (!query) {

        closeSongSearchPopup();

        songSearchResults.innerHTML = "";

        return;

    }


    openSongSearchPopup();


    songSearchResults.innerHTML = `

        <div class="song-search-empty">

            Searching...

        </div>

    `;


    // -----------------------------------------------
    // View All
    // -----------------------------------------------

    const viewAllSongs =
        searchViewAllSongs(query);


    // -----------------------------------------------
    // Your Collections
    // -----------------------------------------------

    const collectionSongs =
        await searchCollectionSongs(query);


    // -----------------------------------------------
    // Results
    // -----------------------------------------------

    songSearchResults.innerHTML = "";


    // View All results

    for (const song of viewAllSongs) {

        createSearchResult(
            song,
            "viewall"
        );

    }


    // Collection results

    for (const song of collectionSongs) {

        createSearchResult(
            song,
            "collection"
        );

    }


    // No results

    if (
        viewAllSongs.length === 0 &&
        collectionSongs.length === 0
    ) {

        songSearchResults.innerHTML = `

            <div class="song-search-empty">

                No songs found

            </div>

        `;

    }

}


// =====================================================
// Create Search Result
// =====================================================

function createSearchResult(
    song,
    type
) {

    const item =
        document.createElement("div");


    item.className =
        "song-search-item";


    const title =
        type === "viewall"
            ? song
            : song.title;


    item.innerHTML = `

        <img
            src="/static/svg/music.svg"
            alt=""
            class="invert1"
        >

        <div class="song-search-name">

            ${title}

        </div>

        <div class="song-search-play">

            <img
                src="/static/svg/play.svg"
                alt=""
                class="invert1"
            >

        </div>

    `;


    // -----------------------------------------------
    // Click
    // -----------------------------------------------

    item.addEventListener(
        "click",
        async function () {

            // View All song

            if (type === "viewall") {

                await playSelectedSong(song);

            }


            // Collection song

            else {

                playCollectionSong(song);

            }


            // Close popup

            closeSongSearchPopup();

            songSearchInput.value = "";

        }
    );


    songSearchResults.appendChild(item);

}


// =====================================================
// Search Input
// =====================================================

songSearchInput.addEventListener(
    "input",
    function () {

        showSongSearchResults(
            songSearchInput.value
        );

    }
);


// =====================================================
// Close Button
// =====================================================

closeSongSearch.addEventListener(
    "click",
    function () {

        closeSongSearchPopup();

        songSearchInput.value = "";

    }
);


const testSearchInput =
    document.getElementById("song-search-input");

const testSearchPopup =
    document.getElementById("song-search-popup");


console.log("SEARCH INPUT:", testSearchInput);
console.log("SEARCH POPUP:", testSearchPopup);


if (testSearchInput && testSearchPopup) {

    testSearchInput.addEventListener(
        "input",
        function () {

            console.log(
                "SEARCH TYPED:",
                testSearchInput.value
            );

            if (testSearchInput.value.trim()) {

                testSearchPopup.classList.add("show");

            }
            else {

                testSearchPopup.classList.remove("show");

            }

        }
    );

}



function positionSongSearchPopup() {

    const searchBox =
        document.querySelector(".search-box");

    const popup =
        document.getElementById(
            "song-search-popup"
        );

    if (!searchBox || !popup) {
        return;
    }

    const rect =
        searchBox.getBoundingClientRect();

    const popupWidth =
        Math.min(
            430,
            window.innerWidth - 20
        );

    let left =
        rect.left;

    // Mobile/tablet
    if (window.innerWidth <= 768) {

        left =
            (window.innerWidth - popupWidth) / 2;

    }

    // Right edge
    if (
        left + popupWidth >
        window.innerWidth - 10
    ) {

        left =
            window.innerWidth -
            popupWidth -
            10;

    }

    // Left edge
    if (left < 10) {

        left = 10;

    }

    popup.style.top =
        `${rect.bottom + 8}px`;

    popup.style.left =
        `${left}px`;

    popup.style.width =
        `${popupWidth}px`;
}


function openSongSearchPopup() {

    positionSongSearchPopup();

    songSearchPopup.classList.add("show");

}

window.addEventListener(
    "resize",
    function () {

        if (
            songSearchPopup.classList.contains(
                "show"
            )
        ) {

            positionSongSearchPopup();

        }

    }
);


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

activeUsersButton.addEventListener(
    "click",
    function (event) {

        event.stopPropagation();

        if (
            activeUsersPopup.style.display ===
            "block"
        ) {

            activeUsersPopup.style.display =
                "none";

        }
        else {

            activeUsersPopup.style.display =
                "block";

            loadActiveUsers();

        }

    }
);


async function loadActiveUsers() {

    const activeUsersList =
        document.getElementById(
            "active-users-list"
        );

    if (!activeUsersList) {
        return;
    }

    activeUsersList.innerHTML =
        "<p>Loading...</p>";

    try {

        const response =
            await fetch("/api/active-users");

        const result =
            await response.json();

        if (!result.success) {

            activeUsersList.innerHTML =
                "<p>Unable to load users.</p>";

            return;
        }

        if (result.users.length === 0) {

            activeUsersList.innerHTML =
                "<p>No active users.</p>";

            return;
        }

        activeUsersList.innerHTML = "";

        result.users.forEach(function (user) {

            const item =
                document.createElement("div");

            item.className =
                "active-user-item";

            let profileElement;

            if (user.profile_image) {

                profileElement =
                    document.createElement("img");

                profileElement.className =
                    "active-user-photo";

                profileElement.src =
                    "/static/uploads/profile_images/" +
                    user.profile_image;

                profileElement.alt =
                    user.full_name;

            }
            else {

                profileElement =
                    document.createElement("div");

                profileElement.className =
                    "active-user-letter";

                profileElement.textContent =
                    user.full_name
                        .trim()
                        .charAt(0)
                        .toUpperCase();

            }

            const info =
                document.createElement("div");

            info.className =
                "active-user-info";

            info.innerHTML = `

                <div class="active-user-name">
                    ${user.full_name}
                </div>

                <div class="active-user-username">
                    @${user.username}
                </div>

            `;

            item.appendChild(profileElement);

            item.appendChild(info);

            activeUsersList.appendChild(item);

        });

    }
    catch (error) {

        console.error(
            "Active Users Load Error:",
            error
        );

        activeUsersList.innerHTML =
            "<p>Something went wrong.</p>";

    }

}

document.addEventListener(
    "click",
    function (event) {

        if (
            activeUsersPopup &&
            activeUsersButton &&
            !activeUsersPopup.contains(event.target) &&
            !activeUsersButton.contains(event.target)
        ) {

            activeUsersPopup.style.display =
                "none";

        }

    }
);

// click event on grid

mobileCollectionMenu.addEventListener(
    "click",
    function () {

        collectionTabs.classList.toggle(
            "show-mobile-tabs"
        );

    }
);

document.addEventListener("click", function (event) {

    if (
        !collectionTabs.contains(event.target) &&
        !mobileCollectionMenu.contains(event.target)
    ) {

        collectionTabs.classList.remove(
            "show-mobile-tabs"
        );

    }

});


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

    const folderName = currFolder.split("/")[1];

    // Cloudflare R2 song URL
    const songUrl =
        `${R2_PUBLIC_URL}/${encodeURIComponent(folderName)}/${encodeURIComponent(track)}`;

    console.log("Playing from R2:", songUrl);

    currentsong.src = songUrl;

    currentPlaylistIndex =
        currentPlaylist.indexOf(track);

    if (!pause) {

        currentsong.play().catch((error) => {

            console.error(
                "Audio Play Error:",
                error
            );

        });

        play.src = "/static/svg/pause.svg";

    } else {

        play.src = "/static/svg/play.svg";
    }

    songinfo.innerHTML = decodeURI(track);

    songtime.innerHTML = "00:00/00:00";
};

currentsong.addEventListener("ended", function () {

    console.log("🎵 Song Ended");

    playNextSong();

});

function playNextSong() {

    if (!currentPlaylist.length) {

        console.log("No Playlist Found");

        return;

    }


    // Last song
    if (
        currentPlaylistIndex >=
        currentPlaylist.length - 1
    ) {

        console.log("⏹ Already At Last Song");

        currentsong.pause();

        play.src =
            "/static/svg/play.svg";

        return;

    }


    currentPlaylistIndex++;


    // =========================
    // View All
    // =========================

    if (currentPlaylistType === "viewall") {

        const nextTrack =
            currentPlaylist[currentPlaylistIndex];

        console.log(
            "▶ Next View All Song :",
            nextTrack
        );

        playMusic(nextTrack);

        return;

    }


    // =========================
    // Collection
    // =========================

    if (currentPlaylistType === "collection") {

        const nextSong =
            currentPlaylist[currentPlaylistIndex];

        console.log(
            "▶ Next Collection Song :",
            nextSong.title
        );

        playCollectionSong(nextSong);

    }

}

function playPreviousSong() {

    if (!currentPlaylist.length) {

        console.log("No Playlist Found");

        return;

    }


    // First song
    if (currentPlaylistIndex <= 0) {

        console.log("⏹ Already At First Song");

        return;

    }


    currentPlaylistIndex--;


    // =========================
    // View All
    // =========================

    if (currentPlaylistType === "viewall") {

        const previousTrack =
            currentPlaylist[currentPlaylistIndex];

        console.log(
            "◀ Previous View All Song :",
            previousTrack
        );

        playMusic(previousTrack);

        return;

    }


    // =========================
    // Collection
    // =========================

    if (currentPlaylistType === "collection") {

        const previousSong =
            currentPlaylist[currentPlaylistIndex];

        console.log(
            "◀ Previous Collection Song :",
            previousSong.title
        );

        playCollectionSong(previousSong);

    }

}

next.addEventListener("click", function () {

    playNextSong();

});

previous.addEventListener("click", function () {

    playPreviousSong();

});

currentsong.addEventListener("play", function () {

    console.log("▶ Current Song Playing");

    updateSidebarPlayIcon();

});

currentsong.addEventListener("pause", function () {

    console.log("⏸ Current Song Paused");


    if (currentCollectionSong) {

        updateCollectionSidebarPlayIcon(
            currentCollectionSong.id,

            false
        );

    }

});

function setTopUserInitial(userName) {

    const topInitialElement =
        document.getElementById("top-user-initial");

    if (!topInitialElement || !userName) {
        return;
    }

    topInitialElement.textContent =
        userName.trim().charAt(0).toUpperCase();

}

// ==========================================================
// Play / Load IndexedDB Collection Song
// ==========================================================

let collectionSongURL = null;
let currentCollectionSong = null;


function playCollectionSong(song, pause = false) {

    if (!song || !song.file) {

        console.error("Collection song not found.");

        return;

    }

    currentCollectionSong = song;

    currentPlaylistType = "collection";

    currentPlaylistIndex = currentPlaylist.findIndex(
        function (item) {
            return item.id === song.id;
        }
    );


    // Previous Object URL remove

    if (collectionSongURL) {

        URL.revokeObjectURL(collectionSongURL);

    }


    // Create URL for IndexedDB File

    collectionSongURL =
        URL.createObjectURL(song.file);


    // Use the SAME Audio object

    currentsong.src = collectionSongURL;


    // Update Bottom Player

    songinfo.innerHTML =
        decodeURI(song.title);

    songtime.innerHTML =
        "00:00/00:00";


    if (!pause) {

        currentsong.play().catch((error) => {

            console.error(
                "Collection Audio Play Error:",
                error
            );

        });

        play.src =
            "/static/svg/pause.svg";

    }
    else {

        play.src =
            "/static/svg/play.svg";

    }

}

function loadSidebarCollectionSongs(songArray) {

    const songUl = document.querySelector(".songList ul");

    if (!songUl) {

        console.error("Sidebar song list not found.");

        return;

    }

    songUl.innerHTML = "";

    songArray.forEach(function (song) {

        songUl.innerHTML += `

            <li data-id="${song.id}">

                <div class="album">

                    <div>
                        <img
                            src="/static/svg/music.svg"
                            alt=""
                            class="invert1 musicimg"
                        >
                    </div>

                    <div class="info">

                        <div>
                            ${song.title}
                        </div>

                    </div>

                </div>

                <div class="playnow">

                    <span>Play Now</span>

                    <img
                        src="/static/svg/play.svg"
                        alt=""
                        class="invert1 playimg"
                    >

                </div>

            </li>

        `;

    });


    // Click event

    document.querySelectorAll(".songList li").forEach(function (li) {

        li.addEventListener("click", function () {

            const songId = this.dataset.id;

            const song = songArray.find(
                function (song) {

                    return song.id === songId;

                }
            );

            if (song) {

                playCollectionSong(song);

            }

        });

    });

}

function updateSidebarPlayIcon() {

    const sidebarItems =
        document.querySelectorAll(".songList li");

    sidebarItems.forEach(function (item) {

        const icon =
            item.querySelector(".playimg");

        if (!icon) {
            return;
        }

        // -------------------------
        // Collection Song
        // -------------------------

        if (
            currentCollectionSong &&
            item.dataset.id === currentCollectionSong.id
        ) {

            icon.src =
                currentsong.paused
                    ? "/static/svg/play.svg"
                    : "/static/svg/pause.svg";

            return;
        }


        // -------------------------
        // View All Song
        // -------------------------

        if (
            currentPlaylistType === "viewall" &&
            currentPlaylistIndex >= 0
        ) {

            const currentTrack =
                currentPlaylist[currentPlaylistIndex];

            if (
                item.dataset.track ===
                encodeURIComponent(currentTrack)
            ) {

                icon.src =
                    currentsong.paused
                        ? "/static/svg/play.svg"
                        : "/static/svg/pause.svg";

                return;
            }

        }


        // -------------------------
        // All Other Songs
        // -------------------------

        icon.src =
            "/static/svg/play.svg";

    });

}

function updateCollectionSidebarPlayIcon(songId, isPlaying) {

    const sidebarItems =
        document.querySelectorAll(".songList li");

    sidebarItems.forEach(function (item) {

        const icon =
            item.querySelector(".playimg");

        if (!icon) {
            return;
        }

        if (
            item.dataset.id === songId &&
            isPlaying
        ) {

            icon.src = "/static/svg/pause.svg";

        } else {

            icon.src = "/static/svg/play.svg";

        }

    });

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


    // ============================
    // play button event
    // ============================

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

        if (isDraggingSeekbar) {
            return;
        }

        songtime.innerHTML = `${formatTime(currentsong.currentTime)}/${formatTime(currentsong.duration)}`

        // circle.style.left = (currentsong.currentTime / currentsong.duration) * 100 + "%"
        // if (currentsong.currentTime === currentsong.duration) {
        //     play.src = "/static/svg/play.svg";
        //     circle.style.left = "0%"
        // }

    })


    // seekbar.addEventListener("click", (e) => {
    //     let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    //     circle.style.left = percent + "%"
    //     currentsong.currentTime = (currentsong.duration) * percent / 100;

    // })

    // =====================================================
    // Smooth Seekbar Drag
    // =====================================================

    let isDraggingSeekbar = false;

    // const seekbar =
    //     document.querySelector(".seekbar");

    // const circle =
    //     document.querySelector(".circle");


    // -----------------------------------------------------
    // Calculate position
    // -----------------------------------------------------

    function updateSeekPosition(clientX) {

        const rect =
            seekbar.getBoundingClientRect();

        let position =
            clientX - rect.left;

        // Limit position
        position =
            Math.max(
                0,
                Math.min(position, rect.width)
            );

        const percentage =
            (position / rect.width) * 100;


        // Move circle immediately
        circle.style.left =
            `${percentage}%`;


        return percentage;
    }


    // // -----------------------------------------------------
    // // Start Drag
    // // -----------------------------------------------------

    // circle.addEventListener(
    //     "pointerdown",
    //     function (event) {

    //         event.preventDefault();

    //         isDraggingSeekbar = true;

    //         circle.setPointerCapture(
    //             event.pointerId
    //         );

    //     }
    // );


    // // -----------------------------------------------------
    // // Drag
    // // -----------------------------------------------------

    // circle.addEventListener(
    //     "pointermove",
    //     function (event) {

    //         if (!isDraggingSeekbar) {
    //             return;
    //         }

    //         updateSeekPosition(
    //             event.clientX
    //         );

    //     }
    // );


    // // -----------------------------------------------------
    // // End Drag
    // // -----------------------------------------------------

    // circle.addEventListener(
    //     "pointerup",
    //     function (event) {

    //         if (!isDraggingSeekbar) {
    //             return;
    //         }

    //         isDraggingSeekbar = false;

    //         const percentage =
    //             updateSeekPosition(
    //                 event.clientX
    //             );


    //         // Actual audio position
    //         if (
    //             currentsong.duration &&
    //             !isNaN(currentsong.duration)
    //         ) {

    //             currentsong.currentTime =
    //                 (
    //                     percentage / 100
    //                 ) *
    //                 currentsong.duration;

    //         }

    //     }
    // );


    // // -----------------------------------------------------
    // // Cancel Drag
    // // -----------------------------------------------------

    // circle.addEventListener(
    //     "pointercancel",
    //     function () {

    //         isDraggingSeekbar = false;

    //     }
    // );

    // //    Add an event listener for hamburger


    // hamburger.addEventListener("click", () => {

    //     library.style.left = "0%"
    // })


    const seekbarRange =
        document.getElementById("seekbar-range");


    currentsong.addEventListener(
        "timeupdate",
        function () {

            if (
                !currentsong.duration ||
                isNaN(currentsong.duration)
            ) {
                return;
            }

            seekbarRange.value =
                (
                    currentsong.currentTime /
                    currentsong.duration
                ) * 100;

        }
    );

    seekbarRange.addEventListener(
        "input",
        function () {

            if (
                !currentsong.duration ||
                isNaN(currentsong.duration)
            ) {
                return;
            }

            const percentage =
                Number(this.value);

            currentsong.currentTime =
                (
                    percentage / 100
                ) *
                currentsong.duration;

        }
    );

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


    signupForm.addEventListener(
        "submit",
        async function (event) {

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

                full_name:
                    fullNameInput.value.trim(),

                username:
                    usernameInput.value.trim(),

                email:
                    emailInput.value.trim(),

                password:
                    passwordInput.value

            };


            try {

                const response =
                    await fetch(
                        "/signup",
                        {

                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(userData)

                        }
                    );


                const result =
                    await response.json();


                // =====================================================
                // Pending Signup Changed
                // =====================================================

                if (
                    result.data &&
                    result.data.pending_signup_changed
                ) {

                    // Save email
                    pendingVerificationEmail =
                        result.data.email;


                    // Reset signup button
                    signupSubmitButton.disabled =
                        false;

                    signupSubmitButton.textContent =
                        "Create Free Account";


                    // Open custom Beatify modal
                    openVerificationWarning();


                    return;

                }


                // =====================================================
                // Successful Signup
                // =====================================================

                if (result.success) {

                    showToast(
                        result.message,
                        "success"
                    );


                    // Close Signup Modal
                    closeSignupModal();

                    otpVerificationMode = "signup";


                    // Open OTP Modal
                    openOtpModal(
                        userData.email
                    );


                    startOtpCountdown(
                        result.data.remaining_seconds
                    );


                    return;

                }


                // =====================================================
                // Reset Signup Button
                // =====================================================

                signupSubmitButton.disabled =
                    false;

                signupSubmitButton.textContent =
                    "Create Free Account";


                // =====================================================
                // Clear Previous Backend Errors
                // =====================================================

                usernameError.textContent = "";

                emailError.textContent = "";


                // =====================================================
                // Pending Verification
                // =====================================================

                if (
                    result.data &&
                    result.data.pending_verification
                ) {

                    showToast(
                        result.message,
                        "info"
                    );


                    closeSignupModal();

                    otpVerificationMode = "signup";

                    openOtpModal(
                        result.data.email
                    );


                    startOtpCountdown(
                        result.data.remaining_seconds
                    );


                    return;

                }


                // =====================================================
                // Username Error
                // =====================================================

                if (
                    result.data &&
                    result.data.field === "username"
                ) {

                    usernameError.textContent =
                        result.message;

                    return;

                }


                // =====================================================
                // Email Error
                // =====================================================

                if (
                    result.data &&
                    result.data.field === "email"
                ) {

                    emailError.textContent =
                        result.message;

                    return;

                }


                // =====================================================
                // Other Errors
                // =====================================================

                showToast(
                    result.message,
                    "error"
                );

            }


            catch (error) {

                console.error(
                    "Signup Error:",
                    error
                );


                showToast(
                    "Something went wrong.",
                    "error"
                );


                signupSubmitButton.disabled =
                    false;

                signupSubmitButton.textContent =
                    "Create Free Account";

            }

        }
    );



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

    // previous.addEventListener("click", () => {
    //     let index = songs.indexOf(currentsong.src.split("song/").slice(-1)[0])
    //     //  playMusic(songs[index-1]);

    //     if (index > 0) {
    //         playSelectedSong(songs[index - 1])
    //     } else {
    //         playSelectedSong(songs[songs.length - 1])
    //     }

    // })

    //    Add an event listner for next song

    // next.addEventListener("click", () => {

    //     // let index = songs.indexOf(currentsong.src.split("song/")[1])
    //     let index = songs.indexOf(currentsong.src.split("song/").slice(-1)[0])
    //     //  playMusic(songs[index+1]);

    //     if (index == songs.length - 1) {
    //         playSelectedSong(songs[0])
    //     } else {
    //         playSelectedSong(songs[index + 1])
    //     }

    // })

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

loadAdminStatus();


