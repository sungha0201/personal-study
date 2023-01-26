//[] : 속성선택자.div
const tabList = document.querySelector('[role="tablist"]');
//버튼 4개.
//tabs=[<button tabindex="-1" aria-selected="true" role="tab" aria-controls="moon-tab",<button aria-selected="false" role="tab" aria-controls="mars-tab" ]
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});


let tabFocus = 0;
function changeTabFocus(e) {
    console.log(e);
    const keydownLeft = 37;
    const keydownRight = 39;
    
    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        //
        tabs[tabFocus].setAttribute("tabindex", -1);
    }
    
    if (e.keyCode === keydownRight) {
        tabFocus++;
        if (tabFocus >= tabs.length) {
            tabFocus = 0;
        }
    } else if (e.keyCode === keydownLeft) {
        tabFocus--;
        if (tabFocus < 0) {
            tabFocus = tabs.length - 1;
        }
    }
    
    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
}


function changeTabPanel(e) {
    console.log(e);
    //e : 사용자 클릭 이벤트가 발생했을때 넘겨 받는 첫번째 파라미터(= 이벤트 객체 정보)

    //e.target : 이벤트가 발생한 태그(dom) , dom : 이벤트 수신 단위, 탐색 단위.
    const targetTab = e.target;//클릭된 button 태그
    const targetPanel = targetTab.getAttribute("aria-controls");//moon-tab, ..
    const targetImage = targetTab.getAttribute("data-image");//europa-image
    
    const tabContainer = targetTab.parentNode;//div 태그.
    const mainContainer = tabContainer.parentNode;//main태그
    
    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false); //이전 선택된 버튼의 true값을 false로 변환.
        
    targetTab.setAttribute("aria-selected", true);//새로 선택된 버튼 태그의 aria-selected 속성을 true로 할당.
    
    hideContent(mainContainer, '[role="tabpanel"]');
    showContent(mainContainer, `#${targetPanel}`); // `#moon-tab`
    
    hideContent(mainContainer, 'picture');//picture 태그 전체 가림처리.
    showContent(mainContainer, `#${targetImage}`);//클릭된 탭에 속성명 별이름-image picture 태그만 노출처리.
}

function hideContent(parent, content) {
    //모든 article 태그를 hidden처리, 
    parent
        .querySelectorAll(content)
        .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
    //<main>.querySelector('#moon-tab')
    parent.querySelector(content).removeAttribute('hidden');

}