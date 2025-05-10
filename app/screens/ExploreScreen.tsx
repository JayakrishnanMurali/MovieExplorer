import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Easing,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppLayout from "../../components/AppLayout";
import SearchBar, { SearchBarRef } from "../../components/SearchBar";
import { GenreFilterSheet } from "../../components/explore/GenreFilterSheet";
import { GridSkeleton } from "../../components/explore/GridSkeleton";
import { MovieGridCard } from "../../components/movie/MovieGridCard";
import { GENRES_MAP } from "../../constants/genres";
import { useDebounce } from "../../hooks/useDebounce";

export default function ExploreScreen() {
  const { genre, focusSearch, openFilter } = useLocalSearchParams();
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000);
  const [filterModal, setFilterModal] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(
    genre && genre !== "0" ? Number(genre) : 0
  );
  const [refreshing, setRefreshing] = useState(false);
  const [sheetAnim] = useState(new Animated.Value(0));
  const [activeTab, setActiveTab] = useState("explore");
  const router = useRouter();
  const searchBarRef = useRef<SearchBarRef>(null);

  useEffect(() => {
    if (focusSearch === "1") {
      setTimeout(() => {
        searchBarRef.current?.focus();
      }, 300);
    }
    if (openFilter === "1") {
      setTimeout(() => {
        setFilterModal(true);
        Animated.timing(sheetAnim, {
          toValue: 1,
          duration: 250,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }).start();
      }, 300);
    }
  }, [focusSearch, openFilter, searchBarRef, sheetAnim]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["explore", selectedGenre, debouncedSearch],
    queryFn: async ({ pageParam = 1 }: { pageParam?: number }) => {
      let url = "";
      if (debouncedSearch) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.EXPO_PUBLIC_TMDB_API_KEY
        }&query=${encodeURIComponent(debouncedSearch)}&page=${pageParam}`;
      } else if (selectedGenre && selectedGenre !== 0) {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}&with_genres=${selectedGenre}&page=${pageParam}`;
      } else {
        url = `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.EXPO_PUBLIC_TMDB_API_KEY}&page=${pageParam}`;
      }
      const res = await axios.get(url);
      return {
        results: res.data.results,
        nextPage: pageParam + 1,
        totalPages: res.data.total_pages,
      };
    },
    getNextPageParam: (lastPage: any, allPages: any[]) => {
      if (lastPage.nextPage <= lastPage.totalPages) return lastPage.nextPage;
      return undefined;
    },
    initialPageParam: 1,
  });

  const movies = data?.pages.flatMap((p: any) => p.results) || [];

  const handleSearch = (q: string) => {
    setSearch(q);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const handleFilterPress = () => {
    setFilterModal(true);
    Animated.timing(sheetAnim, {
      toValue: 1,
      duration: 250,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const handleFilterClose = () => {
    Animated.timing(sheetAnim, {
      toValue: 0,
      duration: 200,
      easing: Easing.in(Easing.ease),
      useNativeDriver: true,
    }).start(() => setFilterModal(false));
  };

  const handleGenreSelect = (id: number) => {
    setSelectedGenre(id);
    handleFilterClose();
    refetch();
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (tab === "home") router.push("/screens/HomeScreen");
    if (tab === "favorites") router.push("/screens/FavoritesScreen");
    if (tab === "explore") router.push("/screens/ExploreScreen");
  };

  return (
    <AppLayout
      activeTab={activeTab}
      onTabChange={handleTabChange}
      topSafeAreaColor="#18181c"
    >
      <View style={styles.container}>
        <SearchBar
          ref={searchBarRef}
          onSearch={handleSearch}
          onFilterPress={handleFilterPress}
        />
        <Text style={styles.title}>
          {search
            ? `Results for "${search}"`
            : selectedGenre && selectedGenre !== 0
            ? `${GENRES_MAP[selectedGenre] || "Category"} Movies`
            : "Trending Movies"}
        </Text>
        {isLoading ? (
          <GridSkeleton />
        ) : (
          <FlatList
            data={movies}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.grid}
            renderItem={({ item }) => <MovieGridCard movie={item} />}
            onEndReached={() => {
              if (hasNextPage && !isFetchingNextPage) fetchNextPage();
            }}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isFetchingNextPage ? (
                <ActivityIndicator color="#fff" style={{ margin: 16 }} />
              ) : null
            }
            initialNumToRender={6}
            maxToRenderPerBatch={6}
            windowSize={9}
            removeClippedSubviews={true}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            ListHeaderComponent={
              refreshing ? (
                <ActivityIndicator
                  color="#f5c518"
                  style={{ marginVertical: 12 }}
                />
              ) : null
            }
          />
        )}
        <GenreFilterSheet
          visible={filterModal}
          onClose={handleFilterClose}
          onSelect={handleGenreSelect}
          selectedGenre={selectedGenre}
          sheetAnim={sheetAnim}
        />
      </View>
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181c",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 16,
    marginVertical: 12,
  },
  grid: {
    padding: 8,
  },
});
