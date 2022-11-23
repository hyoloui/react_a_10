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
  if (path === '') {
    // 로그인한 회원의 프로필사진과 닉네임을 화면에 표시해줌.
    // document.getElementById('nickname').textContent =
    //   authService.currentUser.displayName ?? '닉네임 없음';
    

    getCommentList();
  }

  if (path === 'mypage') {
    // 프로필 관리 화면 일 때 현재 프로필 사진과 닉네임 할당
    console.log('mypageauthService.currentUser:', authService.currentUser);
    document.getElementById('profileView').src =
      authService.currentUser?.photoURL ?? '../assets/mypageimg.png';
    // authService = 어센티케이션 / 즉, 위 코드는 
    // 어센티케이션의 커렌트유저의 포토유알엘이 있으면 그걸 쓰고, 없으면 오른쪽 이미지를 써라. 라는 뜻임
    document.getElementById('profileNickname').placeholder =
      authService.currentUser?.displayName ?? '닉네임 없음';
    document.getElementById('profileEmail').placeholder =
      authService.currentUser?.email;
    // 로컬이아닌 서버에 있는 데이터인데 서버통신은 비동기임, 비동기 특징은 동기부터 실행 -> 비동기 실행
    // 브라우저 엔진,자바스크립트 엔진이 먼저 읽기 때문(비동기 실행되기 전)
    // 처음에는 authservice가 없고 불러오고나서 실행됨, 서버에서 불러오기 전에는 null값이라는거임.
    // ?를 붙혀주면 null일때 신경쓰지 말라는 뜻임.(데이터가 잇을때만 신경써라)
  }
};

export const goToProfile = () => {
  window.location.hash = '#profile';
};

// hash url 변경 시 처리
window.addEventListener('hashchange', handleLocation);

// 첫 랜딩 또는 새로고침 시 처리
document.addEventListener('DOMContentLoaded', handleLocation);
