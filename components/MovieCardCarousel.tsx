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
const CARD_WIDTH = width * 0.8;
const CARD_HEIGHT = 320;

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  genre_ids?: number[];
}

interface MovieCardCarouselProps {
  movies: Movie[];
  onPress: (movieId: number) => void;
}

export default function MovieCardCarousel({
  movies,
  onPress,
}: MovieCardCarouselProps) {
  return (
    <FlatList
      data={movies}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH + 24}
      decelerationRate="fast"
      contentContainerStyle={styles.carousel}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.card}
          onPress={() => onPress(item.id)}
        >
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
            style={styles.poster}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {item.title}
            </Text>
            <View style={styles.metaRow}>
              <Text style={styles.year}>
                {new Date(item.release_date).getFullYear()}
              </Text>
              <Text style={styles.rating}>
                ⭐ {item.vote_average.toFixed(1)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  carousel: {
    paddingLeft: 20,
    paddingVertical: 12,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: "#23232b",
    borderRadius: 24,
    marginRight: 24,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  poster: {
    width: "100%",
    height: CARD_HEIGHT - 80,
    resizeMode: "cover",
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  year: {
    color: "#bbb",
    fontSize: 14,
    marginRight: 12,
  },
  rating: {
    color: "#f5c518",
    fontSize: 14,
    fontWeight: "bold",
  },
});
