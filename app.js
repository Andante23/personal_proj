// API호출에 필요한 정보가 있는  파일 AboutApi.js
// 단테네 영화소개집 구현에 필요한 함수들이 있는 파일 function.js
import { options, topRateUrl } from "./module/AboutApi.js";
import { searchPlay, movieDayNightBackground } from "./module/function.js";

//영화 데이터 호출에서  HTML로 붙여주는  함수 loadMdbApiJSON
// 동기로 받아오다가  로딩시간이 길어져서  사람들  다 도망갑니다.
// 비동기로 받아와서  효율적이게 합시다.
async function loadMdbApiJSON() {
  // await은 then을 의미합니다.
  // async라는 키워드가 붙은 function은 promise 가 됩니다.
  const response = await fetch(topRateUrl, options);
  const topRateData = await response.json();
  const topMovieRes = topRateData.results;

  // OO목록하면 여러개일 가능성도 있기때문에 forEach라는 반복해주는 친구가 필요합니다.
  topMovieRes.forEach((topMovie) => {
    const movieListView = document.getElementById("movieListView");

    const topMovieId = topMovie.id;
    movieListView.innerHTML += `
          <div class="movieCard" id="mv__card" onclick =  window.alert(${topMovieId})>   
            <img src="https://image.tmdb.org/t/p/original${topMovie.backdrop_path}" alt="movie poster" class="mvImg" id="mv__img">
            <div class="movieCarte">
              <p class="mvTitle" id="mv__title">${topMovie.original_title}</p>
              <span class="mvRate"><small id="mv__Rate">${topMovie.vote_average}</small></span>
            </div>
            <p class="mvParam" id="mv__param">${topMovie.overview}</p>
          </div>
          `;
  });
}

// loadMdbApiJSON 실행합시다.
loadMdbApiJSON();

// 영화검색버튼에 접근하는 변수
const movieSearchButton = document.getElementById("movieSearch");
// 이벤트리스너를 이용한 검색구현
// searchPlay 함수에 대한 것은  function.js 파일에 있습니다
movieSearchButton.addEventListener("keyup", searchPlay);

movieDayNightBackground();
