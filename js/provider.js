import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { authService } from "./auth";

// 소셜 로그인 API (ex. 구글)
let provider = new GoogleAuthProvider();
signInWithPopup(authService, provider)
    .then((result) => {
        // 소셜 로그인 성공
    })
    .catch((error) => {
        // 소셜 로그인 실패
    });
// 로그아웃 API
signOut(authService)
    .then(() => {
        // 로그아웃 처리 성공
    })
    .catch((error) => {
        // 로그아웃 처리 실패
    });
// 프로필 변경 API
// 현재 사용자 객체에서 displayName과 photoURL 변경
updateProfile(authService.currentUser, {
    displayName: newNickname,
    photoURL: downloadUrl,
});
