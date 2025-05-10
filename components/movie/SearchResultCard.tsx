import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Movie } from "../../types/movie";

interface SearchResultCardProps {
  movie: Movie;
  onPress: () => void;
}

export function SearchResultCard({ movie, onPress }: SearchResultCardProps) {
  return (
    <TouchableOpacity style={styles.resultCard} onPress={onPress}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        style={styles.poster}
      />
      <View style={styles.info}>
        <Text style={styles.movieTitle}>{movie.title}</Text>
        <Text style={styles.year}>
          {new Date(movie.release_date).getFullYear()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  resultCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#23232b",
    borderRadius: 16,
    marginBottom: 14,
    padding: 10,
  },
  poster: {
    width: 60,
    height: 90,
    borderRadius: 8,
    marginRight: 14,
    backgroundColor: "#333",
  },
  info: {
    flex: 1,
  },
  movieTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  year: {
    color: "#bbb",
    fontSize: 14,
    marginTop: 4,
  },
});
