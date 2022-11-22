// 각 아이디 선언
export function handleConst(){
  const loginBtn = document.getElementById("loginBtn")
  const joinBtn = document.getElementById("joinBtn")
  const memberWrap = document.getElementById("memberWrap")
  const loginWrap = document.getElementById("loginWrap")
}

// 로그인 버튼 클릭 함수
export function handleLogin(){
  loginBtn.classList.add("click")
  joinBtn.classList.remove("click")
  memberWrap.classList.add("display")
  loginWrap.classList.remove("display")
}

// 회원가입 버튼 클릭 함수
export function handleJoin(){
  joinBtn.classList.add("click")
  loginBtn.classList.remove("click")
  loginWrap.classList.add("display")
  memberWrap.classList.remove("display")
}