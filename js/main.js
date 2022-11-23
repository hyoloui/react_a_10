import { authService } from "./firebase.js";
import { handleLocation, route } from "./router.js";
import {
  handleLogin,
  handleJoin,
  handleConst,
  registerNow,
  login,
} from "./sign.js";

// 첫 랜딩 또는 새로고침 시 처리
document.addEventListener("DOMContentLoaded", function () {
  // 로그인 상태 모니터링
  authService.onAuthStateChanged((user) => {
    // Firebase 연결되면 화면 표시
    // user === authService.currentUser 와 같은
    handleLocation();
    const hash = window.location.hash;
    if (user) {
      // 로그인 상태이므로 항상 팬명록 화면으로 이동
      console.log("로그인 완료!");
    } else {
      // 로그아웃 상태이므로 로그인 화면으로 강제 이동
      console.log("로그아웃 상태!");
    }
  });
});

// 전역 함수 리스트
window.route = route;
window.handleLogin = handleLogin;
window.handleJoin = handleJoin;
window.handleConst = handleConst;
window.registerNow = registerNow;
window.login = login;
