// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEvWAjouiI8APtZ9TzOTaR9Mvlfo-DKno",
  authDomain: "holidayplanner-ed299.firebaseapp.com",
  projectId: "holidayplanner-ed299",
  storageBucket: "holidayplanner-ed299.appspot.com",
  messagingSenderId: "424806971961",
  appId: "1:424806971961:web:658cf7a07aa95df701ebe8",
  measurementId: "G-X01GDJ6EXP"
};


// getAuth(app).projectConfigManager().updateProjectConfig({
//   passwordPolicyConfig: {
//     enforcementState: 'ENFORCE',
//     forceUpgradeOnSignin: false,
//     constraints: {
//       requireUppercase: true,
//       requireLowercase: true,
//       requireNonAlphanumeric: true,
//       requireNumeric: true,
//       minLength: 2,
//       maxLength: 3,
//     },
//   },
// })

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const FBFirestore = getFirestore(app)
export const FBAuth = getAuth(app);


const analytics = getAnalytics(app);