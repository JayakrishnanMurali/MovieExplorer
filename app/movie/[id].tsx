import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
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
const POSTER_HEIGHT = width * 0.9;
const BANNER_HEIGHT = width * 1.25;

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
        {/* Banner with blurred background and poster */}
        <View style={styles.bannerContainer}>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            style={styles.bannerBg}
            blurRadius={2}
          />
          {/* Dim the blurred background for less focus */}
          <View style={styles.bannerOverlay} />
          {/* Fade top and bottom using gradients */}
          <LinearGradient
            colors={["#18181c", "transparent"]}
            style={styles.bannerFadeTop}
            pointerEvents="none"
          />
          <LinearGradient
            colors={["transparent", "#18181c"]}
            style={styles.bannerFadeBottom}
            pointerEvents="none"
          />
          <BlurView
            intensity={60}
            style={StyleSheet.absoluteFill}
            tint="dark"
          />
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            }}
            style={styles.posterOnBanner}
          />
        </View>
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
  bannerContainer: {
    width: width,
    marginBottom: 18,
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
    overflow: "hidden",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    backgroundColor: "#23232b",
    alignSelf: "center",
  },
  bannerBg: {
    width: width,
    height: POSTER_HEIGHT + 40,
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "cover",
    opacity: 0.5,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#18181c",
    opacity: 0.45,
    zIndex: 1,
  },
  bannerFadeTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    zIndex: 2,
  },
  bannerFadeBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    zIndex: 2,
  },
  posterOnBanner: {
    width: width - 40,
    height: POSTER_HEIGHT,
    borderRadius: 24,
    resizeMode: "cover",
    marginBottom: 0,
    marginTop: 12,
    backgroundColor: "#23232b",
    zIndex: 3,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
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
