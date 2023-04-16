import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7VT3tqhvbpbKC3kwAQpgMlSCavDt5-F4",
  authDomain: "project-react-native-c6759.firebaseapp.com",
  databaseURL: "https://project-react-native-c6759-default-rtdb.firebaseio.com",
  projectId: "project-react-native-c6759",
  storageBucket: "project-react-native-c6759.appspot.com",
  messagingSenderId: "1033878850977",
  appId: "1:1033878850977:web:611e8c86bc939ee0248fe0",
};

const app = initializeApp(firebaseConfig);
const db = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);

export default db;
