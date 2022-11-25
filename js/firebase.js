// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js';

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: 'AIzaSyCmNo14xR8uzH2t97RvYA6KTziXxrkRKGI',
  authDomain: 'fan-pick.firebaseapp.com',
  projectId: 'fan-pick',
  storageBucket: 'fan-pick.appspot.com',
  messagingSenderId: '291256890304',
  appId: '1:291256890304:web:7e910c417ce1d55742ce25',
  measurementId: 'G-C5F0GBGDPS',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
