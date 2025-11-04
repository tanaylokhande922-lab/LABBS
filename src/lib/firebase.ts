import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  projectId: 'studio-803137937-55de9',
  appId: '1:909276731047:web:ec4282258acff6a8d3ed82',
  apiKey: 'AIzaSyBcLpqye_LGcV4TLE-wEhFN24GUGELwyc4',
  authDomain: 'studio-803137937-55de9.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '909276731047',
  storageBucket: 'studio-803137937-55de9.appspot.com'
};

// Initialize Firebase for SSR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
