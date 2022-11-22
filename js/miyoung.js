import {authService, storageService} from './firebase.js';
import {
  ref,
  uploadString,
  getDownloadURL,
} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js';
import {updateProfile} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js';
import {v4 as uuidv4} from 'https://jspm.dev/uuid';


export const topProfile = document.querySelector('#nav_profile');
export const menuDisplay = document.querySelector('#menu_display');
export const navProfileImg = document.querySelector('#nav_profile_img');

// nav 프로필이미지 클릭 시 메뉴 뿅

topProfile.addEventListener('click', function () {
  menuDisplay.style.display = 'block';
});

// 다른 영역 클릭 시 메뉴 없어짐
document.addEventListener('click', function (event) {
  console.log(event.target);
  if (event.target != navProfileImg) {
    menuDisplay.style.display = 'none';
  }
});


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
    .then(() => {
      alert('프로필 수정 완료');
      window.location.hash = '#fanLog';
    })
    .catch((error) => {
      alert('프로필 수정 실패');
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