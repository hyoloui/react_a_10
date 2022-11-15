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
  
bts.forEach((bt) => {
  bt.addEventListener('mousedown', handleMouseDown);
});

bts.forEach((bt) => {
  bt.addEventListener('mouseup', handleMouseUp);
});

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
    const temp = document.createElement('li');
    const completeButton = document.createElement('button');
    completeButton.className = 'btclick bt1';
    completeButton.innerText = '완료';
  
    completeButton.addEventListener('mousedown', handleMouseDown);
    completeButton.addEventListener('mouseup', handleMouseUp);
  

    temp.appendChild(completeButton);

  //   temp.innerHTML = `
  // <button class="btclick bt1">완료</button>
  // <span>${text.value}</span>
  // <button class="btclick bt1">수정</button>
  // <button class="btclick bt1">삭제</button>
  // `;
    list.appendChild(temp);
    text.value = '';
  }
};
