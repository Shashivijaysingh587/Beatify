/*
=========================================================
Beatify Music Streaming Platform

File: static/js/admin.js

Purpose:
Admin dashboard user management.

Author: Pallav Kumar
=========================================================
*/

// =========================================================
// DOM Elements
// =========================================================

const adminTotalUsers =
    document.getElementById(
        "admin-total-users"
    );


const adminUsersList =
    document.getElementById(
        "admin-users-list"
    );


// =========================================================
// Load Users
// =========================================================

async function loadAdminUsers() {

    try {

        const response = await fetch(
            "/admin/users",
            {
                method: "GET",

                headers: {
                    "Accept": "application/json"
                }
            }
        );


        const result =
            await response.json();


        // ----------------------------------------
        // Unauthorized
        // ----------------------------------------

        if (response.status === 401) {

            adminUsersList.innerHTML = `
                <div class="admin-users-loading">
                    You are not authorized to access
                    the admin dashboard.
                </div>
            `;

            return;
        }


        // ----------------------------------------
        // Failed
        // ----------------------------------------

        if (!result.success) {

            adminUsersList.innerHTML = `
                <div class="admin-users-loading">
                    ${result.message || "Unable to load users."}
                </div>
            `;

            return;
        }


        // ----------------------------------------
        // Total Users
        // ----------------------------------------

        adminTotalUsers.textContent =
            result.total_users;


        // ----------------------------------------
        // No Users
        // ----------------------------------------

        if (
            !result.users ||
            result.users.length === 0
        ) {

            adminUsersList.innerHTML = `
                <div class="admin-users-loading">
                    No users found.
                </div>
            `;

            return;
        }


        // ----------------------------------------
        // Render Users
        // ----------------------------------------

        adminUsersList.innerHTML = "";


        result.users.forEach(
            user => {

                const userRow =
                    createAdminUserRow(
                        user
                    );


                adminUsersList.appendChild(
                    userRow
                );

            }
        );


    }
    catch (error) {

        console.error(
            "Admin Users Error:",
            error
        );


        adminUsersList.innerHTML = `
            <div class="admin-users-loading">
                Something went wrong while
                loading users.
            </div>
        `;

    }

}


// =========================================================
// Create User Row
// =========================================================

function createAdminUserRow(user) {

    const row =
        document.createElement("div");


    row.className =
        "admin-user-row";


    // ----------------------------------------
    // Profile Image
    // ----------------------------------------

    const avatarHtml =
        user.profile_image
            ? `
            <img
                src="/static/uploads/profile_images/${user.profile_image}"
                class="admin-user-avatar"
                alt="${escapeHtml(user.full_name)}"
            >
          `
            : `
            <div class="admin-default-avatar">
                <div class="admin-avatar-head"></div>
                <div class="admin-avatar-body"></div>
            </div>
          `;


    // ----------------------------------------
    // Status
    // ----------------------------------------

    const isActive =
        user.is_active === true;


    const statusClass =
        isActive
            ? "active"
            : "inactive";


    const statusText =
        isActive
            ? "Active"
            : "Inactive";


    const buttonText =
        isActive
            ? "Deactivate"
            : "Activate";


    // ----------------------------------------
    // HTML
    // ----------------------------------------

    row.innerHTML = `

        <div class="admin-user-info">

            ${avatarHtml}

            <div>

                <h3>
                    ${escapeHtml(user.full_name)}
                </h3>

                <p>
                    @${escapeHtml(user.username)}
                </p>

            </div>

        </div>


        <div class="admin-user-email">

            ${escapeHtml(user.email)}

        </div>


        <div class="admin-user-status">

            <span
                class="admin-status ${statusClass}"
            >
                ${statusText}
            </span>

        </div>


        <button
            type="button"
            class="admin-toggle-user"
            data-user-id="${user.id}"
        >
            ${buttonText}
        </button>

    `;


    return row;

}


// =========================================================
// Escape HTML
// =========================================================

function escapeHtml(value) {

    if (value === null || value === undefined) {

        return "";

    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// =========================================================
// Load Dashboard
// =========================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadAdminUsers();

    }
);

// =========================================================
// Toggle User Status
// =========================================================

document.addEventListener(
    "click",
    async function (event) {

        const button =
            event.target.closest(
                ".admin-toggle-user"
            );


        // Button नहीं है
        if (!button) {
            return;
        }


        const userId =
            button.dataset.userId;


        if (!userId) {
            return;
        }


        // ----------------------------------------
        // Prevent Double Click
        // ----------------------------------------

        button.disabled = true;

        button.textContent = "Updating...";


        try {

            const response = await fetch(
                `/admin/users/${userId}/toggle-status`,
                {
                    method: "POST",

                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


            const result =
                await response.json();


            // ----------------------------------------
            // Error
            // ----------------------------------------

            if (!response.ok || !result.success) {

                console.error(
                    "Toggle User Status Error:",
                    result
                );

                button.disabled = false;

                button.textContent =
                    "Try Again";

                return;
            }


            // ----------------------------------------
            // Reload Users
            // ----------------------------------------

            await loadAdminUsers();

            // ----------------------------------------
            // Reload Beatify Page
            // ----------------------------------------

            window.location.reload();


        }
        catch (error) {

            console.error(
                "Toggle User Status Error:",
                error
            );


            button.disabled = false;

            button.textContent =
                "Try Again";

        }

    }
);

// =========================================================
// Admin Logout
// =========================================================

const adminLogoutButton =
    document.getElementById(
        "admin-logout-btn"
    );


if (adminLogoutButton) {

    adminLogoutButton.addEventListener(
        "click",
        async function () {

            try {

                adminLogoutButton.disabled = true;

                adminLogoutButton.textContent =
                    "Logging out...";


                const response =
                    await fetch(
                        "/admin/logout",
                        {
                            method: "POST",

                            headers: {
                                "Accept":
                                    "application/json"
                            },

                            credentials:
                                "same-origin"
                        }
                    );


                const result =
                    await response.json();


                if (
                    response.ok &&
                    result.success
                ) {

                    // Go back to Beatify Home
                    window.location.href = "/";

                    return;

                }


                adminLogoutButton.disabled = false;

                adminLogoutButton.textContent =
                    "Logout";


                console.error(
                    "Admin Logout Error:",
                    result
                );

            }
            catch (error) {

                console.error(
                    "Admin Logout Error:",
                    error
                );


                adminLogoutButton.disabled = false;

                adminLogoutButton.textContent =
                    "Logout";

            }

        }
    );

}