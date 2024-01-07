// tmdbApi 명세서에 기본으로 딸려오는  options 
const options = {
    method: 'GET',  
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODg4NzNiMWNiNDgxZjBjNjE0NTQ3MTIzM2NhNjAzNSIsInN1YiI6IjY1OGU1NDJkMTU5NTlmMzQ1YzAwMjcwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hWABdCaRlYP2t3JYO8qd7Wq9SLXqjBJHgytGI6lnLIU'
    },
};

// tmdbApiKey 
let tmdbApiKey = '388873b1cb481f0c6145471233ca6035';

// 유명한 영화를 불러오는 주소
let topRateUrl =  `https://api.themoviedb.org/3/movie/top_rated?api_key=${tmdbApiKey}&language=en-US&page=1`

/**
 * 검색을 도와주는 함수 searchPlay
 */
const searchPlay = () => {
    let searchInput = document.getElementById('movieSearch').value.toLowerCase();
    const movieCards = document.querySelectorAll('.movieCard');
  
    movieCards.forEach(movieCard => {
      const mvTitle = movieCard.querySelector('.mvTitle').innerText.toLowerCase();
  
      if (mvTitle.includes(searchInput)) {
        movieCard.style.display = 'block';
      } else {
        movieCard.style.display = 'none';
      }
    });
  };


















// export 여러개 하려면 이렇게 해야됨 
export {tmdbApiKey , topRateUrl  , options}

// export default는 1개만 가능
export default searchPlay ;


