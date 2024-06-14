import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_SECURE_apiKey,
    authDomain: import.meta.env.VITE_SECURE_authDomain,
    projectId: import.meta.env.VITE_SECURE_projectId,
    storageBucket: import.meta.env.VITE_SECURE_storageBucket,
    messagingSenderId: import.meta.env.VITE_SECURE_messagingSenderId,
    appId: import.meta.env.VITE_SECURE_appId

};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

export { auth };