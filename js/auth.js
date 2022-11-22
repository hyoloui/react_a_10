import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
const authService = getAuth();

// 로그인 상태 모니터링
authService.onAuthStateChanged((user) => {
    // Firebase 연결되면 화면 표시
		// user === authService.currentUser 와 같은 값
    if (user) {
      // 로그인 상태인 경우

    } else {
      // 로그아웃 상태인 경우
     
    }
  });
   
   
   export const handleAuth = (event) => {
      event.preventDefault();
    
    
    const db = firebase.firestore(); //database 문법 소환, data아래 실행
    const storage = firebase.storage(); //storage 문법 소환, image를 넣기 위해서도 사용함.

    let remainder = localStorage.getItem('user')



    //유저의 데이터를 로컬에 저장한다. -> 무조건 글자만 입력가능하다.     
     firebase.auth().onAuthStateChanged((user)=>{
        if(user) {
          console.log(user.uid)
          console.log(user.displayName)
          localStorage.setItem('user', JSON.stringify(user))     
        }
     }) //유저의 로그인상태 확인가능함.

     
    //  document.querySelector('#logout').addEventListener('click', function(){
    //       firebase.auth().signOut();
    //       localStorage.removeItem('user')
    //       alert("떠나다니 아쉽네요.");
    //     })

        document.querySelector('#login').addEventListener('click', function(){

          let email = document.querySelector('#email').value;
          let password = document.querySelector('#pw').value;

        firebase.auth().signInWithEmailAndPassword(email, password).then((result)=>{
            console.log(result.user)
            alert("다시 돌아오셨군요!");
          })
        })

        document.querySelector('#register').addEventListener('click', function(){

          let email = document.querySelector('#email-new').value; //사용자가 입력한 이메일 등록
          let password = document.querySelector('#pw-new').value; //사용자가 입력한 비밀번호 등록
          let name = document.querySelector('#name-new').value; //사용자가 입력한 이름 등록

    firebase.auth().createUserWithEmailAndPassword(email, password).then((result)=>{
      let userinfo = {name : name, email : email}  

    db.collection('user').doc(result.user.uid).set(userinfo)
        
        console.log(result);
        console.log(result.user);
        result.user.updateProfile({displayName : name})
        alert("함께 해주신다니 기쁘네요!");
      });
    })



  }