/**
 *  검색을 도와주는 함수 searchPlay
 * */
const searchPlay = () => {
  // 사용자에게 입력받은 검색어
  const searchInput = document
    .getElementById("movieSearch")
    .value.toLowerCase();
  // 전체 영화카드를 담은 집합
  const movieCards = document.querySelectorAll(".movieCard");

  // 검색결과가 참인지 거짓인지 결정짓는 변수
  // 아직 검색로직 진입전이기에 false값
  let movieSearchResult = false;

  movieCards.forEach((movieCard) => {
    // 영화 제목
    const mvTitle = movieCard.querySelector(".mvTitle").innerText.toLowerCase();

    //  영화제목에 영화검색어가 포함되어있다면
    if (mvTitle.includes(searchInput)) {
      //  영화카드가 보여진다.
      movieCard.style.display = "block";
      // 검색결과가 참이기에 true 반환
      movieSearchResult = true;
    } else {
      //  영화검색어가 포함되어 있지 않다면

      // 영화카드가 사라진다.
      movieCard.style.display = "none";
    }
  });

  // 검색결과가 없을시 진행하는 로직
  if (!movieSearchResult) {
    const movieListView = document.getElementById("movieListView");
    movieListView.style.border = "none";
    movieListView.innerHTML = `
  <div class= "searchResultView">
    <p class = "searchResult">
        <b class = "searchData">"${searchInput}"</b>에 맞는 검색어가 없습니다.<br>
       1초 뒤에 페이지가 재로딩 됩니다.
     </p>
  </div> `;

    // 그러니까 검색어가 없잖음
    // 1초 뒤에 페이지 재로딩해주삼
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }
};

/**
 * 낮밤 배경바뀌는 함수.
 * searchPlay함수의 스타일 일부 유용하게 씀
 */
const movieDayNightBackground = () => {
  const dayNightButton = document.getElementById("movieDayNightButton");
  const movieBodyGround = document.body;

  let isNight = false;
  dayNightButton.addEventListener("click", () => {
    if (dayNightButton.value === "밤") {
      movieBodyGround.style.backgroundColor = "black";
      movieBodyGround.style.color = "white";
      dayNightButton.value = "낮";
      isNight = true;
    } else {
      movieBodyGround.style.backgroundColor = "white";
      movieBodyGround.style.color = "black";
      dayNightButton.value = "밤";
    }
  });
};

export { searchPlay };
export { movieDayNightBackground };
