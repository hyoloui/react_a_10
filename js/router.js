// event 초기화 + 해쉬값 설정
export const route = (event) => {
    event.preventDefault();
    console.log('event.target.hash', event.target.hash)
    window.location.hash = event.target.hash;
};

// route 할 페이지 목록
const routes = {
    "/": "/pages/home.html",
    page1: "/pages/page1.html",
    page2: "/pages/page2.html",
    404: "/pages/404.html",
};


export const handleLocation = async () => {
    let path = window.location.hash.replace("#", ""); // ""

    // "http://example.com/"가 아니라 도메인 뒤에 / 없이 "http://example.com" 으로 나오는 경우
    if (path.length == 0) {
        path = "/";
    }
    const route = routes[path] || routes[404]; // truthy 하면 route[path], falsy 하면 routes[404]

    const html = await fetch(route).then((data) => data.text());

    document.getElementById("main-page").innerHTML = html;
};
