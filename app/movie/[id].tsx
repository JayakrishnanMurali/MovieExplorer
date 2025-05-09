import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useMovieStore } from "../store/movieStore";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  runtime: number;
  genres: { id: number; name: string }[];
}

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams();
  const { getMovieDetails } = useMovieStore();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieDetails(Number(id));
        setMovie(movieData);
      } catch (err) {
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || "Movie not found"}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        style={styles.poster}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.metaInfo}>
          <Text style={styles.year}>
            {new Date(movie.release_date).getFullYear()}
          </Text>
          <Text style={styles.runtime}>{movie.runtime} min</Text>
          <Text style={styles.rating}>⭐ {movie.vote_average.toFixed(1)}</Text>
        </View>
        <View style={styles.genres}>
          {movie.genres.map((genre) => (
            <Text key={genre.id} style={styles.genre}>
              {genre.name}
            </Text>
          ))}
        </View>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  poster: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  metaInfo: {
    flexDirection: "row",
    marginBottom: 12,
  },
  year: {
    fontSize: 16,
    color: "#666",
    marginRight: 12,
  },
  runtime: {
    fontSize: 16,
    color: "#666",
    marginRight: 12,
  },
  rating: {
    fontSize: 16,
    color: "#f5c518",
  },
  genres: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  genre: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 14,
  },
  overview: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
