// Import Firebase Authentication
import { auth } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";

// Function to check whether the user is logged in
function protectPage() {
    onAuthStateChanged(auth, function(user) {
        if (!user) {
            window.location.replace("index.html");
        }
        else {
            document.querySelector("#protectedContent").hidden = false;
            document.querySelector("#authLoading").hidden = true;
        }
    }, function(error) {
        document.querySelector("#authLoading").textContent =
            "Unable to verify login status. Please refresh the page.";
    });
}

// Check authentication when the page loads
protectPage();
