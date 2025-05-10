import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ArrowLeft,
  Download,
  ExternalLink,
  Heart,
  Play,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFavoritesStore } from "../../store/favoritesStore";
import {
  getMovieDetailsSelector,
  getRecommendedMoviesSelector,
  useMovieStore,
} from "../../store/movieStore";

const { width } = Dimensions.get("window");
const POSTER_HEIGHT = width * 0.9;
const CARD_WIDTH = (width - 56) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

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
  const getRecommendedMovies = useMovieStore(getRecommendedMoviesSelector);
  const [movie, setMovie] = useState<any>(null);
  const [recommendedMovies, setRecommendedMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const isFavorite = useFavoritesStore((s) => s.isFavorite(movie?.id));
  const addFavorite = useFavoritesStore((s) => s.addFavorite);
  const removeFavorite = useFavoritesStore((s) => s.removeFavorite);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const [movieData, recommendedData] = await Promise.all([
          getMovieDetails(Number(id)),
          getRecommendedMovies(Number(id)),
        ]);
        setMovie(movieData);
        setRecommendedMovies(recommendedData);
      } catch (err) {
        setError("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [id]);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{ paddingBottom: 32 }}
        >
          {/* Header row skeleton */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 8,
              marginBottom: 12,
              paddingHorizontal: 16,
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#23232b",
                borderRadius: 16,
              }}
            />
            <View
              style={{
                width: 40,
                height: 40,
                backgroundColor: "#23232b",
                borderRadius: 16,
              }}
            />
          </View>
          {/* Banner with poster skeleton */}
          <View
            style={{
              width,
              alignItems: "center",
              marginBottom: 18,
              position: "relative",
              borderBottomLeftRadius: 32,
              borderBottomRightRadius: 32,
              overflow: "hidden",
              backgroundColor: "#23232b",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                width,
                height: POSTER_HEIGHT + 40,
                backgroundColor: "#23232b",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />
            <View
              style={{
                width: width - 40,
                height: POSTER_HEIGHT,
                backgroundColor: "#333",
                borderRadius: 24,
                marginTop: 12,
                alignSelf: "center",
                opacity: 0.5,
              }}
            />
          </View>
          {/* Title skeleton */}
          <View
            style={{
              width: width * 0.6,
              height: 28,
              backgroundColor: "#23232b",
              borderRadius: 8,
              alignSelf: "center",
              marginBottom: 8,
              opacity: 0.5,
            }}
          />
          {/* Meta row skeleton */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <View
              style={{
                width: 60,
                height: 16,
                backgroundColor: "#23232b",
                borderRadius: 8,
                marginHorizontal: 4,
                opacity: 0.5,
              }}
            />
            <View
              style={{
                width: 60,
                height: 16,
                backgroundColor: "#23232b",
                borderRadius: 8,
                marginHorizontal: 4,
                opacity: 0.5,
              }}
            />
            <View
              style={{
                width: 60,
                height: 16,
                backgroundColor: "#23232b",
                borderRadius: 8,
                marginHorizontal: 4,
                opacity: 0.5,
              }}
            />
          </View>
          {/* Stars skeleton */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            {[...Array(5)].map((_, i) => (
              <View
                key={i}
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: "#23232b",
                  borderRadius: 10,
                  marginRight: 2,
                  opacity: 0.5,
                }}
              />
            ))}
          </View>
          {/* Action row skeleton */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginBottom: 16,
            }}
          >
            <View
              style={{
                width: 48,
                height: 48,
                backgroundColor: "#23232b",
                borderRadius: 16,
                marginHorizontal: 6,
                opacity: 0.5,
              }}
            />
            <View
              style={{
                width: 48,
                height: 48,
                backgroundColor: "#23232b",
                borderRadius: 16,
                marginHorizontal: 6,
                opacity: 0.5,
              }}
            />
          </View>
          {/* Watch Now button skeleton */}
          <View
            style={{
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
              opacity: 0.3,
              width: 180,
              height: 48,
            }}
          />
          {/* Overview skeleton */}
          <View
            style={{
              width: width - 40,
              height: 80,
              backgroundColor: "#23232b",
              borderRadius: 12,
              marginHorizontal: 20,
              marginTop: 8,
              alignSelf: "center",
              opacity: 0.5,
            }}
          />
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || "Movie not found"}</Text>
      </View>
    );
  }

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
          <TouchableOpacity
            style={styles.iconBtn}
            onPress={() => {
              if (isFavorite) {
                removeFavorite(movie.id);
              } else {
                addFavorite(movie);
              }
            }}
          >
            {isFavorite ? (
              <Heart color="#e74c3c" size={22} fill="#e74c3c" />
            ) : (
              <Heart color="#fff" size={22} />
            )}
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

        {/* Recommended Movies Section */}
        {recommendedMovies.length > 0 && (
          <View style={styles.recommendedSection}>
            <Text style={styles.recommendedSectionTitle}>
              Recommended Movies
            </Text>
            <FlatList
              data={recommendedMovies}
              renderItem={renderRecommendedMovie}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              scrollEnabled={false}
              contentContainerStyle={styles.recommendedGrid}
            />
          </View>
        )}
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
