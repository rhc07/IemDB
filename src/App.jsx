import React, { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./MovieCard";

const API_URL = `http://www.omdbapi.com/?apikey=${
  import.meta.env.VITE_OMDB_API_KEY
}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    console.log(data.Search);
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("Dune");
  }, []);

  return (
    <>
      <div className="app">
        <h1>IemDB</h1>
        <div className="search" key="search-bar">
          <input
            placeholder="Search for movies"
            value={searchTerm}
            onChange={(e) => {
              searchMovies(setSearchTerm(e.target.value));
            }}
          />
          <img
            src={SearchIcon}
            alt="search"
            onClick={() => searchMovies(searchTerm)}
          />
        </div>

        {movies?.length > 0 ? (
          <>
            <div className="container" key="movie-list">
              {movies.map((movie) => (
                <div key={movie.id}>
                  <MovieCard movie={movie} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="empty" key="empty-list">
            <h2>No movies found.</h2>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
