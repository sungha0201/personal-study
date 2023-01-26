const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", () => {
    //tag.getA 
    const visibility = nav.getAttribute("data-visible");

    if( visibility === "false" ) {
        nav.setAttribute("data-visible", true) //translateX 0으로 좌측으로 펼쳐지기.
        navToggle.setAttribute("aria-expanded", true) //햄버거를 x버튼으로 변경
    }else{
        nav.setAttribute("data-visible", false)//translateX 방향 100%로 우측방향 닫혀지기.
        navToggle.setAttribute("aria-expanded", false) // x버튼을 햄버거 버튼으로 변경.
    }
});