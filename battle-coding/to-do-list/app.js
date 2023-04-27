const todoForm = document.querySelector(".todo-form");
const todoInput = todoForm.querySelector("input");
const todoList = document.querySelector(".todo-list");


//list생성
function formSubmit(e) {
  e.preventDefault();
  let inputVal = todoInput.value;
  let newLi = document.createElement("li");
  let liTextWrap = document.createElement("span");
  todoList.appendChild(newLi);
  newLi.appendChild(liTextWrap);
  liTextWrap.classList.add("text-wrap");
  liTextWrap.innerText = inputVal;

  const newDeleteBtn = document.createElement('span');
  newDeleteBtn.classList.add("delete-btn");
  newDeleteBtn.innerHTML = '<i class="fas fa-solid fa-trash"></i>';

  const newFixBtn = document.createElement('span');
  newFixBtn.innerHTML = '<i class="fix"></i>';

  newLi.appendChild(newDeleteBtn);
  newLi.appendChild(newFixBtn);
  todoInput.value = "";

  newDeleteBtn.addEventListener("click", deleteList);
  newFixBtn.addEventListener("click", fixList);
}

//list 수정
function fixList(e) {
  let listItem = e.target.parentElement.parentElement;
  let newInput = document.createElement('input');
  let liTextWrap = listItem.querySelector(".text-wrap");
  let newDeleteBtn = listItem.querySelector(".delete-btn");

  targetText = listItem.innerText;
  liTextWrap.innerText = "";
  newInput.value = targetText;
  listItem.insertBefore(newInput, newDeleteBtn);

  newInput.addEventListener("change", function () {
    liTextWrap.innerText = this.value;
    newInput.remove();
  });
}

//list 삭제
function deleteList(e) {
  let targetParent = e.target.parentElement.parentElement;
  targetParent.remove();
}

todoForm.addEventListener("submit", formSubmit);
