import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAajqzpeupjCSvL--a66k5FVRFKQ61xfIA",
  authDomain: "qrcodeapp-649a5.firebaseapp.com",
  projectId: "qrcodeapp-649a5",
  storageBucket: "qrcodeapp-649a5.appspot.com",
  messagingSenderId: "219945599827",
  appId: "1:219945599827:web:42b3dabe5d3f3cf2ad57a6",
  measurementId: "G-8BB9K3D35R"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const auth = getAuth();

export default app;
