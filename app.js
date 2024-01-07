import searchPlay from "./module/library.js";
import {options,tmdbApiKey, topRateUrl} from "./module/library.js";


function topRating(options, apiKey, topUrl) {
  fetch(topUrl, options)
    .then(response => response.json())
    .then(data => {
      const movieIds = data.results;
      
      movieIds.forEach(movieId => {
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
          })
          .catch(err => console.error(err));
      });
    })
    .catch(err => console.error(err));
}



topRating(options, tmdbApiKey, topRateUrl);
document.getElementById('searchBtn').addEventListener('click', searchPlay);
















  






    
     


     
   


    