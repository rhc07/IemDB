import React, { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from "./components/MovieCard";
import MovieModal from "./components/MovieModal";

const API_URL = `http://www.omdbapi.com/?apikey=${
  import.meta.env.VITE_OMDB_API_KEY
}`;

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalMovie, setModalMovie] = useState([]);

  const searchMovies = async (title) => {
    try {
      const response = await fetch(`${API_URL}&s=${title}`);
      const data = await response.json();

      const timeOutId = setTimeout(() => setMovies(data.Search), 500);
      return () => clearTimeout(timeOutId);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchMovieInfo = async (imdbID) => {
    try {
      const response = await fetch(`${API_URL}&i=${imdbID}`);
      const data = await response.json();
      setModalMovie(data);
      setOpenModal(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    searchMovies("Home");
  }, []);

  const handleKeyDown = (search, keycode) => {
    keycode === 13 ? searchMovies(search) : null;
  };

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
            onKeyDown={(e) => handleKeyDown(e.target.value, e.keyCode)}
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
                <>
                  <div key={movie.id}>
                    <MovieCard
                      movie={movie}
                      onOpenModal={() => {
                        fetchMovieInfo(movie.imdbID);
                      }}
                    />
                    <MovieModal
                      open={openModal}
                      movie={modalMovie}
                      onClose={() => {
                        setOpenModal(false);
                        setModalMovie([]);
                      }}
                    />
                  </div>
                </>
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
