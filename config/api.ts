export const TMDB_API_KEY = process.env.EXPO_PUBLIC_TMDB_API_KEY;
export const TMDB_BASE_URL = process.env.EXPO_PUBLIC_TMDB_BASE_URL;

export const endpoints = {
  popular: `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`,
  search: (query: string) =>
    `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      query
    )}`,
  discover: (genreId: number) =>
    `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}`,
  trending: `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`,
  movieDetails: (id: number) =>
    `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`,
};
