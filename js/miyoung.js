import { authService, storageService, dbService } from "./firebase.js";
import {
  ref,
  uploadString,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
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
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import {
  updateProfile,
  signOut,
  updatePassword,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export const changeProfile = async (event) => {
  event.preventDefault();
  document.getElementById("profileBtn").disabled = true;
  const imgRef = ref(
    storageService,
    `${authService.currentUser.uid}/${uuidv4()}`
  );

  const newNickname = document.getElementById("profileNickname").value;
  // 프로필 이미지 dataUrl을 Storage에 업로드 후 다운로드 링크를 받아서 photoURL에 저장.
  const imgDataUrl = localStorage.getItem("imgDataUrl");
  let downloadUrl;
  if (imgDataUrl) {
    const response = await uploadString(imgRef, imgDataUrl, "data_url");
    downloadUrl = await getDownloadURL(response.ref);
  }
  await updateProfile(authService.currentUser, {
    displayName: newNickname ? newNickname : null,
    photoURL: downloadUrl ? downloadUrl : null,
  })
    .then((result) => {
      console.log(result);
      console.log(authService.currentUser);
      alert("저장완료");
    })
    .catch((error) => {
      console.log("error:", error);
    });

  // 비밀번호 변경 기능 추가
  // const auth = getAuth(); authService = getAuth라서 다 불러올 필요 없음
  const changePwCheck = document.getElementById("changePwCheck").value;

  const user = authService.currentUser;
  const newPassword = changePwCheck;

  updatePassword(user, newPassword)
    .then(() => {
      console.log("비밀번호 변경 완료");
    })
    .catch((error) => {
      // An error ocurred
      console.log("비밀번호 변경 실패");
    });

  // 파이어스토어에 인사말 저장
  const hi = document.getElementById("hi");
  try {
    await addDoc(collection(dbService, "hi"), {
      text: hi.value,
      id: authService.currentUser.uid,
    });
    hi.value = "";
    getHiList();
    location.reload();
  } catch (error) {
    console.log("error in addDoc:", error);
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
    localStorage.setItem("imgDataUrl", imgDataUrl);
    document.getElementById("profileView").src = imgDataUrl;
  };
};

//로그아웃 기능. singout을 import 해왔어야 했다.
export const logout = (event) => {
  event.preventDefault(); // a태그가 가지고있는 새로고침하는 기본 이벤트를 없애줌
  console.log("로그아웃클릭");
  signOut(authService)
    .then(() => {
      // Sign-out successful.
      localStorage.clear();
      console.log("로그아웃 성공");
      window.location.replace("");
    })
    .catch((error) => {
      // An error happened.
      console.log("error:", error);
    });
};

// 파이어 스토어 인사말 불러오기 원본
export const getHiList = async () => {
  let hiObjList = [];
  let selectId;
  const q = query(
    collection(dbService, "hi"),
    where("id", "==", authService.currentUser.uid) //조건문
  );
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);

  querySnapshot.forEach((doc) => {
    //forEach -> qss 객체 근데 사용법은 같다
    if (doc.id === selectId) {
      const hiObj = {
        id: doc.id,
        ...doc.data(),
      };
    }
    hiObjList.push(hiObj);
  });
};
// 쿼리는 주문서
// 어떤식으로 데이터를 달라고 할지?? (내림차순? 아이디 일치?)1
