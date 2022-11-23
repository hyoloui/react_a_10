// import { emailRegex, pwRegex } from "../util.js";
import { authService } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  updateProfile,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

// 각 아이디 선언
export function handleConst() {
  const loginBtn = document.getElementById("loginBtn");
  const joinBtn = document.getElementById("joinBtn");
  const memberWrap = document.getElementById("memberWrap");
  const loginWrap = document.getElementById("loginWrap");
}

// 로그인 버튼 클릭 함수
export function handleLogin() {
  loginBtn.classList.add("click");
  joinBtn.classList.remove("click");
  memberWrap.classList.add("display");
  loginWrap.classList.remove("display");
}

// 회원가입 버튼 클릭 함수
export function handleJoin() {
  joinBtn.classList.add("click");
  loginBtn.classList.remove("click");
  loginWrap.classList.add("display");
  memberWrap.classList.remove("display");
}

// 팬픽 함께하기 누르면 발생하는 함수
export const registerNow = async (event) => {
  event.preventDefault();
  // 이벤트라는 객체가 가지고있는 메소드
  // 앵커태그 등을 클릭하면 자동으로 새로고침시켜주는 것을 막아줌

  const email = document.getElementById("email-new");
  const emailVal = email.value;
  const pw = document.getElementById("pw-new");
  const pwVal = pw.value;
  const pwCheck = document.getElementById("pw-check");
  const pwCheckVal = pwCheck.value;

  // 유효성 검사 진행
  if (!emailVal) {
    alert("이메일을 입력해 주세요");
    email.focus();
    return;
  }
  if (!pwVal) {
    alert("비밀번호를 입력해 주세요");
    pw.focus();
    return;
  }

  // const matchedEmail = emailVal.match(emailRegex);
  // const matchedPw = pwVal.match(pwRegex);

  // if (matchedEmail === null) {
  //   alert("이메일 형식에 맞게 입력해 주세요");
  //   email.focus();
  //   return;
  // }
  // if (matchedPw === null) {
  //   alert("비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.");
  //   pw.focus();
  //   return;
  // }

  // 유효성 검사 통과 후 로그인 또는 회원가입 API 요청

  // 회원가입 버튼 클릭의 경우
  if (pwVal === pwCheckVal) {
    await createUserWithEmailAndPassword(authService, emailVal, pwVal)
      .then(() => {
        // Signed in
        console.log("회원가입 성공!");
        alert("축하합니다. 회원이 되셨습니다.");

        // 닉네임을 받아서 추가시켜줌
        updateProfile(authService.currentUser, {
          displayName: document.getElementById("name-new").value,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("errorMessage:", errorMessage);
        if (errorMessage.includes("email-already-in-use")) {
          alert("이미 가입된 이메일입니다.");
        }
      });
  } else {
    alert("비밀번호를 확인해주세요");
  }
};

// update pofile -> 닉네임 바꾸기
// async

// 로그인 함수
export const login = (event) => {
  event.preventDefault();
  console.log("로그인을 눌렀어요");

  const email = document.getElementById("email");
  const emailVal = email.value;
  const pw = document.getElementById("pw");
  const pwVal = pw.value;

  // 유효성 검사 진행
  if (!emailVal) {
    alert("이메일을 입력해 주세요");
    email.focus();
    return;
  }
  if (!pwVal) {
    alert("비밀번호를 입력해 주세요");
    pw.focus();
    return;
  }

  signInWithEmailAndPassword(authService, emailVal, pwVal)
    .then((userCredential) => {
      // Signed in
      console.log("로그인 성공! 로그인 정보", userCredential);
      const user = userCredential.user;
      window.location.hash = "";
    })
    .catch((error) => {
      const errorMessage = error.message;
      console.log("errorMessage:", errorMessage);
      if (errorMessage.includes("user-not-found")) {
        alert("가입되지 않은 회원입니다.");
        return;
      } else if (errorMessage.includes("wrong-password")) {
        alert("비밀번호가 잘못 되었습니다.");
      }
    });
};
