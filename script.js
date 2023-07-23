const apiKey = 'bdfdb574';
const moviesPerPage = 10;
let currentPage = 1;
let totalResults = 0;
let currentMovieID = null;


function loadInitialMovies() {
    const initialQuery = 'marvel';
    fetchMovies(initialQuery, 1); // Fetch the first page of initial movies
}

// Call the initializeApp function when the DOM is ready
document.addEventListener('DOMContentLoaded', loadInitialMovies);

// Function that will fetch movies from OMDB Api with arguments as query and page
function fetchMovies(query, page) {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}&page=${page}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.Response === 'True') {
                console.log(data)
                totalResults = parseInt(data.totalResults);
                displayMovies(data.Search, page);
            } else {
                console.log('No results found.');
            }
        })
        .catch(err => {
            console.error('Error fetching data from OMDB API:', err);
        });


}


// Function to display 10 movies that are fetched
function displayMovies(movies, page) {
    const movieListElement = document.getElementById('movieList');
    movieListElement.innerHTML = '';
    const movieDetailsElement = document.getElementById('movieDetails');
    movieDetailsElement.innerHTML = '';
    const pageNumber = document.getElementById('pagenumber');
    pageNumber.textContent = page;

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
      <img class="movie-poster" src="${movie.Poster}" alt="${movie.Title}">
      <div class="movie-title">${movie.Title}</div>
      <div class="movie-year">${movie.Year}</div>
    `;
        movieItem.addEventListener('click', function () {
            currentMovieID = movie.imdbID;
            console.log(currentMovieID)
            displayMovieDetails(currentMovieID);
        });
        movieListElement.appendChild(movieItem);
    });
}

// Fuction to search query input from the user
function searchMovies() {
    const query = document.getElementById('searchInput').value;
    if (query !== '') {
        fetchMovies(query, 1);
    }
}

// Function to display movie details of a selected movie by the user
function displayMovieDetails(movieID) {
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${movieID}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const movieDetailsElement = document.getElementById('movieDetails');
            movieDetailsElement.innerHTML = `
        <div class="movie-detail-heading">
            <h2>${data.Title}</h2>
        <img src="${data.Poster}" alt="${data.Title}" class="movie-poster">
        </div>
        <div class="movie-detail-detail">
        <p><strong>Runtime:</strong> ${data.Runtime}</p>
        <p><strong>Release Date:</strong> ${data.Released}</p>
        <p><strong>Genre:</strong> ${data.Genre}</p>
        <p><strong>Rated:</strong> ${data.Rated}</p>
        <p><strong>Rating:</strong> ${data.imdbRating}</p>
        <p><strong>Cast:</strong> ${data.Actors}</p>
        <p><strong>Plot:</strong> ${data.Plot}</p>
        </div>
      `;

        })
        .catch(err => {
            console.error('Error fetching movie details from OMDB API:', err);
        });

}

// Pagination Function for displaying next page by fetching the api
function nextPage() {
    const movieDetailsElement = document.getElementById('movieDetails');
    movieDetailsElement.innerHTML = '';
    const query = document.getElementById('searchInput').value;
    if ((currentPage + 1) * 10 <= totalResults) {
        currentPage++;
        fetchMovies(query, currentPage);
    }
}

// Pagination Function for displaying previous page by fetching the api
function prevPage() {
    const movieDetailsElement = document.getElementById('movieDetails');
    movieDetailsElement.innerHTML = '';

    const query = document.getElementById('searchInput').value;
    if (currentPage > 1) {
        currentPage--;
        fetchMovies(query, currentPage);
    }
}

function rateMovie(stars) {

}

function addComment(comment) {

}
