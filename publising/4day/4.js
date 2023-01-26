document.addEventListener("DOMContentLoaded",function(){
    const intro = document.getElementsByClassName("intro")[0];
    //test.innerText = "테스트입니다.";
    $(".card").click(function(){
        
        var title = $(this).find("h2").text();
        var contents = $(this).find("p").text();
        intro.innerHTML = "Title : "+title +"<br>" + contents;

        //console.log('box click');
    })  
})
