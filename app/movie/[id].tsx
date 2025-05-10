import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Download, Heart, Play, Share2 } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MovieBanner } from "../../components/movie/MovieBanner";
import { MovieDetailSkeleton } from "../../components/movie/MovieDetailSkeleton";
import { RecommendedMovies } from "../../components/movie/RecommendedMovies";
import { useFavoritesStore } from "../../store/favoritesStore";
import {
  getMovieDetailsSelector,
  getRecommendedMoviesSelector,
  useMovieStore,
} from "../../store/movieStore";
import getStars from "../../utils/rating";

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
        setError(
          `Failed to load movie details: ${
            err instanceof Error ? err.message : "Unknown error"
          }`
        );
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [id, getMovieDetails, getRecommendedMovies]);

  const handleShare = async () => {
    try {
      const shareMessage = `${movie.title} (${new Date(
        movie.release_date
      ).getFullYear()})\n\n${
        movie.overview
      }\n\nRating: ${movie.vote_average.toFixed(
        1
      )}/10\n\nCheck it out on Movie Explorer!`;

      await Share.share({
        message: shareMessage,
        title: movie.title,
        url: `https://www.themoviedb.org/movie/${movie.id}`,
      });
    } catch (error) {
      console.error("Error sharing movie:", error);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <MovieDetailSkeleton />
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

        <MovieBanner posterPath={movie.poster_path} />

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
        <View style={styles.starsRow}>
          {getStars(movie.vote_average).map(
            (star: React.ReactElement, index: number) => (
              <React.Fragment key={index}>{star}</React.Fragment>
            )
          )}
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.actionBtn}>
            <Download color="#fff" size={20} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn} onPress={handleShare}>
            <Share2 color="#fff" size={20} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.watchBtn} activeOpacity={0.9}>
          <Play color="#fff" size={20} style={{ marginRight: 8 }} />
          <Text style={styles.watchBtnText}>Watch Now</Text>
        </TouchableOpacity>
        <Text style={styles.overview}>{movie.overview}</Text>

        <RecommendedMovies movies={recommendedMovies} />
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
