import { useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GENRES_MAP } from "../../constants/genres";
import { Movie } from "../../types/movie";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 56) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

interface MovieGridCardProps {
  movie: Movie;
}

export function MovieGridCard({ movie }: MovieGridCardProps) {
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
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {movie.title}
        </Text>
        <Text style={styles.genre}>
          {firstGenreName}
          {extraGenres}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    margin: 8,
    borderRadius: 12,
    backgroundColor: "#1a1a1a",
    overflow: "hidden",
  },
  poster: {
    width: "100%",
    height: "80%",
    resizeMode: "cover",
  },
  info: {
    padding: 8,
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  genre: {
    color: "#888",
    fontSize: 12,
  },
});
