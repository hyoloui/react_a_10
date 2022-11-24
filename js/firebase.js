// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: "AIzaSyCnDFHfwwiIhl6RcDA-qeQepCo5HM5_WyE",
  authDomain: "teampro02-ef6d8.firebaseapp.com",
  projectId: "teampro02-ef6d8",
  storageBucket: "teampro02-ef6d8.appspot.com",
  messagingSenderId: "919485897264",
  appId: "1:919485897264:web:a7f576274dde722d3d2bf5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
