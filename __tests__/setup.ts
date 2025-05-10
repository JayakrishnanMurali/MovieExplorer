import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock expo modules
vi.mock("expo-router", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  useLocalSearchParams: () => ({}),
}));

// Mock AsyncStorage
vi.mock("@react-native-async-storage/async-storage", () => ({
  setItem: vi.fn(),
  getItem: vi.fn(),
  removeItem: vi.fn(),
}));

// Mock expo-constants
vi.mock("expo-constants", () => ({
  default: {
    expoConfig: {
      extra: {
        apiUrl: "https://api.example.com",
      },
    },
  },
}));
