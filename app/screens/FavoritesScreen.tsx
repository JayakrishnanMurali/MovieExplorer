import { useRouter } from "expo-router";
import { Plus } from "lucide-react-native";
import React from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppLayout from "../../components/AppLayout";
import { FavoritesSkeleton } from "../../components/explore/FavoritesSkeleton";
import { FavoriteMovieCard } from "../../components/movie/FavoriteMovieCard";
import { useFavoritesStore } from "../../store/favoritesStore";

// Dummy hook for favorites, replace with Zustand or Context
const { width, height } = Dimensions.get("window");

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

const CARD_HEIGHT = height * 0.38;

export default function FavoritesScreen() {
  const router = useRouter();
  const { favorites, loading } = useFavoritesStore();

  const handleTabChange = (tab: string) => {
    if (tab === "home") router.push("/screens/HomeScreen");
    if (tab === "explore") router.push("/screens/ExploreScreen");
    if (tab === "favorites") router.push("/screens/FavoritesScreen");
  };

  const ListHeader = () => (
    <View style={styles.headerRow}>
      <Text style={styles.headerTitle}>Your Favorite Movies</Text>
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => router.push("/screens/ExploreScreen")}
        activeOpacity={0.8}
      >
        <Plus color="#fff" size={24} />
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <AppLayout activeTab="favorites" onTabChange={handleTabChange}>
        <FavoritesSkeleton />
      </AppLayout>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <AppLayout activeTab="favorites" onTabChange={handleTabChange}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favorites yet</Text>
          <TouchableOpacity
            style={styles.plusBtn}
            onPress={() => router.push("/screens/ExploreScreen")}
          >
            <Plus color="#fff" size={32} />
          </TouchableOpacity>
          <Text style={styles.emptySubText}>Add movies to your favorites!</Text>
        </View>
      </AppLayout>
    );
  }

  return (
    <AppLayout activeTab="favorites" onTabChange={handleTabChange}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[styles.grid, { paddingBottom: 120 }]}
        ListHeaderComponent={ListHeader}
        renderItem={({ item }) => (
          <FavoriteMovieCard
            movie={item as any}
            onPress={() => router.push(`/movie/${item.id}`)}
          />
        )}
      />
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  grid: { padding: 16 },
  card: {
    width: width - 32,
    height: CARD_HEIGHT,
    backgroundColor: "#23232b",
    borderRadius: 28,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    overflow: "hidden",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
  },
  poster: {
    width: "100%",
    height: "100%",
    borderRadius: 28,
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "cover",
  },
  badgeRow: {
    position: "absolute",
    top: 18,
    left: 18,
    right: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 2,
  },
  genreBadge: {
    backgroundColor: "#23232b",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },
  badgeText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  imdbBadge: {
    backgroundColor: "#f5c518",
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 5,
    alignSelf: "flex-start",
  },
  imdbText: {
    color: "#23232b",
    fontSize: 15,
    fontWeight: "bold",
  },
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    padding: 18,
    backgroundColor: "rgba(24,24,28,0.92)",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  year: {
    color: "#bbb",
    fontSize: 15,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#18181c",
  },
  emptyText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  plusBtn: {
    backgroundColor: "#e74c3c",
    borderRadius: 32,
    padding: 18,
    marginBottom: 12,
    marginTop: 8,
  },
  emptySubText: {
    color: "#bbb",
    fontSize: 15,
    marginTop: 2,
  },
  skeletonCard: {
    width: width - 32,
    height: CARD_HEIGHT,
    backgroundColor: "#23232b",
    borderRadius: 24,
    marginBottom: 20,
    opacity: 0.5,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
    marginTop: 2,
    paddingHorizontal: 2,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  addBtn: {
    backgroundColor: "#e74c3c",
    borderRadius: 24,
    padding: 10,
    marginLeft: 8,
  },
});
