// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBOHKBax9ECbhxK8qmdlwAGNbZ8gdq5heY",
    authDomain: "graph-path.firebaseapp.com",
    projectId: "graph-path",
    storageBucket: "graph-path.appspot.com",
    messagingSenderId: "1007642885720",
    appId: "1:1007642885720:web:9b9178abcaaf37433b542d",
    measurementId: "G-2WLJJYC0FS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.getAnalytics(app);

export default firebase;