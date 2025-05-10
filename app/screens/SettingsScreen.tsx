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

export default function SettingsScreen() {
  const router = useRouter();
  const { favorites, loading } = useFavoritesStore();

  const handleTabChange = (tab: string) => {
    if (tab === "home") router.push("/screens/HomeScreen");
    if (tab === "explore") router.push("/screens/ExploreScreen");
    if (tab === "favorites") router.push("/screens/FavoritesScreen");
    if (tab === "settings") router.push("/screens/SettingsScreen");
  };

  if (loading) {
    return (
      <AppLayout activeTab="settings" onTabChange={handleTabChange}>
        <FavoritesSkeleton />
      </AppLayout>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <AppLayout activeTab="settings" onTabChange={handleTabChange}>
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
    <AppLayout activeTab="settings" onTabChange={handleTabChange}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.grid}
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

const CARD_HEIGHT = height * 0.28;
const styles = StyleSheet.create({
  grid: { padding: 16 },
  card: {
    width: width - 32,
    height: CARD_HEIGHT,
    backgroundColor: "#23232b",
    borderRadius: 24,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    overflow: "hidden",
    elevation: 4,
  },
  poster: {
    width: "100%",
    height: "80%",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#333",
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 8,
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
});
