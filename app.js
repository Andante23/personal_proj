const options = {
    method: 'GET',  
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODg4NzNiMWNiNDgxZjBjNjE0NTQ3MTIzM2NhNjAzNSIsInN1YiI6IjY1OGU1NDJkMTU5NTlmMzQ1YzAwMjcwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hWABdCaRlYP2t3JYO8qd7Wq9SLXqjBJHgytGI6lnLIU'
    }
};
// API는 변함이 없으므로 상수로 고정
const apiKey = config.apiKey;
// movieIds 는  일단 존재하는 이미지 로 해서 붙여줌 
  const movieIds = [2,6,8,12,20];
  movieIds.forEach(movieId => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
// API 명세에 따라  options를  fetch()의 ()에 추가함
    fetch(url, options)
        .then(response => response.json())  // 응답받을 것을 json형식으로 변환
        .then(response => {
     //  console.log(response);
    // ( 순서대로 )
    
    /***
        영화 이미지 : poster_path
        
        영화 제목 : original_title
      
        영화 내용 : overview
      
        영화 평점 : vote_average
      
        (1)  document.getElementById('movieListView')
             해당 HTML 문서 ,index.html 의  movieListView  아이디선택자에 접근
     
        (2)  .innerHTML 
             요소내에  HTML을 가져오는 메소드인데 , 여기에서는 가져와서 붙여준다. 
     
           */
    document.getElementById('movieListView').innerHTML += 
    `
<div class="movieCard">
    <img src="https://image.tmdb.org/t/p/original${response.poster_path} " alt="movie poster" class="mvImg" id="mv__img">
    
<div class="movieCarte">
    <p class="mvTitle"  id="mv__title">${response.original_title}</p>
    <span class="mvRate"><small id="mv__Rate">${response.vote_average}</small></span>
    
    
   
 </div>   

 <p class="mvParam"  id="mv__param">${response.overview}</p> 
</div>`;
        })
        // 크롬 브라우저 개발자 도구 console 창에 에러 출력 
        .catch(
            err => console.error(err)   
            );
    });


    // 사용자가 검색어를 입력하면 그에 따라 카드를 보여주는 함수 searchPlay 함수


    const searchPlay = () => {

        // 사용자로부터 입력받은 검색어 값(value)에 접근
      const searchInp = document.getElementById('movieSearch').value;
      // 모든 영화 카드
      const movieCards = document.querySelectorAll('.movieCard');
      
      movieCards.forEach(movieCard => {

         // 영화카드내의 영화 이름 저장
         const mv_Title = movieCard.querySelector('.mvTitle').innerText


        /*
          예를 들어  사용자가 검색했다고 하자  

          그리고   모든 영화카드가 있다고 하자 

          여기에서  영화카드의 영화이름에 사용자가 검색어가 포함되어있다면 
          
           display = block  (보여줘)
        */

        /**
         *  mdn 공식문서에 따르면 include메서드는  대소문자 구분 검색을 수행하며
         * 
         *  주어진 문자열이내에서 발견된다면 -> true 
         * 
         *  발견되지 않는다면 ->  false
         */

         // if문은 주어진 조건(mv_Title.includes(searchInp))이  참(true)라면
         

        if(mv_Title.includes(searchInp))
        {
            movieCard.style.display = 'block';

        }else {
            movieCard.style.display = 'none';   
      
        } 
      });
    }

     
   


    