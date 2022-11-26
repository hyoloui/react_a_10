import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  orderBy,
  query,
  getDocs,
} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js';
import {dbService, authService, storageService} from './firebase.js';
import {
  ref,
  getDownloadURL,
  uploadString,
} from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js';
import {v4 as uuidv4} from 'https://jspm.dev/uuid';

// const dbService = getStorage(app); // app은 Firebase 프로젝트 연결 객체
const no_img = '../assets/mypageimg.png';
export const save_img = async () => {
  const imgRef = ref(
    storageService,
    `images/${authService.currentUser.uid}/${uuidv4()}`
  );
  const imgDataUrl2 = localStorage.getItem('imgDataUrl2');
  console.log('imgdataurl2:', imgDataUrl2);
  let downloadUrl;
  if (imgDataUrl2) {
    const response = await uploadString(imgRef, imgDataUrl2, 'data_url');
    console.log('response :', response);
    downloadUrl = await getDownloadURL(response.ref);
    console.log('다운로드URL in save_img:', downloadUrl);
  }
  return downloadUrl;
};

export const uploadImage = (event) => {
  console.log(event.target.files);
  const theFile = event.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(theFile);
  reader.onloadend = (finishedEvent) => {
    const imgDataUrl2 = finishedEvent.currentTarget.result;
    console.log('이미지데이터URL2 in uploadImage :', imgDataUrl2);
    localStorage.setItem('imgDataUrl2', imgDataUrl2);
  };
};

// Create API
// comments 라는 이름의 collection에 객체 형태의 Document를 신규 등록
export const save_fanpick = async (event) => {
  event.preventDefault();
  const title = document.querySelector('.title2');
  const content = document.querySelector('.content2');
  let modalImage = await save_img();

  const {uid, photoURL, displayName} = authService.currentUser;
  try {
    await addDoc(collection(dbService, 'fan-pick'), {
      creatorId: uid,
      프로필이미지: photoURL,
      작성자: displayName,
      제목: title.value,
      내용: content.value,
      시간: Date.now(),
      이미지: modalImage,
    });
    title.value = '';
    content.value = '';
    modalImage = '';
    getList();
    modalOff2();
  } catch (error) {
    alert(error);
    console.log('error in addDoc:', error);
  }
};

// Read API
// id 받아적기
let selectId = '';
export async function getList() {
  const cardList = [];
  // query 를 db에서 받아와 q로 선언
  const q = query(collection(dbService, 'fan-pick'), orderBy('시간', 'desc'));
  // query 조건에 맞는 documents 데이터를 배열로 받아오기
  const querySnapshot = await getDocs(q);
  // doc.id는 DB가 자체적으로 생성하는 값으로, id도 함께 포함시키기 위해 객체 재구성
  querySnapshot.forEach((doc) => {
    const fanPickList = {
      id: doc.id,
      ...doc.data(),
    };
    cardList.push(fanPickList);
  });
  const newsFeed = document.getElementById('newsFeed');
  newsFeed.innerHTML = ''; // 이부분 지우면 append가 안됨
  // const currentUid = authService.currentUser.uid;
  // document.querySelector(".card_profile > img").src = no_img;

  cardList.forEach((fanPickList) => {
    // const isOwner = currentUid === cmtObj.creatorId;
    const temp_html = `<div class="content_card_container" id="${
      fanPickList.id
    }" onclick="sendId(this.id)">
        <!--카드이미지-->
        <div class="card_img">
            <img onclick="modalOn()" src="${fanPickList.이미지 ?? no_img}"
                alt="게시글 이미지" />
            <!--글제목,내용 간단히-->
            <div class="card_content">
                <h4 id="title" onclick="modalOn()">${fanPickList.제목}</h4>
                <p id="content" onclick="modalOn()">${fanPickList.내용}</p>
            </div>
            <!--좋아요-->
            <div class="card_like">
                <span>162</span> <i class="fa-solid fa-heart"></i>
            </div>
            <div class="card_bottom">
                <div class="card_profile">
                <img src="${
                  fanPickList.프로필이미지 ?? no_img
                } " alt="기본이미지">
                </div>
                <div class="card_name"><span>${fanPickList.작성자}</span></div>
                <div class="card_date"><span>
                ${new Date(fanPickList.시간)
                  .toString()
                  .slice(0, 25)}</span></div>
            </div>
        </div>
    </div>`;

    const div = document.createElement('div');
    div.classList.add('mycards');
    div.innerHTML = temp_html;

    newsFeed.appendChild(div);
    console.log(cardList);
  });
}

