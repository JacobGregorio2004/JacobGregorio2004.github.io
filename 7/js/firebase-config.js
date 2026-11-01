import { initializeApp } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/13.1.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBjzL3L4l5gGP8Iv7pQhCJv0ev9b31XtpI",
    authDomain: "instrument-explorer.firebaseapp.com",
    databaseURL: "https://instrument-explorer-default-rtdb.firebaseio.com/",
    projectId: "instrument-explorer",
    storageBucket: "instrument-explorer.firebasestorage.app",
    messagingSenderId: "764620111299",
    appId: "1:764620111299:web:faaa5204385bde65545176"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Realtime Database
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
