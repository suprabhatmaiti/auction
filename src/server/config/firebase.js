// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAPMMkLAdbG2W9jgB__LHy26CB4xsvsL0I",
//   authDomain: "auction-platform-d52f9.firebaseapp.com",
//   projectId: "auction-platform-d52f9",
//   storageBucket: "auction-platform-d52f9.firebasestorage.app",
//   messagingSenderId: "1076525940189",
//   appId: "1:1076525940189:web:fa3a5388516744dd770a34",
//   measurementId: "G-ZFXLYFYS9E"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


import admin from "firebase-admin";
import dotenv from 'dotenv';
dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY)

admin.initializeApp({
    credential:admin.credential.cert(serviceAccount)
});

export default admin;