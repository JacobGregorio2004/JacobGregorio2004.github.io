import { auth, database } from "./firebase-config.js";
import { ref, push } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-database.js";

// Function to save contact information to Firebase
function submitContactForm(event) {
    event.preventDefault();

    const EMAIL = document.querySelector("#email").value.trim();
    const MESSAGE = document.querySelector("#message").value.trim();
    const CONTACT_STATUS = document.querySelector("#contactStatus");
    const SUBMIT_BUTTON = document.querySelector("#submitButton");

    if (!auth.currentUser) {
        CONTACT_STATUS.textContent = "You must be logged in to submit a message.";
        return;
    }

    if (!EMAIL || !MESSAGE) {
        CONTACT_STATUS.textContent = "Please complete all fields.";
        return;
    }

    CONTACT_STATUS.textContent = "Sending message...";
    SUBMIT_BUTTON.disabled = true;

    const CONTACT_SUBMISSIONS = ref(database, "contactSubmissions");

    push(CONTACT_SUBMISSIONS, {
        email: EMAIL,
        message: MESSAGE,
        userId: auth.currentUser.uid,
        submittedAt: Date.now()
    })
        .then(function() {
            CONTACT_STATUS.textContent = "Your message was submitted successfully!";
            document.querySelector("#contactForm").reset();
        })
        .catch(function(error) {
            CONTACT_STATUS.textContent = "Unable to send message: " + error.message;
        })
        .finally(function() {
            SUBMIT_BUTTON.disabled = false;
        });
}

// Connect the form to Firebase
document.querySelector("#contactForm").addEventListener("submit", submitContactForm);
