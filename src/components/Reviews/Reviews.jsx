import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdb } from "../../api/tmdbApi";
import styles from "./Reviews.module.css";

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    tmdb
      .getMovieReviews(movieId)
      .then((data) => setReviews(data.results || []))
      .catch(() => setReviews([]));
  }, [movieId]);

  if (!reviews.length) return <p>Оглядів поки немає.</p>;

  return (
    <div className={styles.wrap}>
      {reviews.map((r) => (
        <div key={r.id} className={styles.review}>
          <h4>Аutor: {r.author}</h4>
          <p>{r.content}</p>
        </div>
      ))}
    </div>
  );
}
