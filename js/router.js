import {authService} from './firebase.js';

export const route = (event) => {
  event.preventDefault();
  console.log('event.target.hash', event.target.hash);
  window.location.hash = event.target.hash;
};

const routes = {
  404: '/pages/404.html',
  '/': '/pages/home.html',
  changsun: '/pages/changsun.html',
  dowon: '/pages/dowon.html',
  miyoung: '/pages/miyoung.html',
  seunghyo: '/pages/seunghyo.html',
  hongu: '/pages/hongu.html',
  mypage: '/pages/mypage.html',
  mywriting: '/pages/mywriting.html',
};

export const handleLocation = async () => {
  let path = window.location.hash.replace('#', '');
  const pathName = window.location.pathname;

  // Live Server를 index.html에서 오픈할 경우
  if (pathName === '/index.html') {
    window.history.pushState({}, '', '/');
  }
  if (path.length == 0) {
    path = '/';
  }

  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());
  document.getElementById('main-page').innerHTML = html;

  // 특정 화면 렌더링 되자마자 DOM 조작 처리
  if (path === 'main') {
    // 로그인한 회원의 프로필사진과 닉네임을 화면에 표시해줌.
    document.getElementById('nickname').textContent =
      authService.currentUser.displayName ?? '닉네임 없음';

    document.getElementById('profileImg').src =
      authService.currentUser.photoURL ?? '../assets/mypageimg.png';

    getCommentList();
  }
  if (path === 'mypage') {
    // 프로필 관리 화면 일 때 현재 프로필 사진과 닉네임 할당
    document.getElementById('profileView').src =
      authService.currentUser.photoURL ?? '../assets/mypageimg.png';
    document.getElementById('profileNickname').placeholder =
      authService.currentUser.displayName ?? '닉네임 없음';
  }
};

export const goToProfile = () => {
  window.location.hash = '#profile';
};

// hash url 변경 시 처리
window.addEventListener('hashchange', handleLocation);

// 첫 랜딩 또는 새로고침 시 처리
document.addEventListener('DOMContentLoaded', handleLocation);
