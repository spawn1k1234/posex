import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <Link to={`/movies/${movie.id}`} state={{ from: location }}>
            {movie.title || movie.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

MovieList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieList;
