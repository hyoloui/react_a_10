import {authService, storageService} from './firebase.js';
import {
  ref,
  uploadString,
  getDownloadURL,
  // doc,
  // addDoc,
  // updateDoc,
  // deleteDoc,
  // collection,
  // orderBy,
  // query,
  // getDocs,
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
      window.location.hash = '#mypage';
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


// export const getProfileImg = async () => {
//   let cmtObjList = [];
//   const q = query(
//     collection(dbService, 'photoURL'),
//     orderBy('createdAt', 'desc')
//   );
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     const commentObj = {
//       id: doc.id,
//       ...doc.data(),
//     };
//     cmtObjList.push(commentObj);
//   });
//   const commnetList = document.getElementById('comment-list');
//   const currentUid = authService.currentUser.uid;
//   commnetList.innerHTML = '';
//   cmtObjList.forEach((cmtObj) => {
//     const isOwner = currentUid === cmtObj.creatorId;
//     const temp_html = `<div class="card commentCard">
//           <div class="card-body">
//               <blockquote class="blockquote mb-0">
//                   <p class="commentText">${cmtObj.text}</p>
//                   <p id="${
//                     cmtObj.id
//                   }" class="noDisplay"><input class="newCmtInput" type="text" maxlength="30" /><button class="updateBtn" onclick="update_comment(event)">완료</button></p>
//                   <footer class="quote-footer"><div>BY&nbsp;&nbsp;<img class="cmtImg" width="50px" height="50px" src="${
//                     cmtObj.profileImg
//                   }" alt="profileImg" /><span>${
//       cmtObj.nickname ?? '닉네임 없음'
//     }</span></div><div class="cmtAt">${new Date(cmtObj.createdAt)
//       .toString()
//       .slice(0, 25)}</div></footer>
//               </blockquote>
//               <div class="${isOwner ? 'updateBtns' : 'noDisplay'}">
//                    <button onclick="onEditing(event)" class="editBtn btn btn-dark">수정</button>
//                 <button name="${
//                   cmtObj.id
//                 }" onclick="delete_comment(event)" class="deleteBtn btn btn-dark">삭제</button>
//               </div>            
//             </div>
//      </div>`;
//     const div = document.createElement('div');
//     div.classList.add('mycards');
//     div.innerHTML = temp_html;
//     commnetList.appendChild(div);
//   });
// };