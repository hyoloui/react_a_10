import { authService, storageService, dbService } from './firebase.js';
import {
  ref,
  uploadString,
  getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js';
import {
  // 보이지 않는 firesotre.js 안에 이런 함수들이 있다.
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  orderBy,
  query,
  getDocs,
  where,
} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';
import {
  updateProfile,
  signOut,
  updatePassword,
} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

export const changeProfile = async (event) => {
  event.preventDefault();
  document.getElementById('profileBtn').disabled = true;
  const imgRef = ref(
    storageService,
    `${authService.currentUser.uid}/${uuidv4()}`
  );

  const newNickname = document.getElementById('profileNickname').value;
  // 프로필 이미지 dataUrl을 Storage에 업로드 후 다운로드 링크를 받아서 photoURL에 저장.
  const imgDataUrl = localStorage.getItem('imgDataUrl');
  let downloadUrl;
  if (imgDataUrl) {
    const response = await uploadString(imgRef, imgDataUrl, 'data_url');
    downloadUrl = await getDownloadURL(response.ref);
  }
  await updateProfile(authService.currentUser, {
    displayName: newNickname ? newNickname : null,
    photoURL: downloadUrl ? downloadUrl : null,
  })
    .then((result) => {
      console.log(result);
      console.log(authService.currentUser);
      alert('저장완료');
    })
    .catch((error) => {
      console.log('error:', error);
    });

  // 비밀번호 변경 기능 추가
  // const auth = getAuth(); authService = getAuth라서 다 불러올 필요 없음
  const changePwCheck = document.getElementById('changePwCheck').value;

  const user = authService.currentUser;
  const newPassword = changePwCheck;

  updatePassword(user, newPassword)
    .then(() => {
      console.log('비밀번호 변경 완료');
    })
    .catch((error) => {
      // An error ocurred
      console.log('비밀번호 변경 실패');
    });

  // 파이어스토어에 인사말 저장
  const hi = document.getElementById('hi');
  try {
    await addDoc(collection(dbService, 'hi'), {
      text: hi.value,
      id: authService.currentUser.uid,
      createdAt: Date.now(),
    });
    hi.value = '';
    getHiList();
    // location.reload();
  } catch (error) {
    console.log('error in addDoc:', error);
  }
};

//add.doc -> 추가 / update.doc ->수정

export const onFileChange = (event) => {
  const theFile = event.target.files[0]; // file 객체
  const reader = new FileReader();
  reader.readAsDataURL(theFile); // file 객체를 브라우저가 읽을 수 있는 data URL로 읽음.
  reader.onloadend = (finishedEvent) => {
    // 파일리더가 파일객체를 data URL로 변환 작업을 끝났을 때
    const imgDataUrl = finishedEvent.currentTarget.result;
    localStorage.setItem('imgDataUrl', imgDataUrl);
    document.getElementById('profileView').src = imgDataUrl;
  };
};

//로그아웃 기능. singout을 import 해왔어야 했다.
export const logout = (event) => {
  event.preventDefault(); // a태그가 가지고있는 새로고침하는 기본 이벤트를 없애줌
  console.log('로그아웃클릭');
  signOut(authService)
    .then(() => {
      // Sign-out successful.
      localStorage.clear();
      console.log('로그아웃 성공');
      window.location.replace('');
    })
    .catch((error) => {
      // An error happened.
      console.log('error:', error);
    });
};

//인사말 data불러오기
export const getHiList = async () => {
  let currentUserId = await authService.currentUser.uid;
  // let currentUserId = authService.currentUser.uid;
  const q = query(collection(dbService, 'hi'), orderBy('createdAt', 'asc'));
  const querySnapshot = await getDocs(q);

  let recentHiText = '';

  querySnapshot.forEach((doc, index) => {
    const { id, text } = doc.data();
    if (currentUserId === id) recentHiText = text;
  });

  const textAreaHi = document.querySelector('#hi');
  textAreaHi.value = recentHiText;
};

// getHist를 비동기 형식으로 진행하기 위해 async를 사용한다

// await 비동기 방식으로 authService.currentUser.uid로 선정하여 진행한다.
//[async와 await는 자바스크립트의 비동기 처리 패턴 중 가장 최근에 나온 문법]
//await는 async 함수 안에서만 동작한다.
//await는 ‘기다리다'라는 뜻을 가진 영단어 인데, 프라미스가 처리될 때 까지 기다리는 역할을 한다

//[먼저 함수의 앞에 async 라는 예약어를 사용한다.
//그러고 나서 함수의 내부 로직 중 HTTP 통신을 하는 비동기 처리 코드 앞에 await를 붙인다.
//여기서 주의하셔야 할 점은 비동기 처리 메서드가 꼭 프로미스 객체를 반환해야 await가 의도한 대로 동작
//일반적으로 await의 대상이 되는 비동기 처리 코드는 Axios 등 프로미스를 반환하는 API 호출 함수]

// const 변하지 않는 값인 q를 선정하여 query(모든 data를 읽어오기 위해 사용)를 사용하여 모든 data를 가져온다.
// orderBy를 사용하여 data의 시간 순서대로 정리 후 asc(오름차순 사용) 한다.
// 오름차순을 사용하는 이유 : firebase에서 data를 가져올때 가장 최근의 글이 가장 아래로 가기 때문에 진행함.

//firestore의 collection 은 QuerySnapshot을 사용하여 return한다. return = querySnapshot
//return값을 비동기 형식으로 getdocs의 선정하고 위에서 선정한 data의 q를 return한다.

//가장 최근 text를 진행하기 위해 recentHiText를 사용한다.

//forEach는 배열이나 컬렉션(일반적으로 배열을 뜻한다는데 배열 이외의 요소는 아직 접하지 못한 요소)에 대한 반복을 실행시켜주는 용도로 사용된다.
//doc의 자료를 반복적으로 작업하고 id와 text값을 doc.data()항목으로 들어오게한다.

// 위에서 사용한 현재 로그인한 ID값과 UID값을 같다면, 같은 사람의 text를 가져오게 하기 위해 만들었다.
