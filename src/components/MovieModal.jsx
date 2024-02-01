import React from "react";

const MovieModal = ({ open, movie, onClose }) => {
  if (!open) return null;

  return (
    <>
      <div className="overlay">
        <div className="modalContainer">
          <img src={movie.Poster} alt={movie.Title} />
          <div className="modalRight">
            <p className="closeBtn" onClick={onClose}>
              Close
            </p>
            <div className="modalContent">
              <span>{movie.Type}</span>
              <h3>{movie.Title}</h3>
              <span>{movie.Year}</span>
              <h3>{movie.Director}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieModal;
