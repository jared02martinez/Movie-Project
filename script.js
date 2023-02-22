const searchElement = document.querySelector(".section__title")
const movieListElement = document.querySelector(".movie__list")

async function renderMovies(filter) {
    window.scrollBy(0, 400)
    const search = document.querySelector(".header__input").value
    const movies = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=eaf2afff&s=${search}`)
    const moviesData = await movies.json()

        if (filter === "MOVIES") {
            let filteredMovies = moviesData.Search.filter((movie) => movie.Type === "movie")
            movieListElement.innerHTML = filteredMovies.map((movie => movieHTML(movie))).join("")
        }
        else if (filter === "SERIES") {
            let filteredMovies = moviesData.Search.filter((movie) => movie.Type === "series")
            movieListElement.innerHTML = filteredMovies.map((movie => movieHTML(movie))).join("")
        }
        else if (filter === "EPISODES") {
            let filteredMovies = moviesData.Search.filter((movie) => movie.Type === "episode")
            movieListElement.innerHTML = filteredMovies.map((movie => movieHTML(movie))).join("")
        }
        else {
            movieListElement.classList += " movies__loading"
            movieListElement.innerHTML = `<i class="fas fa-spinner movies__loading--spinner"></i>`
            setTimeout(() => {
                movieListElement.classList.remove("movies__loading")
                movieListElement.innerHTML = moviesData.Search.map((movie => movieHTML(movie))).join("")
            }, 1000);
        }

    searchElement.innerHTML = `Search Results for "${search}":`
}

function movieHTML(movie) {
    return `
    <div class="movie">
        <img src="${movie.Poster}" alt="">
        <div class="movie__description">
            <div class="movie__title">${movie.Title}</div>
            <p class="movie__year">Year: ${movie.Year}</p>
            <p class="movie__type">Type: ${movie.Type.charAt(0).toUpperCase() + movie.Type.slice(1)}</p>
        </div>
    </div>`
}

function filterMovies(event) {
    renderMovies(event.target.value)
}