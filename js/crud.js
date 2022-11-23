import {
    doc,
    addDoc,
    updateDoc,
    deleteDoc,
    collection,
    orderBy,
    query,
    getDocs,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService, authService } from "./firebase.js"

// const dbService = getStorage(app); // app은 Firebase 프로젝트 연결 객체

// Create API
// comments 라는 이름의 collection에 객체 형태의 Document를 신규 등록
export const save_fanpick = async (event) => {
    event.preventDefault();
    const title = document.querySelector(".title2");
    const content = document.querySelector(".content2");
    // const { uid, photoURL, displayName } = authService.currentUser;
    try {
      await addDoc(collection(dbService, "fan-pick"), {
        제목: title.value,
        내용: content.value,
        시간: Date.now(),
        // creatorId: uid,
        // profileImg: photoURL,
        // nickname: displayName,
      });
      title.value = "";
      content.value = "";
      getList();
      modalOff2();
    } catch (error) {
      alert(error);
      console.log("error in addDoc:", error);
    }
  };


// Read API
// id 받아적기
let selectId = "";
export async function getList(){
    const cmtObjList = [];
    // query 를 db에서 받아와 q로 선언
    const q = query(
        collection(dbService, "fan-pick"),
        // orderBy("제목", "desc")
    );
    // query 조건에 맞는 documents 데이터를 배열로 받아오기
    const querySnapshot = await getDocs(q);
    // doc.id는 DB가 자체적으로 생성하는 값으로, id도 함께 포함시키기 위해 객체 재구성
    querySnapshot.forEach((doc) => {
        const fanPickList = {
            id: doc.id,
            ...doc.data(),
        };
        cmtObjList.push(fanPickList);
        console.log(doc.id)
    });
    const newsFeed = document.getElementById("newsFeed");
    // newsFeed.innerHTML = ""; // 이부분 지우면 append가 안됨
    // const currentUid = authService.currentUser.uid;

    cmtObjList.forEach((fanPickList) => {
        // const isOwner = currentUid === cmtObj.creatorId;
        const temp_html = `<div class="content_card_container" id="${fanPickList.id}" onclick="sendId(this.id)">
        <!--카드이미지-->
        <div class="card_img">
            <img onclick="modalOn()" src="https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize"
                alt="" />
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
                    <img src=""
                        alt="profileImg" />
                </div>
                <div class="card_name"><span> </span></div>
                <div class="card_date"><span>
                ${Date(fanPickList.작성시간)
                    .toString()
                    .slice(0, 25)}</span></div>
            </div>
        </div>
    </div>`
        
        const div = document.createElement("div");
        div.classList.add("mycards");
        div.innerHTML = temp_html;

        newsFeed.appendChild(div);
        console.log(cmtObjList)
        console.log(newsFeed)
    });

}

// 특정 버튼을 누르면 모달창이 켜지게 하기
export async function modalOn() {
    const card = [];
    const q = query(collection(dbService, "fan-pick"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
        if (doc.id === selectId){
            const commentObj = {
                id: selectId,
                ...doc.data(),
            };
            card.push(commentObj);
        }
    });
    console.log(card)

    const feedModal = document.getElementById("modal_area");
    const openModal = 
        `<div id="modal" class="modal-overlay">
        <div class="modal-window">
            <div class="headline1">
                <div class="profile_wrap">
                <div class="profile_img_box"></div>
                <div class="profile_name">작성자</div>
                </div>
                <button id="close-area" class="close-area" onclick="modalOff()">
                <i class="fa-regular fa-x xBtn"></i>
                </button>
            </div>

        <div class="headline2">
            <p class="title">${card[0].제목}</p>
        </div>

        <div class="headline3">
            <button class="btn">수정</button>
            <button class="btn ml10">삭제</button>
        </div>

        <div class="contents_area">
            <div class="content_pic">
            <img
                src="https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize"
                alt=""
            />
            </div>
            <p class="content">${card[0].내용}</p>
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
}

// 모달창의 클로즈(x) 버튼을 누르면 모달창이 꺼지게 하기
export function modalOff() {
    const modal_close = document.querySelector(".modal_inner")
    modal_close.remove();
}

// 받아적은 id 하나만 가져오기
export function sendId(showId) {
    selectId = "";
    selectId = showId;
    console.log(selectId);
}

// 팬픽 작성 모달창
export function modalOn2(){
    const modal_open = document.querySelector("#create_modal")
    modal_open.style.display = "flex"
}
export function modalOff2(){
    const modal_close = document.querySelector("#create_modal")
    modal_close.style.display = "none"
}
















// export async function getModal(){
    
// }

// // Update API
// // comments collection 내에서 해당 id값을 가진 doc을 찾아서 doc.text를 업데이트
// const commentRef = doc(dbService, "comments", id);
// updateDoc(commentRef, { text: newComment });




















// // Delete API
// // comments collection 내에서 해당 id값을 가진 doc을 찾아서 삭제
// deleteDoc(doc(dbService, "comments", id));


