import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SearchResultCard } from "../../components/movie/SearchResultCard";

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
      <Text style={styles.title}>Search Results for &ldquo;{q}&rdquo;</Text>
      <FlatList
        data={results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SearchResultCard
            movie={item}
            onPress={() => router.push(`/movie/${item.id}`)}
          />
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
  emptyText: {
    color: "#bbb",
    fontSize: 16,
    textAlign: "center",
    marginTop: 40,
  },
});