// 특정 버튼을 누르면 모달창이 켜지게 하기
export async function modalOn() {
  let user = authService.currentUser;
  if (user) {
    const card = [];
    const q = query(collection(dbService, "fan-pick"));
    const querySnapshot = await getDocs(q);
  
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (doc.id === selectId) {
        const commentObj = {
          id: selectId,
          ...doc.data(),
        };
        card.push(commentObj);
      }
      console.log(card);
    });
  
    const feedModal = document.getElementById("modal_area");
    const currentUid = authService.currentUser.uid;
  
    card.forEach((modalCard) => {
      const isOwner = currentUid === modalCard.creatorId;
      console.log(currentUid);
      const openModal = `<div id="modal" class="modal-overlay">
          <div class="modal-window">
              <div class="headline1">
                  <div class="profile_wrap">
                  <div class="profile_img_box"><img src="${
                    modalCard.프로필이미지 ?? no_img
                  }"
                  alt="profileImg" /></div>
                  <div class="profile_name">${modalCard.작성자 ?? "익명"}</div>
                  </div>
                  <button id="close-area" class="close-area" onclick="modalOff()">
                  <i class="fa-regular fa-x xBtn"></i>
                  </button>
              </div>
  
          <div class="headline2">
              <p class="title">${modalCard.제목}</p>
          </div>
  
          <div class="headline3">
              <button onclick="edit_btn(event)" style="${
                isOwner ? "display:inline-block;" : "display:none"
              }" class="btn">수정</button>
              <button onclick="update_content(event)" id="save_edit" style="display:none"
              }" class="btn">완료</button>
              <button style="${
                isOwner ? "display:inline-block;" : "display:none"
              }" class="btn ml10" id="${
        modalCard.id
      }" onclick="delete_comment(event)">삭제</button>
          </div>
  
          <div class="contents_area">
              <div class="content_pic">
              <img
                  src="${modalCard.이미지}"
                  alt=""
              />
              </div>
              <p class="content">${modalCard.내용}</p>
          </div>
  
          <div class="comments_area">
              <p class="comment">댓글쓰기</p>
              <div class="form-commentInfo">
                  <textarea class="comment-input" placeholder="comment"></textarea>
                  <button class="submit">저장</button>
              <!-- <div class="profile_img_box"></div> -->
              </div>
              <div class="comments_wrap">
                  <div class="comments_btn_wrap">
                      <button class="btn">수정</button>
                      <button class="btn ml10">삭제</button>
  
                  </div>
                  <div class="comments_content2">댓글내용</div>
                  <div class="comments_profile_wrap">
                      <div class="profile_img_box"></div>
                      <div class="profile_name">작성자</div>
                      <div class="date">날짜</div>
                  </div>
              </div>
          </div>
          </div>
      </div>`;
  
      const div = document.createElement("div");
      div.classList.add("modal_inner");
      div.innerHTML = openModal;
      feedModal.appendChild(div);
    });
  } else {
    window.location.replace("#changsun");
    alert("로그인을 해주세요.");
  }
}

// 모달창의 클로즈(x) 버튼을 누르면 모달창이 꺼지게 하기
export function modalOff() {
  const modal_close = document.querySelector('.modal_inner');
  modal_close.remove();
}

// 받아적은 id 하나만 가져오기
export function sendId(showId) {
  selectId = '';
  selectId = showId;
  console.log(selectId);
}

export function modalOn2() {
  // const hash = window.location.hash;
  let user = authService.currentUser;
  if (user) {
    const modal_open = document.querySelector("#create_modal");
    modal_open.style.display = "flex";
  const creator_name = document.querySelector(".profile_name");
  const creator_img = document.querySelector(".profile_img_box");
  // console.log(authService.currentUser.displayName)
  creator_img.innerHTML = `<img src=${
    authService.currentUser.photoURL ?? no_img
  }  alt="프로필 이미지">`;
  creator_name.innerHTML = authService.currentUser?.displayName;
  } else {
    window.location.replace("#changsun");
    alert("로그인을 해주세요.");
  }
}

// 팬픽 작성 모달창
// export function modalOn2() {
//   const modal_open = document.querySelector("#create_modal");
//   modal_open.style.display = "flex";
// }

export function modalOff2() {
  const modal_close = document.querySelector('#create_modal');
  modal_close.style.display = 'none';
}

// export async function getModal(){

// }

// // Update API
// // comments collection 내에서 해당 id값을 가진 doc을 찾아서 doc.text를 업데이트
export const edit_btn = async (event) => {
  event.preventDefault();
  // 수정 버튼 삭제 => 완료 버튼 활성화
  const edit_id = event.target;
  edit_id.style.display = 'none';
  const save_edit = document.querySelector('#save_edit');
  save_edit.style.display = 'inline-block';
  // 제목, 내용 dom 가져오기
  const title = document.querySelector('#modal .title');
  const content = document.querySelector('#modal .content');
  // 수정 전 텍스트 저장
  const title_text = title.textContent;
  const content_text = content.textContent;
  console.log(title_text, content_text);
  // 수정 버튼 클릭 시 제목, 내용 태그를 input과 textarea로 변경
  title.innerHTML = `<textarea id="new_title" class="title" style="width:50vw; height: 40px; max-width:880px; min-width:880px;" >${title_text}</textarea>`;
  content.innerHTML = `<textarea id="new_content" class="title" style="width:50vw; height:10vh; max-width:880px; min-width:880px;">${content_text}</textarea>`;
};
export const update_content = async (event) => {
  event.preventDefault();
  const new_title = document.querySelector('#new_title').value;
  const new_content = document.querySelector('#new_content').value;
  const modalId = doc(dbService, 'fan-pick', selectId);
  try {
    await updateDoc(modalId, {
      제목: new_title,
      내용: new_content,
    });
    // getCommentList();
  } catch (error) {
    alert(error);
  }
  getList();
  modalOff();
};

// updateDoc(commentRef, { text: newComment });

// // Delete API
// // comments collection 내에서 해당 id값을 가진 doc을 찾아서 삭제

export const delete_comment = async (event) => {
  event.preventDefault();
  //   const uid = authService.currentUser.uid;
  // 이벤트가 발생한 타겟을 반환해줌
  const id = event.target.id;
  console.log('hello', event.target.id);
  const ok = window.confirm('해당 글을 정말 삭제하시겠습니까?');
  if (ok) {
    try {
      await deleteDoc(doc(dbService, 'fan-pick', id));
      getList();
      modalOff();
      //   cardList();
    } catch (error) {
      alert(error);
    }
  }
};

// 현재 로그인 사용자 받아오기 > 로그인 했으면 해당 아이디와 동일한 게시글만 수정, 삭제 가능하도록
// const auth = getAuth();
//     const user = auth.currentUser;
//     if (user !== null) {
//     // The user object has basic properties such as display name, email, etc.
//     const displayName = user;
//     const email = user.email;
//     const photoURL = user.photoURL;
//     console.log(displayName,email,photoURL,)
// }
