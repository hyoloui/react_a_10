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

// // Create API
// // comments 라는 이름의 collection에 객체 형태의 Document를 신규 등록
// addDoc(collection(dbService, "fan-pick"), {
//     text: comment.value,
//     createdAt: Date.now(),
//     creatorId: uid,
//     profileImg: photoURL,
//     nickname: displayName,
// });

// Read API
// comments 라는 collection안에서 데이터 불러올 때 doc 객체 내에 createdAt 값을 내림차순으로 가져오는 쿼리 정의
let cmtObjList = []
export async function getList(){
    // query 를 db에서 받아와 q로 선언
    const q = query(
        collection(dbService, "fan-pick"),
        // orderBy("createdAt", "desc")
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
    });
    // 카드 리스트 선언
    const newsFeed = document.getElementById("newsFeed");
    // 로그인 한 uid 가져오기
    // const currentUid = authService.currentUser.uid;
    // newsFeed.innerHTML = ""; // 초기화

    cmtObjList.forEach((card) => {
        // const isOwner = currentUid === cmtObj.creatorId;
        const temp_html = `<div class="content_card_container">
        <!--카드이미지-->
        <div class="card_img">
            <img onclick="modalOn()" src="https://cdnimg.melon.co.kr/cm2/artistcrop/images/002/61/143/261143_20210325180240_500.jpg?61e575e8653e5920470a38d1482d7312/melon/resize/416/quality/80/optimize"
                alt="" />
            <!--글제목,내용 간단히-->
            <div class="card_content" onclick="modalOn()">
                <h4 id="title">${card.제목}</h4>
                <p id="content">${card.내용}</p>
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
                ${Date(card.작성시간)
                    .toString()
                    .slice(0, 25)}</span></div>
            </div>
        </div>
    </div>
    <div id="modal" class="modal-overlay">
            <div class="modal-window">
                <div class=headline1>
                    <div class="img_box"></div>
                    <div> </div>
                    <button id="close-area" class="close-area" onclick="modalOff()">X</button>
                </div>

                <div class="headline2">
                    <h2 class="title">${card.제목}</h2>
                </div>

                <div class="headline3">
                    <button class="edit_btn">수정</button>
                    <button class="remove_btn">삭제</button>
                </div>

                <div class="contents_area">
                    <p class="content">${card.내용}</p>
                </div>

                <div class="comments_area">
                    <p class="comment">댓글쓰기</p>
                    <div id="form-commentInfo">

                        <input id="comment-input" placeholder="comment">
                        <button id="submit">저장</button>
                        <div class="img_box"></div>
                    </div>
                    <div id=comments>


                    </div>
                </div>

            </div>
        </div>`;
        const div = document.createElement("div");
        div.classList.add("mycards");
        div.innerHTML = temp_html;
        newsFeed.appendChild(div);
    });



    console.log(cmtObjList)
    console.log(newsFeed)
    // console.log(currentUid.data)
}
// window.querySelector = querySelector;
// document.querySelector("#title").push(`$cmtcmtObjList[0].제목`)

// // Update API
// // comments collection 내에서 해당 id값을 가진 doc을 찾아서 doc.text를 업데이트
// const commentRef = doc(dbService, "comments", id);
// updateDoc(commentRef, { text: newComment });

// // Delete API
// // comments collection 내에서 해당 id값을 가진 doc을 찾아서 삭제
// deleteDoc(doc(dbService, "comments", id));


// 특정 버튼을 누르면 모달창이 켜지게 하기
export function modalOn() {
    const modal_on = document.getElementById("modal") // 나중에 또쓰려고 선언하는거
    modal_on.style.display = "flex"
}
// 모달창의 클로즈(x) 버튼을 누르면 모달창이 꺼지게 하기
export function modalOff() {
    const modal_close = document.getElementById("modal")
    modal_close.style.display = "none"
}
// //모달창이 켜진 상태에서 ESC 버튼을 누르면 모달창이 꺼지게 하기
// window.addEventListener("keyup", e => {
//     const modal = document.getElementById("#modal")
//     if (modal.style.display === "flex" && e.key === "Escape") {
//         modal.style.display = "none"
//     }
// })
// window.addEventListener("click", e => {
//     const evTarget = e.target
//     const modal = document.getElementById("#modal")
//     if (evTarget.classList.contains("modal-overlay")) {
//         modal.style.display = "none"
//     }
// })

