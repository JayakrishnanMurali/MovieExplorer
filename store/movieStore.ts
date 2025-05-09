import axios from "axios";
import { create } from "zustand";

const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = process.env.EXPO_PUBLIC_TMDB_BASE_URL;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
}

interface MovieStore {
  movies: Movie[];
  setMovies: (movies: Movie[]) => void;
  getMovieDetails: (id: number) => Promise<Movie | undefined>;
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
      return undefined;
    }
  },
}));

// API endpoints
export const endpoints = {
  popular: `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`,
  movieDetails: (id: number) =>
    `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`,
};

export const getMovieDetailsSelector = (state: MovieStore) =>
  state.getMovieDetails;
