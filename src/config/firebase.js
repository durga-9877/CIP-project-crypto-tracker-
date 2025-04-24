import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  FacebookAuthProvider, 
  TwitterAuthProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxV9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q9Q",
  authDomain: "crypto-tracker-12345.firebaseapp.com",
  projectId: "crypto-tracker-12345",
  storageBucket: "crypto-tracker-12345.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Initialize auth providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();

export { 
  auth, 
  db, 
  googleProvider, 
  facebookProvider, 
  twitterProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithPhoneNumber,
  RecaptchaVerifier
};

export default app; 