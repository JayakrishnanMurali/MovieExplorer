import { create } from "zustand";

export interface FavoriteMovie {
  id: number;
  title: string;
  poster_path: string;
}

interface FavoritesStore {
  favorites: FavoriteMovie[];
  loading: boolean;
  addFavorite: (movie: FavoriteMovie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  loading: false,
  addFavorite: (movie) => {
    const { favorites } = get();
    if (!favorites.find((m) => m.id === movie.id)) {
      set({ favorites: [...favorites, movie] });
    }
  },
  removeFavorite: (id) => {
    set((state) => ({
      favorites: state.favorites.filter((m) => m.id !== id),
    }));
  },
  isFavorite: (id) => {
    return get().favorites.some((m) => m.id === id);
  },
}));
