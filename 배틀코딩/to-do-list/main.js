//버튼을 누르면 .content-box에 content__item이 생긴다
//content__item안의 value는 list__input의 value로 생성

const input_btn = document.querySelector(".list__btn");
const content_list = document.querySelector(".content");
const input = document.getElementById("textBox");


const form = document.querySelector("form");
form.addEventListener("submit", addListItem);


function addListItem(event) {
  event.preventDefault();
  let value = input.value;

  if (value.trim() !== "") {
    const ul = document.querySelector(".content");
    const li = document.createElement("li");
    const btn = document.createElement("button");
    li.innerText = value;
    ul.appendChild(li);
    input.value = "";
    li.appendChild(btn);
    btn.addEventListener("click", function () {
      li.remove();
    });
  }

}