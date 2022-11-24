// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js';

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: 'AIzaSyCfcdAPgNz4yL353KJuMHzt0KCEtjxuyQo',
  authDomain: 'codingapple-1d8ee.firebaseapp.com',
  projectId: 'codingapple-1d8ee',
  storageBucket: 'codingapple-1d8ee.appspot.com',
  messagingSenderId: '77306771818',
  appId: '1:77306771818:web:c286e15a443b1b05f00d13',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
