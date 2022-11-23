// import { getList } from "./crud.js"

export const route = (event) => {
  event.preventDefault();
  console.log('event.target.hash', event.target.hash)
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
};

export const handleLocation = async () => {
  let path = window.location.hash.replace('#', ''); //#about -> about

  // "http://example.com/"가 아니라 도메인 뒤에 / 없이 "http://example.com" 으로 나오는 경우
  if (path.length == 0) {
    path = '/';
  }

  const route = routes[path] || routes[404];
  const html = await fetch(route).then((data) => data.text());

  document.getElementById('main-page').innerHTML = html;
  // if (path === "/"){
  //   getList();
  // }
};



// // hash url 변경 시 처리
// window.addEventListener('hashchange', handleLocation);

// // 첫 랜딩 또는 새로고침 시 처리
// document.addEventListener('DOMContentLoaded', handleLocation);
