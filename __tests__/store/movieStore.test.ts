import "dotenv/config";

import axios from "axios";
import { beforeAll, beforeEach, describe, expect, it, Mock, vi } from "vitest";

// Mock axios
vi.mock("axios");
const mockedAxios = axios as unknown as { get: Mock };

let useMovieStore: any;

beforeAll(async () => {
  useMovieStore = (await import("../../store/movieStore")).useMovieStore;
});

describe("movieStore", () => {
  beforeEach(() => {
    // Reset the store before each test
    useMovieStore.setState({ movies: [] });
    vi.clearAllMocks();
  });

  describe("setMovies", () => {
    it("should update the movies state", () => {
      const testMovies = [
        {
          id: 1,
          title: "Test Movie",
          poster_path: "/test.jpg",
          overview: "Test overview",
          release_date: "2024-01-01",
          vote_average: 8.5,
          runtime: 120,
          genres: [{ id: 1, name: "Action" }],
        },
      ];

      useMovieStore.getState().setMovies(testMovies);
      expect(useMovieStore.getState().movies).toEqual(testMovies);
    });
  });

  describe("getMovieDetails", () => {
    it("should fetch and return movie details", async () => {
      const mockMovie = {
        id: 1,
        title: "Test Movie",
        poster_path: "/test.jpg",
        overview: "Test overview",
        release_date: "2024-01-01",
        vote_average: 8.5,
        runtime: 120,
        genres: [{ id: 1, name: "Action" }],
      };

      mockedAxios.get.mockResolvedValueOnce({ data: mockMovie });

      const result = await useMovieStore.getState().getMovieDetails(1);
      expect(result).toEqual(mockMovie);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.EXPO_PUBLIC_TMDB_BASE_URL}/movie/1?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`
      );
    });

    it("should return undefined when API call fails", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));

      const result = await useMovieStore.getState().getMovieDetails(1);
      expect(result).toBeUndefined();
    });
  });

  describe("getRecommendedMovies", () => {
    it("should fetch and return recommended movies", async () => {
      const mockRecommendedMovies = [
        {
          id: 2,
          title: "Recommended Movie 1",
          poster_path: "/test1.jpg",
        },
        {
          id: 3,
          title: "Recommended Movie 2",
          poster_path: "/test2.jpg",
        },
      ];

      mockedAxios.get.mockResolvedValueOnce({
        data: { results: mockRecommendedMovies },
      });

      const result = await useMovieStore.getState().getRecommendedMovies(1);
      expect(result).toEqual(mockRecommendedMovies);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.EXPO_PUBLIC_TMDB_BASE_URL}/movie/1/recommendations?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}`
      );
    });

    it("should return empty array when API call fails", async () => {
      mockedAxios.get.mockRejectedValueOnce(new Error("API Error"));

      const result = await useMovieStore.getState().getRecommendedMovies(1);
      expect(result).toEqual([]);
    });
  });
});
