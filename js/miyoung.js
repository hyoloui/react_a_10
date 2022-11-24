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
} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';
import {
  updateProfile,
  signOut,
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
    })
    .catch((error) => {
      console.log('error:', error);
    });
};

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
    })
    .catch((error) => {
      // An error happened.
      console.log('error:', error);
    });
};

export const save_comment = async (event) => {
  event.preventDefault();
  const comment = document.getElementById('comment');
  const { uid, photoURL, displayName } = authService.currentUser;
  try {
    await addDoc(collection(dbService, 'poster'), {
      text: comment.value,
      createdAt: Date.now(),
      creatorId: uid,
      profileImg: photoURL,
      nickname: displayName,
    });
    alert('프로필 등록 완료');
    location.reload();
    comment.value = '';
    getCommentList();
  } catch (error) {
    alert('프로필 등록 실패');
    console.log('error in addDoc:', error);
  }
};

export const getCommentList = async () => {
  let cmtObjList = [];
  const q = query(
    collection(dbService, 'poster'),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const commentObj = {
      id: doc.id,
      ...doc.data(),
    };
    cmtObjList.push(commentObj);
  });
};
