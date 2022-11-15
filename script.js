// 변수
const bts = document.querySelectorAll('.bt1'); // 버튼 전체
const subbt = document.getElementById('subbt'); // 제출 버튼
const text = document.getElementById('text'); // input
const list = document.getElementById('list'); // ul

// 버튼 클릭하면 클릭하는 느낌나게

function handleMouseUp(event) {
  event.target.classList.add('btclick');
}

function handleMouseDown(event) {
  event.target.classList.remove('btclick');
}

// function handleCreateButton(text) {
//   completeButton.className = 'btclick bt1';
//   completeButton.innerText = text;
// } 튜터님께 줄일 수 있는 방법 물어보기

  // 제출버튼 움직임
  subbt.addEventListener('mousedown', handleMouseDown);
  subbt.addEventListener('mouseup', handleMouseUp);


// 엔터로도 리스트 추가 가능
text.addEventListener('keypress', (e) => {
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
    // button 생성 변수
    const completeButton = document.createElement('button');
    const changeButton = document.createElement('button');
    const deletButton = document.createElement('button');

    // span 생성 변수
    const createSpan = document.createElement('span');

    // 버튼에 text와 class 넣기
    completeButton.className = 'btclick bt1';
    completeButton.innerText = '완료';

    changeButton.className = 'btclick bt1';
    changeButton.innerText = '수정';

    deletButton.className = 'btclick bt1';
    deletButton.innerText = '삭제';

    createSpan.innerText = text.value;

    //  버튼 움직임
    completeButton.addEventListener('mousedown', handleMouseDown);
    completeButton.addEventListener('mouseup', handleMouseUp);

    changeButton.addEventListener('mousedown', handleMouseDown);
    changeButton.addEventListener('mouseup', handleMouseUp);

    deletButton.addEventListener('mousedown', handleMouseDown);
    deletButton.addEventListener('mouseup', handleMouseUp);

    // 추가 완료
    temp.appendChild(completeButton);
    temp.appendChild(createSpan);
    temp.appendChild(changeButton);
    temp.appendChild(deletButton);

    list.appendChild(temp);
    text.value = ''; //리스트 생성 후 input 초기화
  }
};
