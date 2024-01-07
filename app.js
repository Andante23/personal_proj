
// 검색을 도와주는 searchPlay 함수 
import searchPlay from "./module/library.js";
// API호출에 필요한 정보를 모아놓은 자바스크립트 파일 library.js
import {options,tmdbApiKey, topRateUrl} from "./module/library.js";





/**
 * 유명한 영화 데이터  불러와서 html 페이지에 카드 붙여주는  함수
 * @param {Api키 명세에 딸려오는 기본 옵션} options 
 * @param {Api키 사이트에서 준 api 키} apiKey 
 * @param {유명한 영화 데이터 불러오는데 필요한 주소 } topUrl 
 */
function topRating(options, apiKey, topUrl) {
  // 14 : 유명한 영화 데이터 json 데이터로 받아오려고 만든 fetch 
  fetch(topUrl, options)
  .then(response =>response.json())
  .then(data => {   
    const movieIds = data.results;
    // innerHTML로 HTML에  붙여줌 , 그 과정을 반복
    // 영화 목록이 1 , 2 개 하고 장땡일리 없고 여러개임 
    // 그리고 movieIds는 찍어보면 배열이라서 forEach 가능     
      movieIds.forEach(movieId=>{
        // 이 url은 특정영화 정보를 받게 해줌 
        const url = `https://api.themoviedb.org/3/movie/${movieId.id}?api_key=${apiKey}&language=en-US&page=1`;
        fetch(url, options)
        .then(response => response.json())
        .then(response => {
            const movieListView = document.getElementById('movieListView');
            movieListView.innerHTML += `
              <div class="movieCard" id="mv__card" onclick =  window.alert(${response.id})  >
                <img src="https://image.tmdb.org/t/p/original${response.backdrop_path}" alt="movie poster" class="mvImg" id="mv__img">
                <div class="movieCarte">
                  <p class="mvTitle" id="mv__title">${response.original_title}</p>
                  <span class="mvRate"><small id="mv__Rate">${response.vote_average}</small></span>
                </div>
                <p class="mvParam" id="mv__param">${response.overview}</p>
              </div>`;    
          }).catch(err => console.error(err));
          // 36: 만약에 response. 이거해서 데이터 불러오는데 실패하면 에러를 던집니다.
          
      }); // 39 : foreach문 종료 
    }).catch(err => console.error(err)); // 36번째와 똑같이 에러를 던집니다. 

}

// 12번째 줄에 정의한 topRating 실행합시다.
topRating(options, tmdbApiKey, topRateUrl);

/*
 *  참고: searchPlay함수를 library.js에 추가했습니다. 
 *
 *  상황:
 *       - 사용자가 임외의 검색어를 검색했다합시다.
 *       - 그 검색어(searchInput)와  영화 제목인  mvTitle을 비교합니다.  
 *  
 *  존재한다면  보여줍시다. (block)
 *  존재하지않다면 보여주지 맙시다.(none) 
 */
document.getElementById('searchBtn').addEventListener('click', searchPlay);





























  






    
     


     
   


    