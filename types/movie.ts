export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  genre_ids: number[];
  genres?: { id: number; name: string }[];
  vote_average: number;
  release_date: string;
  runtime: number;
  overview: string;
}

export interface MovieResponse {
  results: Movie[];
  total_pages: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface SearchBarRef {
  focus: () => void;
}
