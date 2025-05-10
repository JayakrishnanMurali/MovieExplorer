import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Easing,
  FlatList,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNav from "../../components/BottomNav";
import SearchBar, { SearchBarRef } from "../../components/SearchBar";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 56) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

const GENRES_MAP: { [key: number]: string } = {
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
const GENRE_LIST = Object.entries(GENRES_MAP).map(([id, name]) => ({
  id: Number(id),
  name,
}));

export default function ExploreScreen() {
  const { genre, focusSearch, openFilter } = useLocalSearchParams();
  const [search, setSearch] = useState("");
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
  }, [focusSearch, openFilter]);

  // Infinite query for movies
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["explore", selectedGenre, search],
    queryFn: async ({ pageParam = 1 }: { pageParam?: number }) => {
      let url = "";
      if (search) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.EXPO_PUBLIC_TMDB_API_KEY
        }&query=${encodeURIComponent(search)}&page=${pageParam}`;
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
    refetch();
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
    if (tab === "settings") router.push("/screens/SettingsScreen");
    if (tab === "explore") router.push("/screens/ExploreScreen");
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
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
        <View style={styles.bottomNavWrapper}>
          <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
        </View>
        <GenreFilterSheet
          visible={filterModal}
          onClose={handleFilterClose}
          onSelect={handleGenreSelect}
          selectedGenre={selectedGenre}
          sheetAnim={sheetAnim}
        />
      </View>
    </SafeAreaView>
  );
}

function MovieGridCard({ movie }: { movie: any }) {
  const genreIds = movie.genre_ids || [];
  const firstGenreName =
    genreIds.length > 0 ? GENRES_MAP[genreIds[0]] || "Other" : "Other";
  const extraGenres = genreIds.length > 1 ? ` +${genreIds.length - 1}` : "";
  const router = useRouter();
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.9}
      onPress={() => router.push(`/movie/${movie.id}`)}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.poster}
      />
      <View style={styles.badgeRow}>
        <View style={styles.genreBadge}>
          <Text style={styles.badgeText} numberOfLines={1} ellipsizeMode="tail">
            {firstGenreName}
            {extraGenres}
          </Text>
        </View>
        <View style={styles.imdbBadge}>
          <Text style={styles.imdbText}>
            IMDb {movie.vote_average?.toFixed(1) || "-"}
          </Text>
        </View>
      </View>
      <View style={styles.overlay}>
        <Text style={styles.movieTitle} numberOfLines={1}>
          {movie.title}
        </Text>
        <Text style={styles.year}>
          {movie.release_date ? new Date(movie.release_date).getFullYear() : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function GridSkeleton() {
  // Show two skeleton cards per row
  return (
    <View style={styles.grid}>
      {[0, 1, 2].map((row) => (
        <View key={row} style={{ flexDirection: "row" }}>
          {[0, 1].map((col) => (
            <View
              key={col}
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                backgroundColor: "#23232b",
                borderRadius: 24,
                margin: 8,
                opacity: 0.5,
                overflow: "hidden",
              }}
            >
              <View
                style={{ flex: 1, backgroundColor: "#333", opacity: 0.2 }}
              />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

function GenreFilterSheet({
  visible,
  onClose,
  onSelect,
  selectedGenre,
  sheetAnim,
}: {
  visible: boolean;
  onClose: () => void;
  onSelect: (id: number) => void;
  selectedGenre: number;
  sheetAnim: Animated.Value;
}) {
  const dragY = React.useRef(new Animated.Value(0)).current;
  const dragThreshold = 80;

  const panResponder = React.useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 5,
      onPanResponderMove: Animated.event([null, { dy: dragY }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > dragThreshold) {
          Animated.timing(sheetAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }).start(onClose);
          dragY.setValue(0);
        } else {
          Animated.spring(dragY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(dragY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  if (!visible) return null;
  return (
    <>
      {/* Modal overlay to catch outside clicks */}
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      />
      <Animated.View
        style={[
          styles.sheet,
          {
            transform: [
              {
                translateY: Animated.add(
                  sheetAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [480, 0],
                  }),
                  dragY
                ),
              },
            ],
          },
        ]}
      >
        <View style={styles.sheetHandleArea} {...panResponder.panHandlers}>
          <View style={styles.sheetHandle} />
        </View>
        <Text style={styles.modalTitle}>Select Genre</Text>
        <View style={styles.sheetListContainer}>
          <FlatList
            data={[{ id: 0, name: "All" }, ...GENRE_LIST]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.genreOption,
                  selectedGenre === item.id && styles.genreOptionSelected,
                ]}
                onPress={() => onSelect(item.id)}
              >
                <Text
                  style={[
                    styles.genreOptionText,
                    selectedGenre === item.id && styles.genreOptionTextSelected,
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
            ListHeaderComponent={<View style={{ height: 8 }} />}
            contentContainerStyle={{ paddingBottom: 24 }}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          />
        </View>
        <TouchableOpacity style={styles.sheetCloseBtn} onPress={onClose}>
          <Text
            style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
          >
            Close
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#18181c",
  },
  container: {
    flex: 1,
    backgroundColor: "#18181c",
    paddingTop: 0,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 20,
    marginBottom: 8,
  },
  grid: {
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: "#23232b",
    borderRadius: 24,
    margin: 8,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  poster: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "cover",
    opacity: 0.92,
  },
  badgeRow: {
    position: "absolute",
    top: 12,
    left: 12,
    right: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 2,
    minWidth: 0,
    flexShrink: 1,
  },
  genreBadge: {
    backgroundColor: "#23232b",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
    minWidth: 0,
    maxWidth: CARD_WIDTH * 0.6,
    flexShrink: 1,
  },
  badgeText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "bold",
    minWidth: 0,
    flexShrink: 1,
  },
  imdbBadge: {
    backgroundColor: "#f5c518",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  imdbText: {
    color: "#23232b",
    fontSize: 11,
    fontWeight: "bold",
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    backgroundColor: "rgba(24,24,28,0.92)",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  movieTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  year: {
    color: "#bbb",
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    position: "absolute",
    top: "25%",
    left: 32,
    right: 32,
    backgroundColor: "#23232b",
    borderRadius: 20,
    padding: 24,
    elevation: 10,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  genreOption: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 4,
  },
  genreOptionSelected: {
    backgroundColor: "#f5c518",
  },
  genreOptionText: {
    color: "#fff",
    fontSize: 15,
  },
  genreOptionTextSelected: {
    color: "#23232b",
    fontWeight: "bold",
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: "#23232b",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    elevation: 20,
    zIndex: 100,
  },
  sheetHandle: {
    width: 40,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#444",
    alignSelf: "center",
    marginBottom: 12,
  },
  sheetCloseBtn: {
    marginTop: 16,
    backgroundColor: "#18181c",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  bottomNavWrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 24,
    paddingHorizontal: 24,
  },
  sheetListContainer: {
    flex: 1,
  },
  sheetHandleArea: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    width: "100%",
  },
});
