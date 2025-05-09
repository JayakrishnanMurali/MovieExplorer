import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import BottomNav from "../../components/BottomNav";
import CategoryChips from "../../components/CategoryChips";
import Header from "../../components/Header";
import MovieCardCarousel from "../../components/MovieCardCarousel";
import SearchBar from "../../components/SearchBar";
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
          `${endpoints.popular}&with_genres=${selectedGenre}`
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
    if (tab === "settings") router.push("/screens/SettingsScreen");
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#18181c" />
      <Header />
      <SearchBar onSearch={handleSearch} />
      <CategoryChips
        selectedGenre={selectedGenre}
        onSelect={setSelectedGenre}
      />
      <MovieCardCarousel
        movies={searchQuery ? searchResults : movies}
        onPress={handleMoviePress}
      />
      <View style={styles.bottomNavWrapper}>
        <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181c",
    paddingTop: 0,
  },
  bottomNavWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
});
