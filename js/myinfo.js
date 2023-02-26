function cityFirst(val) {
  var defVal = "시/도";

  if (val == "") {
    //구현2 reset할때
    //label값(시/도) 초기값으로
    document.getElementById("city1").innerHTML = defVal;
    document.getElementById("city1").options.selectedIndex = 0;
  } else {
    //구현1
    // 매개변수 this.value 값 = val
    // val = document.getElementById("sub_1").options[idx].value;
    // var idx = document.getElementById("sub_1").selectedIndex;
    //매개변수 val이용하여 코드 간단하게 작성
    document.getElementById("city1").innerHTML = val;
  }
}
//   왜 ~~~~~~~~~~~~~~~~~~~~~ 시군구는 안들어가는지 모르겠따~~~~~~?
function citySecond(val) {
  var defVal = "시/군/구";

  if (val == "") {
    //해당값이 없을때 같은말: if(!val)
    document.getElementById("city2").innerHTML = defVal;
    document.getElementById("city2").options.selectedIndex = 0;
  } else {
    document.getElementById("city2").innerHTML = val;
  }
}

function citySecond() {
  //구현3
  if (document.getElementById("cityCounty1").value == "") {
    alert("'시/도'를 입력하세요");
    document.getElementById("cityCounty1").focus();
    return false; //return 반환하다. return false: 아무것도 반환하지 말아라. 아래 코드부터 아무것도 진행하지 말것.
  }
}

// function subChoice2() {
//   if (document.getElementById("cityCounty2").value == "") {
//     alert("'시/군/구'를 입력하세요");
//     document.getElementById("cityCounty2").focus();
//     return false;
//   }
// }
