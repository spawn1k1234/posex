import React, { useEffect, useState } from "react";
import { tmdb } from "../../api/tmdbApi";
import MovieList from "../Shared/MovieList/MovieList";
import styles from "./Home.module.css";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    tmdb
      .getTrending()
      .then((data) => setMovies(data.results || []))
      .catch((err) => setError("Не вдалося завантажити популярні фільми"));
  }, []);

  return (
    <section className={styles.container}>
      <h1>Популярні фільми сьогодні</h1>
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </section>
  );
}
