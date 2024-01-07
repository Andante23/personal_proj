const options = {
    method: 'GET',  
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODg4NzNiMWNiNDgxZjBjNjE0NTQ3MTIzM2NhNjAzNSIsInN1YiI6IjY1OGU1NDJkMTU5NTlmMzQ1YzAwMjcwNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hWABdCaRlYP2t3JYO8qd7Wq9SLXqjBJHgytGI6lnLIU'
    },
};

let tmdbApiKey = '388873b1cb481f0c6145471233ca6035';
let topRateUrl =  `https://api.themoviedb.org/3/movie/top_rated?api_key=${tmdbApiKey}&language=en-US&page=1`

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


export {tmdbApiKey , topRateUrl  , options}




export default searchPlay ;


