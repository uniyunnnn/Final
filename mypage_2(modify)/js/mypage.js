// const mountains = [];

let imgPath; // 업로드 이미지 임시 저장 변수
let isReadyUpload = false; // 파일 업로드 가능여부

//닉네임 변경
var nickbox = document.querySelector('.nickname-box');
    var nameset = document.querySelector('.name-setting');
    nameset.onclick = function(){
        nickbox.classList.toggle('active');
    }
    var closebutton2 = document.querySelector('.closebutton2');
    closebutton2.onclick=function(){
        nickbox.className = 'nickname-box';
    }

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



// Enter키로 인한 submit 방지 이벤트
document.forms[0].addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.id !== "text") {
    e.preventDefault();
    return false;
  } // if
});

