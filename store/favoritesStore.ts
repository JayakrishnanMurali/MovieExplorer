import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface FavoriteMovie {
  [key: string]: any; // Store the full movie object
  id: number;
}

interface FavoritesStore {
  favorites: FavoriteMovie[];
  loading: boolean;
  addFavorite: (movie: FavoriteMovie) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
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
    }),
    {
      name: "favorites-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
