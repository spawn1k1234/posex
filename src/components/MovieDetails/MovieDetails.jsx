import React, { useEffect, useState } from "react";
import {
  useParams,
  Link,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { tmdb } from "../../api/tmdbApi";
import styles from "./MovieDetails.module.css";

export default function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    tmdb
      .getMovieDetails(movieId)
      .then((data) => setMovie(data))
      .catch(() => setError("Не вдалося завантажити деталі фільму"));
  }, [movieId]);

  const handleBack = () => {
    const from = location.state?.from ?? "/";
    navigate(from);
  };

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Завантаження...</p>;

  return (
    <section className={styles.container}>
      <button onClick={handleBack}>Назад</button>

      <h2>{movie.title}</h2>
      <p>
        <b>Опис:</b> {movie.overview || "Немає опису"}
      </p>
      <p>
        <b>Рік:</b> {movie.release_date?.slice(0, 4) || "—"}
      </p>

      <nav className={styles.subnav}>
        <Link to="cast">Акторський склад</Link> |{" "}
        <Link to="reviews">Огляди</Link>
      </nav>

      <Outlet />
    </section>
  );
}
