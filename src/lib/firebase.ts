import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpFOUbcp7jWkA8eHCheSk11oS6O7-vWls",
  authDomain: "nacoss-referral.firebaseapp.com",
  projectId: "nacoss-referral",
  storageBucket: "nacoss-referral.appspot.app",
  messagingSenderId: "459967197218",
  appId: "1:459967197218:web:c8c4ed18e183b8e0e75a7b",
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
