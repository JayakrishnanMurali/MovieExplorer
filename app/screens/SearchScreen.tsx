import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function SearchScreen() {
  const { q } = useLocalSearchParams();
  const router = useRouter();

  const { data: results = [], isLoading } = useQuery({
    queryKey: ["search", q],
    queryFn: async () => {
      if (!q) return [];
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.EXPO_PUBLIC_TMDB_API_KEY
        }&query=${encodeURIComponent(q as string)}`
      );
      return res.data.results;
    },
    enabled: !!q,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Results for "{q}"</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.resultCard}
            onPress={() => router.push(`/movie/${item.id}`)}
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              }}
              style={styles.poster}
            />
            <View style={styles.info}>
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text style={styles.year}>
                {new Date(item.release_date).getFullYear()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          !isLoading ? (
            <Text style={styles.emptyText}>No results found.</Text>
          ) : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#18181c",
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
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
  emptyText: {
    color: "#bbb",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
});
