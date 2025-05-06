import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrsXoapRC11-RhkU405kqzauHQjNWPvyU",
  authDomain: "crypto-tracker-2bbb6.firebaseapp.com",
  projectId: "crypto-tracker-2bbb6",
  storageBucket: "crypto-tracker-2bbb6.firebasestorage.app",
  messagingSenderId: "1073828974260",
  appId: "1:1073828974260:web:71d97c7ea5f3de1f6b91e1",
  measurementId: "G-BKX67PQNRG"
};

// Initialize Firebase
let app;
let auth;
let db;
let analytics;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  analytics = getAnalytics(app);
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { auth, db, analytics };
export default app; 