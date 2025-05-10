import { Movie } from "@/types/movie";
import axios from "axios";
import { create } from "zustand";

const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = process.env.EXPO_PUBLIC_TMDB_BASE_URL;

interface MovieStore {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  getMovieDetails: (id: number) => Promise<Movie | undefined>;
  getRecommendedMovies: (id: number) => Promise<Movie[]>;
}

export const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
  setMovies: (movies) => set({ movies }),
  getMovieDetails: async (id: number) => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error("Failed to fetch movie details:", error);
      return undefined;
    }
  },
  getRecommendedMovies: async (id: number) => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${id}/recommendations?api_key=${TMDB_API_KEY}`
      );
      return response.data.results;
    } catch (error) {
      console.error("Failed to fetch recommended movies:", error);
      return [];
    }
  },
}));

// API endpoints
export const endpoints = {
  popular: `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`,
  movieDetails: (id: number) =>
    `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`,
  recommendedMovies: (id: number) =>
    `${TMDB_BASE_URL}/movie/${id}/recommendations?api_key=${TMDB_API_KEY}`,
  search: (query: string) =>
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${query}`,
};

export const getMovieDetailsSelector = (state: MovieStore) =>
  state.getMovieDetails;

export const getRecommendedMoviesSelector = (state: MovieStore) =>
  state.getRecommendedMovies;
