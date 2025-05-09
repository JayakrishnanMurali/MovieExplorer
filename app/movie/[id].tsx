import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Bookmark,
  Download,
  ExternalLink,
  Play,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getMovieDetailsSelector, useMovieStore } from "../../store/movieStore";

const { width } = Dimensions.get("window");
const POSTER_HEIGHT = width * 0.7;

function getStars(rating: number) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Text
        key={i}
        style={{
          color: i <= Math.round(rating / 2) ? "#f5c518" : "#444",
          fontSize: 20,
          marginRight: 2,
        }}
      >
        ★
      </Text>
    );
  }
  return stars;
}

export default function MovieDetailScreen() {
  const { id } = useLocalSearchParams();
  const getMovieDetails = useMovieStore(getMovieDetailsSelector);
  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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
        <ActivityIndicator size="large" color="#f5c518" />
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => router.back()}
          >
            <ArrowLeft color="#fff" size={22} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn}>
            <Bookmark color="#fff" size={22} />
          </TouchableOpacity>
        </View>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          }}
          style={styles.poster}
        />
        <Text style={styles.title}>{movie.title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaText}>
            📅{" "}
            {movie.release_date
              ? new Date(movie.release_date).toLocaleDateString()
              : "-"}
          </Text>
          <Text style={styles.metaText}>⏱️ {movie.runtime} Minutes</Text>
          {movie.genres && movie.genres.length > 0 && (
            <Text style={styles.metaText}>🎬 {movie.genres[0].name}</Text>
          )}
        </View>
        <View style={styles.starsRow}>{getStars(movie.vote_average)}</View>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Download color="#fff" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <ExternalLink color="#fff" size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.watchBtn} activeOpacity={0.9}>
          <Play color="#fff" size={20} style={{ marginRight: 8 }} />
          <Text style={styles.watchBtnText}>Watch Now</Text>
        </TouchableOpacity>
        <Text style={styles.overview}>{movie.overview}</Text>
      </ScrollView>
    </SafeAreaView>
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
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#18181c",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  iconBtn: {
    backgroundColor: "#23232b",
    borderRadius: 16,
    padding: 8,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  poster: {
    width: width - 40,
    height: POSTER_HEIGHT,
    borderRadius: 24,
    alignSelf: "center",
    marginBottom: 18,
    marginTop: 4,
    resizeMode: "cover",
    backgroundColor: "#23232b",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginBottom: 8,
  },
  metaText: {
    color: "#bbb",
    fontSize: 14,
    marginHorizontal: 4,
  },
  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
    marginBottom: 16,
  },
  actionBtn: {
    backgroundColor: "#23232b",
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 6,
  },
  watchBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e74c3c",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 32,
    alignSelf: "center",
    marginBottom: 18,
    marginTop: 2,
    shadowColor: "#e74c3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
  },
  watchBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 4,
  },
  overview: {
    color: "#bbb",
    fontSize: 16,
    lineHeight: 24,
    marginHorizontal: 20,
    marginTop: 8,
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});
