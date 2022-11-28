// index.html에서 이 자바스크립트 파일을 불러옴
// 다른 자바스크립트 파일에서 이 함수들을 임포트 해서 가져옴
import { darkMode } from "./darkmode.js";
import { authService } from "./firebase.js";
import { handleLocation, route, goToProfile } from "./router.js";
import {
  save_fanpick,
  getList,
  sendId,
  modalOn,
  modalOn2,
  modalOff,
  modalOff2,
  save_img,
  uploadImage,
  delete_comment,
  edit_btn,
  update_content,
  getCommentList,
  Post_comment,
  search_contents,
} from "./crud.js";
import {
  changeProfile,
  onFileChange,
  logout,
  getHiList,
  myPost,
} from "./miyoung.js";
import {
  handleLogin,
  handleJoin,
  handleConst,
  registerNow,
  login,
  socialLogin,
} from "./sign.js";

// hash url 변경 시 처리
window.addEventListener("hashchange", handleLocation);

// 첫 랜딩 또는 새로고침 시 처리
document.addEventListener("DOMContentLoaded", function () {
  // DOMContentLoaded -> html,css,js파일을 다 다운로드 받았으면

  authService.onAuthStateChanged((user) => {
    // 파이어베이스랑 연결, 유저가 있으면 로그인 상태
    //aitjservoce 유저정보가 담긴 객체 // onAuthStateChanged (이벤트리스너), 로그인상태인지 로그아웃상태인지 모니터링해주는것임

    handleLocation(); // 현재url에 해당하는 화면을 띄우는 역할을 함.
    const hash = window.location.hash; //어떤 화면을 보일지 확인할 수 있는 인덱스

    if (user) {
      // 유저라는 객체가 확인이 되면
      // 상단 오른쪽 프로필메뉴 hover기능 만들었어요. - 미영
      console.log("로그인상태");
      const topProfile = document.querySelector("#nav_profile");
      const menuDisplay = document.querySelector("#menu_display");
      const navProfileImg = document.querySelector("#nav_profile_img");
      const profileMenuLogin = document.querySelector("#profile-menu-login");
      const menuDisplayLogOut = document.getElementById("menu_display-logout");
      menuDisplayLogOut.style.display = "none !important;";
      document.getElementById("nav_profile_img").src =
        authService.currentUser.photoURL ?? "../assets/mypageimg.png";
      topProfile.addEventListener("mouseenter", function (event) {
        menuDisplay.style.display = "flex";
      });
      topProfile.addEventListener("mouseleave", function (event) {
        menuDisplay.style.display = "none";
      });
    } else {
      // 유저라는 객체가 없다면 로그아웃 상태임.
      console.log("로그아웃상태");
      document.getElementById("nav_profile_img").src =
        "../assets/mypageimg.png";
      if (hash == "#mypage") {
        // 로그아웃 상태에서 로그인화면이 아니라면
        window.location.replace("/"); // 로그인 화면으로 강제 이동
      }
      // 로그아웃 상태에서 오른쪽 상단 프로필 hover하면 메뉴나오게 했어요. - 미영
      const topProfile = document.querySelector("#nav_profile");
      const menuDisplay = document.querySelector("#menu_display");
      const navProfileImg = document.querySelector("#nav_profile_img");
      const logoutMenu = document.getElementById("profile-menu-logout");
      const menuDisplayLogOut = document.getElementById("menu_display-logout");
      menuDisplay.style.display = "none";
      topProfile.addEventListener("mouseenter", function (event) {
        menuDisplayLogOut.style.display = "flex";
      });
      topProfile.addEventListener("mouseleave", function (event) {
        menuDisplayLogOut.style.display = "none";
      });

      // 다른 영역 클릭 시 메뉴 없어짐
      document.addEventListener("click", function (event) {
        if (event.target != navProfileImg) {
          menuDisplayLogOut.style.display = "none";
        }
      });
    }
  });
});

// // onclick, onchange, onsubmit 이벤트 핸들러 리스트
// 모듈로 된 js 파일은 전역으로 쓸 수 없음. 지역적으로만 사용이 가능한데
// window라는 전역객체를 이용하여 강제로 window의 메서드 로서 다른데서 불러왔던 함수들을 할당시켜주는 역할을 한다.
// window는 날라다니는 애라 아무데서나 사용할 수 있다는 것이당.
// 근데 이렇게 끌고와서 window의 메서드로 사용하려면 맨 위 import를 해와야 한당.

window.socil
window.route = route;
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
window.update_content = update_content;
window.edit_btn = edit_btn;
window.delete_comment = delete_comment;

// CRUD
window.save_fanpick = save_fanpick;
window.getList = getList;
window.sendId = sendId;
window.search_contents = search_contents;
// 모달창
window.modalOn = modalOn;
window.modalOn2 = modalOn2;
window.modalOff = modalOff;
window.modalOff2 = modalOff2;
// window.handleAuth = handleAuth;
window.goToProfile = goToProfile;
window.socialLogin = socialLogin;
window.logout = logout;
window.onFileChange = onFileChange;
window.changeProfile = changeProfile;
window.handleLogin = handleLogin;
window.handleJoin = handleJoin;
window.handleConst = handleConst;
window.registerNow = registerNow;
window.login = login;
window.save_img = save_img;
window.uploadImage = uploadImage;
window.getHiList = getHiList;
window.getHiList = getHiList;
window.myPost = myPost;
window.darkMode = darkMode;
window.getCommentList = getCommentList;
window.Post_comment = Post_comment;
