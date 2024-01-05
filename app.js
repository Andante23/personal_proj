

// options는 tmdb api 명세의 기본 틀에 존재하기에 필요합니다. 
const options = {
    method: 'GET',  
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODg4NzNiMWNiNDgxZjBjNjE0NTQ3MTIzM2NhNjAzNSIsInN1YiI6IjY1OGU1NDJkMTU5NTlmMzQ1YzAwMjcwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hWABdCaRlYP2t3JYO8qd7Wq9SLXqjBJHgytGI6lnLIU'
    }
};

 
// 데이터가 너 저분한것 같아서 객체로 정리하였습니다.
  const AboutTmdb = {
    // api키
    apiKey : config.tmdbApi,
    // 유명한 영화 데이터를 불러오는 URL
    topRateUrl : `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=1`

   
  }


// 객체 그대로 갔다하는것은 하드코딩의 우려가 있어서 변수를 선언하였습니다.
 const tmdbApiKey = AboutTmdb.apiKey;
 const toprateUrl = AboutTmdb.topRateUrl;

 
/**
 * 이 함수 실행하면  top rated된 영화가 나오는 것을  아실수 있습니다. 
 * @param {tmdb API 명세에 있었던 options} options 
 * @param {tmdb API에서 발급해주었던 APIkey} param
 * @param {요구명세서에서 요구했던 URL } TopUrl 
 */
function topRating(options,param,TopUrl) {
  // fetch를 통해서 top_rated와 관련된 데이터를 받아옵시다. 
// TopUrl없으면   top_rated 영화 데이터 가져오다 fetch가 에러호출합니다.
fetch(TopUrl, options)
.then(response => response.json())
.then(data => {     // data에 파싱한 json 데이터를 저장합시다.

    // movieIds에  top_rated된 데이터중에 결과셋을 저장합시다.
    const movieIds = data.results;


    // console.log(data.results);  json 형식으로 변환된 top_rated 데이터를 콘솔에  퉤하고 뺃어줍니다. 배열이더라고여  
    // console.log(typeof(movieIds));  자료형이 object입니다.  참고로  array입니다. 
    
    //  배열이기에 forEach가 가능한 것입니다. 
    //   html에  카드를 붙이는 과정을  forEach를 통해서 반복한다. 라는 과정입니다.
    // 영화목록을 보여주는데  1,2개보여주고 장땡이 아니지 않습니까 
    
    

      movieIds.forEach(movieId => {
      
        //  console.log(movieId); : movieIds의 요소를 movieId라하는데  잘 나왔는지 확인하는 것입니다. 
        // 퉤 뱃어진 movieId를 자세히 보시면 아이디에 접근이 가능한 번호가 있습니다. 그것을  movieId.id라 합시다. 
        // 다음 url은 특정 영화(movie)에 대한 정보를 밷어주는 url입니다. 이것을 이용해서  top_rated영화에 대한 정보를 불러옵시다.
        const url = `https://api.themoviedb.org/3/movie/${movieId.id}?api_key=${param}&language=en-US&page=1`;

        fetch(url, options)
            .then(response => response.json())
            .then(response => {
               // console.log(response); : 제대로 봤아왔는지 확인하는 것입니다. 
                const movieListView = document.getElementById('movieListView');
                movieListView.innerHTML += `
                    <div class="movieCard">
                        <img src="https://image.tmdb.org/t/p/original${response.backdrop_path}" alt="movie poster" class="mvImg" id="mv__img">
                        <div class="movieCarte">
                            <p class="mvTitle" id="mv__title">${response.original_title}</p>
                            <span class="mvRate"><small id="mv__Rate">${response.vote_average}</small></span>
                        </div>
                        <p class="mvParam" id="mv__param">${response.overview}</p> 
                    </div>`;
            })
            // 내부 fetch에서 rated 영화 데이터를 못 가져오면 에러를  밷습니다. 
            .catch(err => console.error(err));
    });




   
  
})


// 또한 외부 fetch에서 rated 데이터를 못 가져오면 에러를  밷습니다. 
.catch(err => console.error(err));
}

// topRating 함수 선언 
topRating(options,tmdbApiKey,toprateUrl);


// 사용자가 검색어를 입력하면 그에 따라 카드를 보여주는 함수 searchPlay 함수
const searchPlay = () => {
  
  // 사용자의 가상입력어를 저장하는 변수인 searchInput에  
  //검색창에서 검색어가 보이는 부분인 movieSearch value를 할당합시다.
  const searchInput = document.getElementById('movieSearch').value.toLowerCase(); 

 
  // movieCard 전체를 가져왔습니다.
  const movieCards = document.querySelectorAll('.movieCard');



  // typeof을 이용해서  movieCards가 객체이니 foreach문을 이용해서 반복합시다. 
  movieCards.forEach(movieCard => {
   
      // 이것은 각각 카드들의 무비 이름을 가져오는 코드입니다.
      const mv_Title = movieCard.querySelector('.mvTitle').innerText.toLowerCase();

      
      // mdn사에서 정리해놓은 문자열 메서드인 include를 이용합시다. 
    

      /*
         mv_Title(영화제목) 에서 가상의 사용자가 검색한 searchInput을 찾으면  -> 영화카드가 표시되게 해주세요(block)
         그것이 아니면 ->  영화카드를 표시하지 말하주세요(none)
      */

      // 추가적으로 mv_Title의 인풋 값과 searchInput 인풋값이 동일하기에  비교하기에 쉬움 
      if(mv_Title.includes(searchInput))
       {
          movieCard.style.display = 'block'
       }else{
          movieCard.style.display = 'none';
       }
    
    
         
  });
};

// searchBtn을 클릭하면  searchPlay함수를 동작시켜주세요 
document.getElementById('searchBtn').addEventListener('click',searchPlay);




  






    
     


     
   


    