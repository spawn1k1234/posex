import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tmdb } from "../../api/tmdbApi";
import styles from "./Cast.module.css";

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    tmdb
      .getMovieCredits(movieId)
      .then((data) => setCast(data.cast || []))
      .catch(() => setCast([]));
  }, [movieId]);

  if (!cast.length) return <p>Інформація про акторів відсутня.</p>;

  return (
    <div className={styles.wrap}>
      <ul>
        {cast.map((member) => (
          <li key={member.cast_id}>
            <p>
              <b>{member.name}</b> — {member.character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
