export const GENRES_MAP: { [key: number]: string } = {
  28: "Action",
  35: "Comedy",
  27: "Horror",
  10749: "Romance",
  18: "Drama",
  12: "Adventure",
  16: "Animation",
  80: "Crime",
  99: "Documentary",
  14: "Fantasy",
  36: "History",
  10402: "Music",
  9648: "Mystery",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export const GENRE_LIST = Object.entries(GENRES_MAP).map(([id, name]) => ({
  id: Number(id),
  name,
}));
