// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js';

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: 'AIzaSyD07kC9yIKMpdBSNQYnw4hYNUgg5N9Zet8',
  authDomain: 'projecttest-62246.firebaseapp.com',
  projectId: 'projecttest-62246',
  storageBucket: 'projecttest-62246.appspot.com',
  messagingSenderId: '658610839380',
  appId: '1:658610839380:web:4fdcd18f96ebbe5dabb2c1',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
