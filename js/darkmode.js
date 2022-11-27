// 화면을 껐다 키면 다시 화이트모드로 바뀔 수 있게 세션스토리지에 데이터를 저장

export const darkMode = function () {
  sessionStorage.count += 1;

  if (sessionStorage.count.length % 2 == 1) {
    const colorsMode = document.querySelectorAll(".colors_mode");
    colorsMode[0].innerText = "라이트모드";
    colorsMode[1].innerText = "라이트모드";
    const style = document.createElement("style");
    style.id = "style1";
    style.innerHTML = `
      *, i{
    color: white !important;
    border-color: rgb(198, 198, 198) !important;
  }

  .card_name span,
  .card_date span,
  .profile-menu-login a,
  .profile-menu-logout a,
  .modal-window,
  .close-area {
    color:white !important;
  }

  body{
    background-color: rgb(15, 15, 18) !important;
  }
  .container,
  .contents_search_input,
  .whatitname_right .cursor,
  .profile-menu-login a,
  .profile-menu-logout a,
  .profile-menu-login p,
  .profile-menu-logout p,
  input,
  textarea,
  .modal-window,
  .close-area,
  button {
    background-color: rgb(15, 15, 18) !important;

  }
  .profile-menu-login a,
  .profile-menu-logout a,
  .profile-menu-login p,
  .profile-menu-logout p {
  filter: drop-shadow(rgba(255, 255, 255, 0.174) 0px 0px 8px) !important;
  }

  #profileEmail {
    background-color: black !important;
  }

  .myPage-save input:hover,
  .cursor:hover,
  .submit:hover,
  .btn:hover {
    background-color: white !important;
    color: black !important;
  }

  .content_card_container {
    background-color: rgb(15, 15, 18) !important;
    box-shadow: 0px 0px 0px 0px #111111;
  }

  .content_card_container:hover {
    box-shadow: 0px 0px 6px 4px #555555;
  }

  .card_content:hover {
    transition: all 0.6s;
    background-color: #222222;
  }

  `;
    document.head.appendChild(style);
  } else {
    const style1 = document.getElementById("style1");
    style1.remove();
    const colorsMode = document.querySelectorAll(".colors_mode");
    colorsMode[0].innerText = "다크모드";
    colorsMode[1].innerText = "다크모드";
  }
};
