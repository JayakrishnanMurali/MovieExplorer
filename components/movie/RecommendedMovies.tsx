import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 56) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

interface RecommendedMoviesProps {
  movies: any[];
}

export function RecommendedMovies({ movies }: RecommendedMoviesProps) {
  const router = useRouter();

  if (movies.length === 0) return null;

  const renderRecommendedMovie = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.recommendedCard}
      activeOpacity={0.9}
      onPress={() => router.push(`/movie/${item.id}`)}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        style={styles.recommendedPoster}
      />
      <View style={styles.recommendedOverlay}>
        <Text style={styles.recommendedMovieTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.recommendedYear}>
          {item.release_date ? new Date(item.release_date).getFullYear() : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.recommendedSection}>
      <Text style={styles.recommendedSectionTitle}>Recommended Movies</Text>
      <FlatList
        data={movies}
        renderItem={renderRecommendedMovie}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={styles.recommendedGrid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  recommendedSection: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  recommendedSectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  recommendedGrid: {
    gap: 16,
    paddingHorizontal: 8,
  },
  recommendedCard: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#23232b",
    marginHorizontal: 8,
  },
  recommendedPoster: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  recommendedOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  recommendedMovieTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  recommendedYear: {
    color: "#bbb",
    fontSize: 12,
    marginTop: 4,
  },
});
