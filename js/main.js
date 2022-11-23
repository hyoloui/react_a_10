import { authService } from "./firebase.js";
import { handleLocation, route } from "./router.js";
import { getList , modalOn , modalOff , sendId } from "./crud.js";

// hash url 변경 시 처리
window.addEventListener("hashchange", handleLocation);

// 첫 랜딩 또는 새로고침 시 처리
document.addEventListener("DOMContentLoaded", () => {
    // 뉴스피드 불러오기
    // getList();
    // 로그인 상태 모니터링
    authService.onAuthStateChanged((user) => {
        // Firebase 연결되면 화면 표시
        // user === authService.currentUser 와 같은
        handleLocation();
        if (user) {
            // 로그인 상태인 경우
            console.log("로그인 상태");
        } else {
            // 로그아웃 상태인 경우
            console.log("로그아웃 상태");
        }
    });
});

// 전역 함수 리스트
window.route = route;
window.push = getList;
// onclick, onchange, onsubmit 이벤트 핸들러 리스트
window.onclick = onclick;
window.ontoggle = ontoggle;
window.onsubmit = onsubmit;
// window.handleAuth = handleAuth;
// window.goToProfile = goToProfile;
// window.socialLogin = socialLogin;
// window.logout = logout;
// window.onFileChange = onFileChange;
// window.changeProfile = changeProfile;
// window.save_comment = save_comment;
// window.update_comment = update_comment;
// window.onEditing = onEditing;
// window.delete_comment = delete_comment;


// 모달창 
window.modalOn = modalOn
window.modalOff = modalOff
window.sendId = sendId;