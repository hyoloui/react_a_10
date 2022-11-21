import {authService} from './firebase.js';
import {handleLocation, route} from './router.js';

// hash url 변경 시 처리
window.addEventListener('hashchange', handleLocation());

// 첫 랜딩 또는 새로고침 시 처리
document.addEventListener('DOMContentLoaded', () => {
  // 로그인 상태 모니터링
  authService.onAuthStateChanged((user) => {
    // Firebase 연결되면 화면 표시
    // user === authService.currentUser 와 같은
    handleLocation();
    if (user) {
      // 로그인 상태인 경우
      console.log('로그인 상태');
    } else {
      // 로그아웃 상태인 경우
      console.log('로그아웃 상태');
    }
  });
});

// hash url 변경 시 처리
window.addEventListener('hashchange', handleLocation);

// 첫 랜딩 또는 새로고침 시 처리
document.addEventListener('DOMContentLoaded', handleLocation);

// 전역 함수 리스트
window.route = route;

// 전역 함수 리스트
window.route = route;

/////////////////<!--미영 작업-->//////////////
const topProfile = document.querySelector('#nav_profile');
const menuDisplay = document.querySelector('#menu_display');
const navProfileImg = document.querySelector('#nav_profile_img');

// nav 프로필이미지 클릭 시 메뉴 뿅
topProfile.addEventListener('click', function () {
  menuDisplay.style.display = 'block';
});

// 다른 영역 클릭 시 메뉴 없어짐
document.addEventListener('click', function (event) {
  console.log(event.target);
  if (event.target != navProfileImg) {
    menuDisplay.style.display = 'none';
  }
});
////////////////////////////////////////////

$('#logout').click(function () {
  firebase.auth().signOut();
  localStorage.removeItem('user');
  alert('떠나다니 아쉽네요.');
});


// 첫번째방법
document.querySelector('#logout').addEventListener('click', function () {
    firebase.auth().signOut();
    localStorage.removeItem('user');
    alert('떠나다니 아쉽네요.');
})

// 두번째방법
const logOut = document.querySelector('#logout');
logOut.addEventListener('click', function () {
  firebase.auth().signOut();
  localStorage.removeItem('user');
  alert('떠나다니 아쉽네요.');
});
