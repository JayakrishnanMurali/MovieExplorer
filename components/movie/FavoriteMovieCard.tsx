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

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height * 0.38;

interface FavoriteMovieCardProps {
  movie: Movie;
  onPress: () => void;
}

export function FavoriteMovieCard({ movie, onPress }: FavoriteMovieCardProps) {
  let genreIds: number[] = [];
  if (Array.isArray(movie.genre_ids) && movie.genre_ids.length > 0) {
    genreIds = movie.genre_ids;
  } else if (Array.isArray(movie.genres) && movie.genres.length > 0) {
    genreIds = movie.genres.map((g: any) => g.id);
  }

  const firstGenreName =
    genreIds.length > 0
      ? GENRES_MAP[genreIds[0]] ||
        (movie.genres && movie.genres[0]?.name) ||
        "Other"
      : "Other";
  const extraGenres = genreIds.length > 1 ? ` +${genreIds.length - 1}` : "";

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
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
        <Text style={styles.title} numberOfLines={1}>
          {movie.title}
        </Text>
        <Text style={styles.year}>
          {movie.release_date ? new Date(movie.release_date).getFullYear() : ""}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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
    padding: 20,
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
    fontSize: 16,
  },
});
