
'use strict';


// options는 tmdb api 명세의 기본 틀에 존재하기에 필요합니다. 
const options = {
    method: 'GET',  
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODg4NzNiMWNiNDgxZjBjNjE0NTQ3MTIzM2NhNjAzNSIsInN1YiI6IjY1OGU1NDJkMTU5NTlmMzQ1YzAwMjcwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hWABdCaRlYP2t3JYO8qd7Wq9SLXqjBJHgytGI6lnLIU'
    }
};



// API는 변함이 없으므로 상수로 고정
const apiKey = config.tmdbApi;

// movieIds는  response 콘솔을 찍어서 나온 id로 함   
const movieIds = [2,5,6,8,11,13,15,17,21];

// movieIds를 반복으로 받으면서 카드를 붙여주는 과정을 반복한다.
movieIds.forEach(movieId => {
  
   

    // 영화카드를 보이게 하는  movieCardBlock 함수 정의합니다. 
    function movieCardBlock(options){
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
        
        // options는 tmdbAPI 명세에서 요구하기에 가져왔습니다. 
        fetch(url, options)
        // 응답받을 것을 .json()을 이용해서 json형식으로 변환
        .then(response => response.json()) 
        .then(response => {
         //  API서버로부터 응답받은 response 데이터를 확인하기 위해서 다음과 같이 콘솔 출력 
         // console.log(response);
    
    /***
        영화 이미지 : poster_path
        
        영화 제목 : original_title
      
        영화 내용 : overview
      
        영화 평점 : vote_average
    */

    // 해당 HTML 문서 ,index.html 의  movieListView  아이디선택자에 접근
    // .innerHTML 메서드를 이용해서 html을 붙여넣기 함 
    // 그런데 이과정이 한번이 아닌 여러번이어서 반복문을 사용함 
    document.getElementById('movieListView').innerHTML += `
     <div class="movieCard">
       <img src="https://image.tmdb.org/t/p/original${response.poster_path} " alt="movie poster" class="mvImg" id="mv__img">
    
     <div class="movieCarte">
       <p class="mvTitle"  id="mv__title">${response.original_title}</p>
       <span class="mvRate"><small id="mv__Rate">${response.vote_average}</small></span>
     </div>   

       <p class="mvParam"  id="mv__param">${response.overview}</p> 
       </div>`;
    }).catch( 
            err => console.error(err)  // 크롬 브라우저 개발자 도구 console 창에 에러 출력 
            );
    }  


    // movieCardBlock 함수를 선언합니다. 
    movieCardBlock(options);


    });





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


  






    
     


     
   


    