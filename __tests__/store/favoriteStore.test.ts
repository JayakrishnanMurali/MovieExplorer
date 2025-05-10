import "dotenv/config";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

let useFavoritesStore: any;

beforeAll(async () => {
  useFavoritesStore = (await import("../../store/favoritesStore"))
    .useFavoritesStore;
});

describe("favoritesStore", () => {
  beforeEach(() => {
    useFavoritesStore.setState({ favorites: [] });
    vi.clearAllMocks();
  });

  describe("addFavorite", () => {
    it("should add a movie to favorites", () => {
      const movie = { id: 1, title: "Test Movie" };
      useFavoritesStore.getState().addFavorite(movie);
      expect(useFavoritesStore.getState().favorites).toContainEqual(movie);
    });
  });

  describe("removeFavorite", () => {
    it("should remove a movie from favorites", () => {
      const movie = { id: 1, title: "Test Movie" };
      useFavoritesStore.getState().addFavorite(movie);
      useFavoritesStore.getState().removeFavorite(1);
      expect(useFavoritesStore.getState().favorites).not.toContainEqual(movie);
    });
  });

  describe("isFavorite", () => {
    it("should return true if movie is in favorites", () => {
      const movie = { id: 1, title: "Test Movie" };
      useFavoritesStore.getState().addFavorite(movie);
      expect(useFavoritesStore.getState().isFavorite(1)).toBe(true);
    });

    it("should return false if movie is not in favorites", () => {
      expect(useFavoritesStore.getState().isFavorite(1)).toBe(false);
    });
  });
});
