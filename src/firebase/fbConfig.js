// src\firebase\fbConfig.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDRuJeEWH3F-4hQltn0XQ9sXat2-l8iWqo",
    authDomain: "thebigpicture-16cf0.firebaseapp.com",
    projectId: "thebigpicture-16cf0",
    storageBucket:"thebigpicture-16cf0.appspot.com",
    messagingSenderId: "927755771231",
    appId: "1:927755771231:web:e826a64465ae8b7cdfeaea",
    measurementId: "G-D7SHYQ4480"
  };

  console.log(process.env.VUE_APP_PROJECT_ID);
  console.log(process.env);
   


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };