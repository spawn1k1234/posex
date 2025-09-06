import React, { useState } from "react";
import { tmdb } from "../../api/tmdbApi";
import MovieList from "../Shared/MovieList/MovieList";
import styles from "./Movies.module.css";

export default function Movies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setError(null);
    try {
      const data = await tmdb.searchMovies(query);
      setMovies(data.results || []);
    } catch (err) {
      setError("Помилка пошуку");
    }
  };

  return (
    <section className={styles.container}>
      <h1>Пошук фільмів</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введіть назву фільму..."
        />
        <button type="submit">Пошук</button>
      </form>

      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </section>
  );
}
