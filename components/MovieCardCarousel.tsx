import React, { useRef } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");
const CARD_WIDTH = width * 0.82;
const CARD_HEIGHT = height * 0.44;

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
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

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
  const scrollX = useRef(new Animated.Value(0)).current;

  return (
    <Animated.FlatList
      data={movies}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={CARD_WIDTH + 24}
      decelerationRate="fast"
      contentContainerStyle={styles.carousel}
      keyExtractor={(item) => item.id.toString()}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: true }
      )}
      pagingEnabled
      initialNumToRender={3}
      maxToRenderPerBatch={3}
      windowSize={5}
      removeClippedSubviews={true}
      renderItem={({ item, index }) => {
        const inputRange = [
          (index - 1) * (CARD_WIDTH + 24),
          index * (CARD_WIDTH + 24),
          (index + 1) * (CARD_WIDTH + 24),
        ];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.95, 1, 0.95],
          extrapolate: "clamp",
        });
        const genreName =
          item.genre_ids && item.genre_ids.length > 0
            ? GENRES_MAP[item.genre_ids[0]] || "Other"
            : "Other";
        return (
          <TouchableOpacity
            activeOpacity={0.9}
            style={styles.cardWrapper}
            onPress={() => onPress(item.id)}
          >
            <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={styles.poster}
              />
              <View style={styles.badgeRow}>
                <View style={styles.genreBadge}>
                  <Text style={styles.badgeText}>{genreName}</Text>
                </View>
                <View style={styles.imdbBadge}>
                  <Text style={styles.imdbText}>
                    IMDb {item.vote_average.toFixed(1)}
                  </Text>
                </View>
              </View>
              <View style={styles.overlay}>
                <Text style={styles.title} numberOfLines={1}>
                  {item.title}
                </Text>
                <View style={styles.metaRow}>
                  <Text style={styles.year}>
                    {new Date(item.release_date).getFullYear()}
                  </Text>
                </View>
              </View>
            </Animated.View>
          </TouchableOpacity>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  carousel: {
    paddingLeft: 20,
    paddingVertical: 12,
    alignItems: "center",
  },
  cardWrapper: {
    height: CARD_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 24,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: "#23232b",
    borderRadius: 28,
    overflow: "hidden",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
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
    top: 16,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 2,
  },
  genreBadge: {
    backgroundColor: "#23232b",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  imdbBadge: {
    backgroundColor: "#f5c518",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  imdbText: {
    color: "#23232b",
    fontSize: 12,
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
});
