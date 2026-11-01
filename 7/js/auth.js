// Import Firebase Authentication
import { auth } from "./firebase-config.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updatePassword,
    reauthenticateWithCredential,
    EmailAuthProvider
} from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

// Function to display messages to the user
function displayAuthMessage(message) {
    document.querySelector("#authMessage").textContent = message;
}

// Function to log in an existing user
function loginUser() {
    const EMAIL = document.querySelector("#email").value.trim();
    const PASSWORD = document.querySelector("#password").value;

    if (!document.querySelector("#authForm").reportValidity()) {
        return;
    }

    displayAuthMessage("Logging in...");

    signInWithEmailAndPassword(auth, EMAIL, PASSWORD)
        .then(function() {
            displayAuthMessage("Login successful!");
        })
        .catch(function(error) {
            displayAuthMessage("Login failed: " + error.message);
        });
}

// Function to create a new user account
function signupUser() {
    const EMAIL = document.querySelector("#email").value.trim();
    const PASSWORD = document.querySelector("#password").value;

    if (!document.querySelector("#authForm").reportValidity()) {
        return;
    }

    displayAuthMessage("Creating account...");

    createUserWithEmailAndPassword(auth, EMAIL, PASSWORD)
        .then(function() {
            displayAuthMessage("Account created successfully!");
        })
        .catch(function(error) {
            displayAuthMessage("Signup failed: " + error.message);
        });
}

// Function to log out the current user
function logoutUser() {
    displayAuthMessage("Logging out...");

    signOut(auth)
        .then(function() {
            displayAuthMessage("Logged out successfully!");
        })
        .catch(function(error) {
            displayAuthMessage("Logout failed: " + error.message);
        });
}


// Function to change the current user's password
function changePassword(event) {
    event.preventDefault();

    const USER = auth.currentUser;
    const CURRENT_PASSWORD = document.querySelector("#currentPassword").value;
    const NEW_PASSWORD = document.querySelector("#newPassword").value;
    const PASSWORD_MESSAGE = document.querySelector("#passwordMessage");

    if (!USER || !USER.email) {
        PASSWORD_MESSAGE.textContent = "You must be logged in to change your password.";
        return;
    }

    PASSWORD_MESSAGE.textContent = "Updating password...";

    const CREDENTIAL = EmailAuthProvider.credential(USER.email, CURRENT_PASSWORD);

    reauthenticateWithCredential(USER, CREDENTIAL)
        .then(function() {
            return updatePassword(USER, NEW_PASSWORD);
        })
        .then(function() {
            PASSWORD_MESSAGE.textContent = "Password changed successfully!";
            document.querySelector("#changePasswordForm").reset();
        })
        .catch(function(error) {
            PASSWORD_MESSAGE.textContent = "Unable to change password: " + error.message;
        });
}


// Function to detect whether a user is logged in
function checkAuthState() {
    onAuthStateChanged(auth, function(user) {
        const LOGIN_BUTTON = document.querySelector("#loginButton");
        const SIGNUP_BUTTON = document.querySelector("#signupButton");
        const LOGOUT_BUTTON = document.querySelector("#logoutButton");
        const USER_STATUS = document.querySelector("#userStatus");
        const PASSWORD_SECTION = document.querySelector("#changePasswordSection");

        if (user) {
            USER_STATUS.textContent = "Logged in as: " + user.email;

            LOGIN_BUTTON.hidden = true;
            SIGNUP_BUTTON.hidden = true;
            LOGOUT_BUTTON.hidden = false;
            PASSWORD_SECTION.hidden = false;
        }
        else {
            USER_STATUS.textContent = "You are not logged in.";

            LOGIN_BUTTON.hidden = false;
            SIGNUP_BUTTON.hidden = false;
            LOGOUT_BUTTON.hidden = true;
            PASSWORD_SECTION.hidden = true;
        }
    }, function(error) {
        displayAuthMessage("Unable to check login status: " + error.message);
    });
}

// Connect buttons to their functions
document.querySelector("#loginButton").addEventListener("click", loginUser);
document.querySelector("#signupButton").addEventListener("click", signupUser);

document.querySelector("#logoutButton").addEventListener("click", logoutUser);

document.querySelector("#authForm").addEventListener("submit", function(event) {
    event.preventDefault();
});

checkAuthState();

document.querySelector("#changePasswordForm").addEventListener("submit", changePassword);