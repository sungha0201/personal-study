"use strict";
//use strict : 엄격한 문법 검사모드.

const openCart = document.querySelector(".navbar__cart");
const cart = document.querySelector(".cart-open");
const removeProduct = document.querySelector(".product-on-card__remove");
const mobileMenu = document.querySelector(".side-nav");
const openMobileMenu = document.querySelector(".navbar__mobile-menu");
const closeMobileMenu = document.querySelector(".side-nav__close");
const overlay = document.querySelector(".overlay");

const mainThumbnails = document.querySelectorAll(".thumbnail-container__img");//배열로 리턴.
const slidingButtons = document.querySelectorAll("[data-slide]"); // 선택자 : 태그, 클래스, 아이디, 속성 [name='babo']
const increaseQuantity = document.querySelector(".quantity__increase");
const decreaseQuantity = document.querySelector(".quantity__decrease");
const quantity = document.querySelector(".quantity__amount");
const quantityBubble = document.querySelector(".quantity-bubble");//<span class="quantity-bubble" data-amount="0">0</span> 뱃지
const cartEmptyText = document.querySelector(".cart-open__empty");
const cartNotEmptyText = document.querySelector(".product-on-cart");
const addToCartBtn = document.querySelector(".addBtn");
const deleteFromCartBtn = document.querySelector(".product-on-cart__remove");
const quantityOnCart = document.querySelector(".product-on-cart__quantity"); //<span class="product-on-cart__quantity"></span>
const totalPrice = document.querySelector(".product-on-cart__total-amount");//<span class="product-on-cart__total-amount"></span>
const openLightbox = document.querySelectorAll(".img-slider__container-image");
const closeLightbox = document.querySelector(".lightbox-container__close");
const lightbox = document.querySelector(".lightbox-container");

const lightboxThumbnails = document.querySelectorAll(
  ".lightbox-container__thumbnails-img"
);


openCart.addEventListener("click", (e) => { //장바구니 팝업.
  cart.classList.toggle("active");
});

function handleMobileMenu() {
  openMobileMenu.addEventListener("click", (e) => { //햄버거 버튼.
    //jquery 문법 $("선택자").css(),addClass(),toggleClass,child,parent() + dom script 문법 (순수javascript 다루는 태그)
    mobileMenu.classList.add("open"); //$(".side-nav").addClass("open")
    overlay.classList.add("active");
  });
  closeMobileMenu.addEventListener("click", (e) => {// 햄버거 닫기.
    mobileMenu.classList.remove("open");
    overlay.classList.remove("active");
  });
}
handleMobileMenu();

let quantityValue = 0;

function handleQuantities() {
  quantityBubble.textContent = quantityBubble.dataset.amount;
  quantityOnCart.textContent = quantityBubble.dataset.amount;
  totalPrice.textContent = "$" + 125 * quantityBubble.dataset.amount + ".00"; //$875.00
}

increaseQuantity.addEventListener("click", (e) => { //+ 버튼
  //dom script 태그.textContent
  quantity.textContent = quantityValue + 1; //quantity = span 태그. 
  quantityValue++;//1 증가
  quantityBubble.dataset.amount++;//data-amount, data-* html5 

  //dataset = {"속성명":"속성값","속성명":"속성값"}
  //<span class="quantity-bubble" data-amount="5" data-abc="10" data-aaa="100" style="display: block;">5</span>
  //quantityBubble.dataset.amount, 
  //dataset = {"amount":"5","abc":"10","aaa":"100"}
  //$(".quantity-bubble").data("amount")

  handleQuantities();
});

decreaseQuantity.addEventListener("click", (e) => { //- 버튼
  if (quantityValue <= 0) {
    return;
  } else {
    quantity.textContent = quantityValue - 1;
    quantityValue--;
    quantityBubble.dataset.amount--; // quantityBubble.dataset['amount']
    handleQuantities();
  }
});

addToCartBtn.addEventListener("click", (e) => {
  quantityBubble.style.display = "block"; //뱃지 이미지 등장.
  cartNotEmptyText.classList.remove("hidden");
  cartEmptyText.classList.add("hidden");
});

deleteFromCartBtn.addEventListener("click", (e) => {
  cartNotEmptyText.classList.add("hidden");
  cartEmptyText.classList.remove("hidden");
  quantityBubble.textContent = 0;
});

openLightbox.forEach((img) => {
  img.addEventListener("click", (e) => {
    lightbox.classList.remove("hidden");
    overlay.classList.add("active");
  });
});

closeLightbox.addEventListener("click", (e) => {
  lightbox.classList.add("hidden");
  overlay.classList.remove("active");
});

function handleImageSliding(container) {
  slidingButtons.forEach((btn) => {//왼쪽, 오른쪽 버튼.
    btn.addEventListener("click", (e) => {
      // === vs == 
      // === 값과 타입을 동시 비교.  "1" === 1 false
      // == 값만 비교. "1" == 1 => true.
      // undefined null 
      // var a ; //undefined 초기화. typeof(a) => undefined. 
      // var b = null ; typeof(b) => object
      // a == b : true. 
      // a === b : false.  
      // "right" === "right"
      const direction = btn.dataset.slide === "right" ? 1 : -1;
      const images = document.querySelector(`${container}`);//`${변수명}` <- 백틱문자. "abc" + 123 => "abc123"
      //var name = "장형석";
      //console.log(`내 이름은 : ${name} 입니다.`)
      const activeSlide = images.querySelector("[data-active]");
      console.log(activeSlide);
      //[<img src="./images/image-product-1.jpg" alt="sneakers" class="img-slider__container-image img">, <img src="./images/image-product-1.jpg" alt="sneakers" class="img-slider__container-image img">,
    //<img src="./images/image-product-3.jpg" alt="sneakers" class="img-slider__container-image img">,<img src="./images/image-product-3.jpg" alt="sneakers" class="img-slider__container-image img">]

    // var arr1 = [1,2,3];
    //var arr2 = [1,2,3,4,5].indexOf(4);
    //images.children
      let index = [...images.children].indexOf(activeSlide) + direction;//3+1 = 4
      if (index < 0) index = images.children.length - 1;
      if (index >= images.children.length) index = 0;
      //index=0
      images.children[index].dataset.active = true;////[<img src="./images/image-product-1.jpg" alt="sneakers" class="img-slider__container-image img" data-active="true">
      delete activeSlide.dataset.active;
    });
  });
}

handleImageSliding(".image-container");
handleImageSliding(".lightbox-container__images");

function handleThumbnails(e) {
  const images = document.querySelector(".img-slider__container");
  const activeSlide = images.querySelector("[data-active]");//이미지중에 data-active속성을 가지고 있던 애를 선택.
  //e.target 클릭된 태그의 원산지.
  let index = e.target.dataset.index;//2
  delete activeSlide.dataset.active;
  images.children[index].dataset.active = true;//data-active = true


  const lightboxImages = document.querySelector(".lightbox-container__images");
  const activeLightboxSlide = lightboxImages.querySelector("[data-active]");
  delete activeLightboxSlide.dataset.active;//기존 거 삭제.
  lightboxImages.children[index].dataset.active = true;
}

mainThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (e) => {
    handleThumbnails(e);
  });
});

lightboxThumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", (e) => {
    handleThumbnails(e);
  });
});
