
const wrap = document.querySelector('.wrap');

//참조형 변수 : 객체., 기본형 변수:숫자,문자열,true/false,undefined,null
const todoForm = document.querySelector('.todo-form');

//querySelector : 첫번째 일치하는 요소선택(단수) vs querySelectorAll : 전체선택(복수)
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.todo-list');
const todoItem = document.querySelector('.todo-list li');

//todolist
const TODO_KEY = 'todo';

let todos = [];

//기본형 변수 : 숫자형, 문자형, 불린형, undefined, null
//참조형 변수 : 함수, 객체, 배열, dom참조형(이벤트설정가능),  
var mode = 'insert';
var editdom;
var targetId;
var targetText;

function saveTodo() {
  localStorage.setItem(TODO_KEY, JSON.stringify(todos));
  mode = 'insert';
}

function getTargetSpan(event) {
  const strong = event.target.parentElement;
  const li = strong.parentElement;
  const span = li.firstChild;
  targetId = li.id;
  console.log(targetId)

  return span;
}

function editTodo(event) {//클릭시점. : li정보 추출해서 input.text 담는 역할만.

  editdom = getTargetSpan(event);
  todoInput.value = editdom.innerText;

  //todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  mode = 'edit';
  // if()
}

function deleteTodo(event) {
  //순수 dom script. element node.
  const button = event.target.parentElement;
  const li = button.parentElement;
  const span = li.firstChild;
  console.log(button.previousSibling);
  console.log(button.previousSibling.previousSibling);

  if (confirm(span.innerText + " 항목을 정말 삭제하시겠습니까?")) {

    li.remove();
    todos = todos.filter((todo) => todo.id !== parseInt(li.id));
    saveTodo();
  }
}

function paintTodo(newTodo) {//참조변수.
  if (mode == 'edit') {
    editdom.innerText = newTodo.text;
  } else {//insert
    const li = document.createElement('li');
    li.id = newTodo.id;
    const span = document.createElement('span');
    span.innerText = newTodo.text;
    const strong = document.createElement('strong');
    strong.innerHTML = '<i class="fa-solid fa-pen"></i>';
    strong.addEventListener('click', editTodo);
    const button = document.createElement('button');
    button.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    button.addEventListener('click', deleteTodo);
    const datespan = document.createElement("span");
    if (!newTodo.createDate) {
      datespan.innerText = "날짜 세팅 되기 전";
    } else {
      datespan.innerText = newTodo.createDate;
    }
    li.appendChild(span);
    li.appendChild(strong);
    li.appendChild(button);
    li.appendChild(datespan);
    todoList.appendChild(li);
  }
}

function submitTodo(event) {//엔터치는 순간(신규입력, 수정입력) 텍스트값을 얻어와야 함.
  event.preventDefault();
  const newTodo = todoInput.value;

  todoInput.value = '';

  //Date() : 
  //newTodoObj : 참조변수.
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    createDate: getCurrentTime()
  }
  //생성일
  //newTodoObj.v1 = 20;
  //const:재할당,재선언 , var:재선언,재할당가능. , let : 재할당가능
  if (mode == 'insert') {
    todos.push(newTodoObj);
  } else {
    todos.forEach(function (todo) {
      if (todo.id == targetId)
        todo.text = newTodo;
    })
    console.log(todos);
  }
  paintTodo(newTodoObj);//edit, insert
  saveTodo();
}
//a href="#" onclick="func()"
todoForm.addEventListener('submit', submitTodo);

const savedTodo = localStorage.getItem(TODO_KEY);

if (savedTodo !== null) {
  //const parseTodo = JSON.parse(savedTodo);
  //todos = parseTodo;
  todos = JSON.parse(savedTodo);//[{},{},{}]
  todos.forEach(paintTodo);
}
