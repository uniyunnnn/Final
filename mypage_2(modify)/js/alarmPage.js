const toggleList = document.querySelectorAll(".toggleSwitch");
const toggleIcon = document.querySelectorAll(".toggleIcon");

toggleList.forEach(($toggle) => {
  $toggle.onclick = () => {
    var motherNode = $toggle.parentElement;
    if(motherNode.className == $('.all')){
    } else{
    $toggle.classList.toggle('active');
    motherNode.classList.toggle('active');
    }
  }
});


var alarmSet = document.querySelector('#alarm-set');
// var alarmWrapper = document.querySelector('#alarm-wrapper');
var setButton = document.querySelector('.alarmSetpng');
setButton.onclick = function(){
  alarmSet.classList.toggle('active');
  alarmWrapper.classList.toggle('active');
  // var toggleWrapper = document.querySelector('#alarm-wrapper');
  toggleWrapper.onclick = function(){
    alarmSet.classList.toggle('active');
    // alarmWrapper.classList.toggle('active');
  }
};

$('.alarmSetpng').click(function () { 
  $('#alarm-set').animate({ opacity: '1'}, 400); 
  $('.toggleSwitch').animate({ opacity: '1'}, 400);
  $('.onOfftext').animate({ opacity: '1'}, 1200);
});



const $$ = (selector) => document.querySelector(selector);

// Header Event init
addEventListener("click", (e) => {
  // 회원 메뉴바가 열린상태에서 다른 곳을 클릭하면 메뉴바 숨기기
  if (e.target.id !== "userImg") {
    $$("#userImg").classList.remove("toggle");
    $$(".menubar").style.display = "none";
  } // if

  // 검색바에 포커스가 없을 때 입력테스트 삭제버튼 숨기기
  // 글 작성 폼에는 검색바가 없으므로 if로 null 체크
  if (e.target.id !== "search" && $$(".search-bar .cancel") != null) {
    $$(".search-bar .cancel").style.display = "none";
  } // if
});

// 회원 이미지 클릭 시 메뉴바 표시
$$("#userImg")?.addEventListener("click", () => {
  if ($$("#userImg").classList.toggle("toggle")) {
    $$(".menubar").style.display = "block";
  } else {
    $$(".menubar").style.display = "none";
  }
});

// 검색바에 포커스가 있을 때 입력테스트 삭제버튼 표시
$$("#search")?.addEventListener("click", () => {
  $$(".cancel").style.display = "block";
});