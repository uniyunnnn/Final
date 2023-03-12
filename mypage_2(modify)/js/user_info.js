// 필수입력사항 안내창 확인 클릭 이벤트
const alertWindow = (item) =>
  ($$(".alert-window button").onclick = () => {
    $$(".alert-window").style.display = "none";
    item?.focus();
  });

$$("#upload").onclick = (e) => {
  e.preventDefault();

  console.log(
    "mountainName: ",
    document.querySelector("select[name=mountainName]").value
  );
  console.log("title: ", document.querySelector("#title").value);
  console.log("date: ", document.querySelector("#date").value);
  console.log("time: ", document.querySelector("#time").value);
  console.log("member: ", document.querySelector("#member").value);

  formCheck();
};

// 모집 글 작성 폼 검증
const formCheck = () => {
  // 문서 내 첫 번째 form
  const form = document.forms[0];

  // input names
  const mountainName = $$("select[name=mountainName]");
  const title = $$("#title");
  const date = $$("#date");
  const time = $$("#time");
  const member = $$("#member");
  const alert = () => ($$(".alert-window").style.display = "flex");

  if (form.elements.mountainName.value === "") {
    alert();
    alertWindow(mountainName);
    return false;
  } // if

  if (form.elements.title.value.length < 2) {
    alert();
    alertWindow(title);
    return false;
  } // if

  if (form.elements.date.value === "") {
    alert();
    alertWindow(date);
    return false;
  } // if

  if (form.elements.time.value === "") {
    alert();
    alertWindow(time);
    return false;
  } // if

  if (form.elements.member.value < 2 || form.elements.member.value > 45) {
    alert();
    alertWindow(member);
    return false;
  } // if

  // form value 모든 검증이 끝난 후
  // 등록 버튼 이벤트 수행
  $$("#upload").click();

  $$("#upload").onclick = () => {
    $$(".check-again .upload").style.display = "block";
  };
};
