
//센서 : domcontentloaded라는 이벤트(액션, 변화발생) => 두번째 인자를 수행해라.
document.addEventListener("DOMContentLoaded",()=>{
    //document.getElementById(), document.querySelector('.box), document.getElementsByTagName("div")

    //const : 재할당 불가., let : 재할당 가능.

    //box는 div class='box' 참조변수.
    const box = document.querySelector('.box');
    //두번째 div 참조변수. 단일선택. 현재 태그중에 최상위에 있는 것 선택.
    const box1 = document.querySelector('.box1');
  
    //let : {}block scoup vs var : block scope의 영향을 받지 않는다.
    
    //.circle이 지정된 모든 태그 선택. 복수 선택.
    const ratings = document.querySelectorAll('.circle')
    const btn = document.querySelector('.btn_submit'); // 복합선택자. .classname tagnme
    let selectedRating;//undefined.
    const spanRating = document.querySelector(".rating");

    //forEach ratings= [ <button class="circle"> 1 </button>, <button class="circle"> 2 </button>, <button class="circle"> 3 </button>
    // <button class="circle"> 4 </button>, <button class="circle"> 5</button>]
    ratings.forEach((item, i) => {
        item.addEventListener("click", (event) => {
            //handle click
            ratings.forEach((item) => {
                //무조건 5개 초기화.
                item.classList.remove("orange-background");//
                //removeClass, toggleClass, switchClass 
            });
        
            item.classList.add("orange-background");
            //$(item).addClass("orange-background")
            console.log(item.innerText);
            selectedRating = item.innerText; //1~5 (true)
        });
    });

    btn.addEventListener('click', () => {
        //if(조건식)=>true, false로 변환되어서 판단함.
        //if(a>10) , selectedRating : 변수값 자체에 대한 true/false.
        //selectedRating = "",'',``=>false , selectedRating = 10(true), selectedRating= 0(false), selectedRating = false, let selectedRating(undefined = false); //
        //숫자 : 0(false), 0을 제외한 모든 숫자 true
        console.log(selectedRating);
        if(!selectedRating){//true
            alert("숫자를 선택해주세요.")
        }
        else {
            box.classList.add("hide");

            box1.classList.add("show");//box1 class=show

            spanRating.innerText = selectedRating
        }
    })

})
