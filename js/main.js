import { authService } from "./firebase.js";
import { handleLocation, route } from "./router.js";

// hash url 변경 시 처리
window.addEventListener("hashchange", handleLocation());

// 첫 랜딩 또는 새로고침 시 처리
document.addEventListener("DOMContentLoaded", () => {
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

// hash url 변경 시 처리
window.addEventListener("hashchange", handleLocation);

// 첫 랜딩 또는 새로고침 시 처리
document.addEventListener("DOMContentLoaded", handleLocation);

// 전역 함수 리스트
window.route = route;

// 전역 함수 리스트
window.route = route;

// 모달창
// 특정 버튼을 누르면 모달창이 켜지게 하기
function modalOn() {
  const modal_on = document.getElementById("modal"); // 나중에 또쓰려고 선언하는거
  modal_on.style.display = "flex";
}
window.modalOn = modalOn;

function modalOn2() {
  const modal_on = document.getElementById("create_modal"); // 나중에 또쓰려고 선언하는거
  modal_on.style.display = "flex";
}
window.modalOn2 = modalOn2;

// 모달창의 클로즈(x) 버튼을 누르면 모달창이 꺼지게 하기
function modalOff() {
  const modal_close = document.getElementById("modal");
  modal_close.style.display = "none";
}
window.modalOff = modalOff;

function modalOff2() {
  const modal_close = document.getElementById("create_modal");
  modal_close.style.display = "none";
}
window.modalOff2 = modalOff2;

//모달창이 켜진 상태에서 ESC 버튼을 누르면 모달창이 꺼지게 하기
// window.addEventListener("keyup", (e) => {
//   if (modal.style.display === "flex" && e.key === "Escape") {
//     modal.style.display = "none";
//   }
// });

//모달창 바깥 영역을 클릭하면 모달창이 꺼지게 하기
// window.addEventListener("click", (e) => {
//   const evTarget = e.target;
//   if (evTarget.classList.contains("modal-overlay")) {
//     modal.style.display = "none";
//   }
// });
