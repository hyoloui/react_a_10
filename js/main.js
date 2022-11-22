import {authService} from './firebase.js';
import {handleLocation, route} from './router.js';
import {changeProfile, onFileChange} from './miyoung.js';

// hash url 변경 시 처리
window.addEventListener('hashchange', handleLocation());

// 첫 랜딩 또는 새로고침 시 처리
document.addEventListener('DOMContentLoaded', function () {
  // 로그인 상태 모니터링
  authService.onAuthStateChanged((user) => {
    // Firebase 연결되면 화면 표시
    // user === authService.currentUser 와 같은
    handleLocation();
    const hash = window.location.hash;
    if (user) {
      // 로그인 상태이므로 항상 팬명록 화면으로 이동
      if (hash === '') {
        // 로그인 상태에서는 로그인 화면으로 되돌아갈 수 없게 설정
        window.location.replace('#');
      }
    } else {
      // 로그아웃 상태이므로 로그인 화면으로 강제 이동
      if (hash !== '') {
        window.location.replace('');
      }
    }
  });
});

// 전역 함수 리스트
window.route = route;
// window.onToggle = onToggle;
// window.handleAuth = handleAuth;
// window.goToProfile = goToProfile;
// window.socialLogin = socialLogin;
// window.logout = logout;
window.onFileChange = onFileChange;
window.changeProfile = changeProfile;
// window.save_comment = save_comment;
// window.update_comment = update_comment;
// window.onEditing = onEditing;
// window.delete_comment = delete_comment;
