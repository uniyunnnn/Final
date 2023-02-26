// const mountains = [];

let imgPath; // 업로드 이미지 임시 저장 변수
let isReadyUpload = false; // 파일 업로드 가능여부

// // 취소 버튼 이벤트
// $$("#cancle").addEventListener("click", () => {
//   $$(".check-again .unload").style.display = "block";
// });

// 이미지 추가 버튼 클릭 이벤트
$$(".profile-image-button").addEventListener("click", () => {
  $$(".drag-and-drop").innerHTML = `
  <div class="picture"></div>
  <p>
    여기로 이미지를 드래그하거나<br />
    파일을 업로드 하세요.
    (최대 20MB)
  </p>`;
  $$(".add-profile-image").style.display = "block";
});

// 이미지 추가 취소 버튼 클릭 이벤트
$$(".add-profile-image .cancel").addEventListener("click", () => {
  $$(".add-profile-image").style.display = "none";
});

const getTextFile = () => {
  const input = document.createElement("input");

  input.type = "file";
  input.accept = ".jpg, .jpeg, .png";

  input.onchange = (event) => {
    // 업로드 파일 용량 체크
    if (isFileMaxSize(event.target.files)) {
      return false;
    } // if

    // 파일형식 체크
    if (isRightFile(event.target.files)) {
      return false;
    } // if

    // 위 조건을 모두 통과할 경우
    isReadyUpload = true;
    processFile(event.target.files[0]);
  };

  input.click();
};

const processFile = (file) => {
  const reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = function () {
    $$(".drag-and-drop").innerHTML = `<p>${file.name}</p>`;

    imgPath = `<img name="ImagePath" src="${reader.result}" value="${reader.result}" alt="프로필 이미지"></img>
    <input type="hidden" name="imagePath" id="imagePath" value="${reader.result}">`;
  };
};

// 업로드 파일 용량 체크
const isFileMaxSize = (files) => {
  if (files[0].size > 20971520) {
    $$(".drag-and-drop").innerHTML = `
    <p>최대 업로드 용량은 20MB입니다.<br>
    현재 파일의 용량은 ${Math.floor((files[0].size / 1048576) * 10) / 10}입니다.
    </p>`;

    isReadyUpload = false;
    return true;
  } // if
};

// 파일형식 체크
const isRightFile = (files) => {
  if (
    files[0].type !== "image/jpeg" &&
    files[0].type !== "image/png" &&
    files[0].type !== "image/jpg"
  ) {
    $$(".drag-and-drop").innerHTML = `
    <p>업로드 가능한 파일 형식은<br>
    .jpg, .jpeg, .png입니다.
    </p>`;

    isReadyUpload = false;
    return true;
  } // if
};

// 드래그 앤 드롭 이벤트
// 업로드 최대 용량: 20,971,520byte(20MB)
$$(".drag-and-drop").ondrop = (e) => {
  e.preventDefault();

  const files = [...e.dataTransfer?.files];

  // 업로드 파일 용량 체크
  if (isFileMaxSize(files)) {
    return false;
  } // if

  // 파일형식 체크
  if (isRightFile(files)) {
    return false;
  } // if

  // 위 조건을 모두 통과할 경우
  isReadyUpload = true;

  $$(".drag-and-drop").innerHTML = `<p>${files[0].name}</p>`;

  handleUpdate([...files]);
};

// 드래그 앤 드롭 한 이미지를 imgPath에 담기
const handleUpdate = (files) => {
  $$(".drag-and-drop").innerHTML = `<p>${files[0].name}</p>`;

  files.forEach((file) => {
    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
      imgPath = `<img name="ImagePath" src="${e.target.result}" value="${e.target.result}" alt="모집 글 작성 폼 이미지"></img>
      <input type="hidden" name="imagePath" id="imagePath" value="${e.target.result}">`;
    });

    reader.readAsDataURL(file);
  });
};

// 작성 중 취소 -> 예(Red Button)이벤트
$$(".unload input[type=reset]").onclick = () => {
  const elem = $$(".profile-image");

  while (elem.firstChild) {
    elem.removeChild(elem.firstChild);
  } // while
};

// 드래그 앤 드롭으로 파일 업로드 하기 위한 기본 이벤트 방지
$$(".drag-and-drop").ondragover = (e) => e.preventDefault();
$$(".drag-and-drop").ondragleave = (e) => e.preventDefault();

// 변경 버튼 클릭 이벤트
$$(".drag-and-drop + button").onclick = (e) => {
  if (imgPath === undefined || !isReadyUpload) {
    return false;
  }
  $$(".add-profile-image").style.display = "none";
  $$(".profile-image").innerHTML = imgPath ?? "";
};

// 드래그 앤 드롭 대신 클릭으로 업로드 할 때
$$(".drag-and-drop").onclick = () => getTextFile();

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

// Enter키로 인한 submit 방지 이벤트
document.forms[0].addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.id !== "text") {
    e.preventDefault();
    return false;
  } // if
});
