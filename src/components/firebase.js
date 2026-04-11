import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyAiXBM8rk05mGpPpdbIecusBbnDDVb__fE",
  authDomain: "jlpt-prep-web-58589.firebaseapp.com",
  projectId: "jlpt-prep-web-58589",
  storageBucket: "jlpt-prep-web-58589.firebasestorage.app",
  messagingSenderId: "756469913941",
  appId: "1:756469913941:web:681d904c752793d836b7dc",
  measurementId: "G-SF46S1817C"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);