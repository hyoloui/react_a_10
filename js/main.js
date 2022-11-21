// import {authService} from './firebase.js'; // authService라는 게 export 되었으니 가져오겠다는 뜻, from이라는 문구를 통해 html을 파싱할 때 main.js를 다운로드, main.js를 js가 읽을 때 from 뒤 문구가 들어가면 그 파일을 전부 읽는다.
import { handleLocation, route } from './router.js'; // 


// hash url 변경 시 처리
window.addEventListener('hashchange', handleLocation);

// 첫 랜딩 또는 새로고침 시 처리
document.addEventListener('DOMContentLoaded', handleLocation);

// 전역 함수 리스트
window.route = route;
