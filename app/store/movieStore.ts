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
  loading: boolean;
  error: string | null;
  fetchMovies: () => Promise<void>;
  getMovieDetails: (id: number) => Promise<Movie | null>;
}

export const useMovieStore = create<MovieStore>((set) => ({
  movies: [],
  loading: false,
  error: null,

  fetchMovies: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`
      );
      set({ movies: response.data.results, loading: false });
    } catch (error) {
      set({ error: "Failed to fetch movies", loading: false });
    }
  },

  getMovieDetails: async (id: number) => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`
      );
      return response.data;
    } catch (error) {
      set({ error: "Failed to fetch movie details" });
      return null;
    }
  },
}));
