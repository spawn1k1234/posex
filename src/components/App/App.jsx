import React, { Suspense, lazy } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import styles from "./App.module.css";

const Home = lazy(() => import("../Home/Home"));
const Movies = lazy(() => import("../Movies/Movies"));
const MovieDetails = lazy(() => import("../MovieDetails/MovieDetails"));
const Cast = lazy(() => import("../Cast/Cast"));
const Reviews = lazy(() => import("../Reviews/Reviews"));

export default function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <nav>
          <Link to="/">Home</Link> | <Link to="/movies">Movies</Link>
        </nav>
      </header>

      <main>
        <Suspense fallback={<div>Завантаження...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/movies/:movieId" element={<MovieDetails />}>
              <Route path="cast" element={<Cast />} />
              <Route path="reviews" element={<Reviews />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
    </div>
  );
}
