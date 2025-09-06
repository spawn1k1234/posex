// src/api/tmdbApi.js
import axios from "axios";

const BASE_URL =
  process.env.REACT_APP_TMDB_BASE_URL || "https://api.themoviedb.org/3";
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: "uk-UA",
  },
});
console.log("TMDB API Key:", API_KEY);

export const tmdb = {
  getTrending: async () => {
    const res = await instance.get("/trending/movie/day");
    return res.data;
  },

  searchMovies: async (query, page = 1) => {
    const res = await instance.get("/search/movie", {
      params: { query, page, include_adult: false },
    });
    return res.data;
  },

  getMovieDetails: async (movieId) => {
    const res = await instance.get(`/movie/${movieId}`);
    return res.data;
  },

  getMovieCredits: async (movieId) => {
    const res = await instance.get(`/movie/${movieId}/credits`);
    return res.data;
  },

  getMovieReviews: async (movieId, page = 1) => {
    const res = await instance.get(`/movie/${movieId}/reviews`, {
      params: { page },
    });
    return res.data;
  },
};
