document.addEventListener("DOMContentLoaded",() =>{
    const burgerMenu = document.getElementById('burgerMenu')
    const headerMenu = document.getElementById('headerMenu')
    const bodyOverlay = document.querySelector('body') //.classname

    //querySelector vs querySelectorAll
    //querySelector
    const headerDropdown = document.querySelectorAll('.headerDropdownLink')

    //e = burgerMenu, e.target.src = <img src="images/icon-menu.svg -> images/icon-close-menu.svg" alt="menu" class="burger-menu__img">
    burgerMenu.addEventListener('click', (e) => {
        if (e.target.src) { //if (images/icon-menu.svg)
            //js 3항연산자 변수 = 조건식 ? 연산1 : 연산2
            e.target.src = e.target.src.includes("images/icon-close-menu.svg") ? "images/icon-menu.svg" : "images/icon-close-menu.svg"
            
            //toggle('classname') headerMenu 태그에 class='visible'
            headerMenu.classList.toggle('visible')
            //$("#header").toggleClass("visible");
            
            bodyOverlay.classList.toggle('overlay') //
        }
    })
    //headerDropdown = [<a class="headerDropdownLink active" data-dropdownTo="dropdownFeatures">Features</a>, <a class="headerDropdownLink" data-dropdownTo="dropdownCompany">Company</a>]
    //
    headerDropdown.forEach((item) => {
        item.addEventListener('click', (e) => {
            //e : 사용자 액션 정보객체, 이벤트버블링(상위의 태그로 전달되는 속성), 이벤트 캡쳐링(하위의 태그로 전달되는 속성)
            console.log(e);
            //console.log(e.target)
            //e.target : 이벤트 발생한 대상(태그)
            dropDownId = e.target.getAttribute('data-dropdownTo') //dropdownFeatures
            //().classList ().getAttribute
            e.target.classList.toggle('active') //toggle : 없으면 추가, 있으면 제거.
            document.getElementById(dropDownId).classList.toggle('visible') 
    })
    })

    document.querySelector(".header__list-item").addEventListener("click",(e)=>{
        //console.log('li에 클릭 이벤트 발생');
    })
});
