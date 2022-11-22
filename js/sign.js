// // 로그인, 회원가입 클릭시 진하게
// btnLogin = document.getElementsByClassName("loginBtn")[0];
// btnJoin = document.getElementsByClassName("joinBtn")[0];
// loginWrap = document.getElementsByClassName("loginWrap")[0];
// memberWrap = document.getElementsByClassName("memberWrap")[0];

// // 로그인 클릭시
// btnLogin.addEventListener("click", function(){
//     btnLogin.classList.add("click")
//     btnJoin.classList.remove("click")
//     memberWrap.classList.add("display")
//     loginWrap.classList.remove("display")
// });

// //디버깅할때 안좋은 방법
// //

// // 회원가입 클릭시
// btnJoin.addEventListener("click", function(){
//     btnJoin.classList.add("click")
//     btnLogin.classList.remove("click")
//     loginWrap.classList.add("display")
//     memberWrap.classList.remove("display")
// });

const loginBtn = document.getElementById("loginBtn")
const joinBtn = document.getElementById("joinBtn")
const memberWrap = document.getElementById("memberwrap")
const loginWrap = document.getElementById("loginWrap")


export function handleLogin(){
  console.log("로그인 클릭")
  // loginBtn.classList.add("click")
  joinBtn.classList.remove("click")
  memberWrap.classList.add("display")
  loginWrap.classList.remove("display")
}

// 같은 클래스 이름이 여러개 있을 수 있음 -> 기본적으로 배열로 받음

export function handleJoin(){
  joinBtn.classList.add("click")
  loginBtn.classList.remove("click")
  loginWrap.classList.add("display")
  memberWrap.classList.remove("display")
}