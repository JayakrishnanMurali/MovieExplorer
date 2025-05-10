import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppLayout from "../../components/AppLayout";
import CategoryChips from "../../components/CategoryChips";
import { SkeletonCarousel } from "../../components/explore/SkeletonCarousel";
import Header from "../../components/Header";
import MovieCardCarousel from "../../components/MovieCardCarousel";
import SearchBar from "../../components/SearchBar";
import { GENRES_MAP } from "../../constants/genres";
import { endpoints } from "../../store/movieStore";

export default function HomeScreen() {
  const [selectedGenre, setSelectedGenre] = useState(0); // 0 = All
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("home");
  const router = useRouter();

  // Fetch movies (popular or by genre)
  const { data: movies = [], isLoading } = useQuery({
    queryKey: ["movies", selectedGenre],
    queryFn: async () => {
      if (selectedGenre === 0) {
        const res = await axios.get(endpoints.popular);
        return res.data.results;
      } else {
        const res = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}&with_genres=${selectedGenre}`
        );
        return res.data.results;
      }
    },
  });

  // Search movies
  const { data: searchResults = [] } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.EXPO_PUBLIC_TMDB_API_KEY
        }&query=${encodeURIComponent(searchQuery)}`
      );
      return res.data.results;
    },
    enabled: !!searchQuery,
  });

  // Handle navigation for tabs
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "explore") router.push("/screens/ExploreScreen");
    if (tab === "favorites") router.push("/screens/FavoritesScreen");
    if (tab === "home") router.push("/screens/HomeScreen");
  };

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query)
      router.push({ pathname: "/screens/SearchScreen", params: { q: query } });
  };

  // Handle movie card press
  const handleMoviePress = (id: number) => {
    router.push(`/movie/${id}`);
  };

  return (
    <AppLayout activeTab={activeTab} onTabChange={handleTabChange}>
      <StatusBar barStyle="light-content" backgroundColor="#18181c" />
      <View style={styles.container}>
        <Header />
        <SearchBar
          onSearch={handleSearch}
          onFilterPress={() =>
            router.push({
              pathname: "/screens/ExploreScreen",
              params: { openFilter: "1" },
            })
          }
          onFocus={() =>
            router.push({
              pathname: "/screens/ExploreScreen",
              params: { focusSearch: "1" },
            })
          }
        />
        <CategoryChips
          selectedGenre={selectedGenre}
          onSelect={setSelectedGenre}
        />
        <View style={styles.featuredRow}>
          <Text style={styles.featuredTitle}>
            {selectedGenre === 0
              ? "Trending Movies"
              : `${GENRES_MAP[selectedGenre]} Movies`}
          </Text>
          <TouchableOpacity
            style={styles.seeAllBtn}
            activeOpacity={0.8}
            onPress={() =>
              router.push({
                pathname: "/screens/ExploreScreen",
                params: { genre: selectedGenre },
              })
            }
          >
            <Text style={styles.seeAllText}>See all</Text>
            {/* @ts-ignore */}
            <ChevronRight color="#fff" stroke="#fff" size={18} />
          </TouchableOpacity>
        </View>
        <View style={styles.carouselWrapper}>
          {isLoading ? (
            <SkeletonCarousel />
          ) : (
            <MovieCardCarousel
              movies={searchQuery ? searchResults : movies}
              onPress={handleMoviePress}
            />
          )}
        </View>
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181c",
    paddingTop: 0,
  },
  featuredRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 8,
    marginBottom: 8,
  },
  featuredTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: 0.2,
  },
  seeAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#23232b",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  seeAllText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginRight: 2,
  },
  carouselWrapper: {
    flex: 1,
    minHeight: 200,
    marginBottom: 70, // leave space for bottom nav
  },
});
