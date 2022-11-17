// 변수
const bts = document.querySelectorAll('.bt1'); // 버튼 전체
const subbt = document.getElementById('subbt'); // 제출 버튼
const text = document.getElementById('text'); // input
const list = document.getElementById('list'); // ul
const doneList = document.getElementById('donelist'); // 완료리스트
const cpbt = document.getElementsByClassName('cpbt'); // 완료버튼

// 엔터로도 리스트 추가 가능
text.addEventListener('keypress', (e) => { // e <- 이벤트를 발생 시 콜백하뭇에서 e를 쓸 수 있음. 정의를 안해도..
  if (e.key === 'Enter') {
    addTodo();
  }
});

// 제출 버튼 클릭하면 리스트 추가
// 입력값이 없으면 알림창 뜸
const addTodo = () => {
  if (text.value == '') {
    alert('할 일을 입력해주세요.');
  } else {
    // li 생성 변수
    const temp = document.createElement('li');

      temp.innerHTML = `
    <button class='cpbt' onClick='doneTodo(event)'>완료</button>
    <span>${text.value}</span>
    <button class='chbt'>수정</button>
    <button class='delbt'>삭제</button>
    `;

    list.appendChild(temp);
    text.value = ''; //리스트 생성 후 input 초기화
  }
};


// 완료버튼 클릭하면 완료된 목록으로 이동
function doneTodo(event) {
  const endTodo = event.target.parentNode;
  // doneTodo -> 클릭했을 때 동작, 이벤트 발생하는 곳은 완료버튼.
  // donelist에 완료 -> 해제라는 버튼이름으로 변경
  endTodo.querySelector('.cpbt').innerText = '해제'
  doneList.appendChild(endTodo);
  // id donelist에 자식요소로 추가한다. (무엇을)
  // event가 일어난 target의 부모요소에. 
  // 여기서 event.target은 cpbt이므로 cpbt의 부모인 li를 뜻한다.

}


