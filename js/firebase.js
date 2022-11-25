// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

// 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
const firebaseConfig = {
  apiKey: "AIzaSyD69m0S9TB3ZJGa58FR1guR8k13JRn9eKU",
  authDomain: "honggu-3d28a.firebaseapp.com",
  projectId: "honggu-3d28a",
  storageBucket: "honggu-3d28a.appspot.com",
  messagingSenderId: "392939093965",
  appId: "1:392939093965:web:e64023b9a06aec63cc4e84",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
