// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: "AIzaSyCxTOTcrmWxKStSQ4jALWcqQ2KOrSf44uk",
  authDomain: "korea-a5fb6.firebaseapp.com",
  projectId: "korea-a5fb6",
  storageBucket: "korea-a5fb6.appspot.com",
  messagingSenderId: "690071531082",
  appId: "1:690071531082:web:1e79704afafba18653c0b3",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
