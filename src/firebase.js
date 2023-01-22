import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCu7FvbT8MNT0jy1G7NmYyIHXsjldNyVNA",
  authDomain: "chat-1ece4.firebaseapp.com",
  projectId: "chat-1ece4",
  storageBucket: "chat-1ece4.appspot.com",
  messagingSenderId: "808312499461",
  appId: "1:808312499461:web:495c2941ebc49063e59b6c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
