const API_KEY = 'ca44eca0';
const BASE_URL = 'https://www.omdbapi.com/';

function getMovies() {
    const searchInput = document.getElementById('searchInput');

    const movieContainer = document.getElementById('movieContainer');

    searchInput.addEventListener('input', debounce(searchMovies, 500)); // Debounce to avoid too frequent API requests
}
async function searchMovies() {
    const query = searchInput.value.trim();
    if (query === '') {
        movieContainer.innerHTML = '';
        return;
    }
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
    const data = await response.json();
    if (data.Response === "True") {
        displayMovies(data.Search);
    } else {
        movieContainer.innerHTML = '<p>No results found</p>';
    }
}

function displayMovies(movies) {
    movieContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h2>${movie.Title}</h2>
        `;
        movieContainer.appendChild(movieElement);
    });
}

// Debounce function to limit API requests
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}