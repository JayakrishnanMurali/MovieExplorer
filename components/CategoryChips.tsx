import { Drama, Film, Ghost, Heart, Laugh, Star } from "lucide-react-native";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const GENRES = [
  {
    id: 28,
    name: "Action",
    icon: /* @ts-ignore */ <Film color="#fff" stroke="#fff" size={18} />,
  },
  {
    id: 35,
    name: "Comedy",
    icon: /* @ts-ignore */ <Laugh color="#fff" stroke="#fff" size={18} />,
  },
  {
    id: 27,
    name: "Horror",
    icon: /* @ts-ignore */ <Ghost color="#fff" stroke="#fff" size={18} />,
  },
  {
    id: 10749,
    name: "Romance",
    icon: /* @ts-ignore */ <Heart color="#fff" stroke="#fff" size={18} />,
  },
  {
    id: 18,
    name: "Drama",
    icon: /* @ts-ignore */ <Drama color="#fff" stroke="#fff" size={18} />,
  },
  {
    id: 0,
    name: "All",
    icon: /* @ts-ignore */ <Star color="#fff" stroke="#fff" size={18} />,
  },
];

interface CategoryChipsProps {
  selectedGenre: number;
  onSelect: (genreId: number) => void;
}

export default function CategoryChips({
  selectedGenre,
  onSelect,
}: CategoryChipsProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>Categories</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chipRow}
      >
        {GENRES.map((genre) => (
          <TouchableOpacity
            key={genre.id}
            style={[
              styles.chip,
              selectedGenre === genre.id && styles.chipSelected,
            ]}
            onPress={() => onSelect(genre.id)}
            activeOpacity={0.8}
          >
            {genre.icon}
            <Text
              style={[
                styles.chipText,
                selectedGenre === genre.id && styles.chipTextSelected,
              ]}
            >
              {genre.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 20,
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
  },
  chipRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#23232b",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "transparent",
  },
  chipSelected: {
    backgroundColor: "#fff",
    borderColor: "#f5c518",
  },
  chipText: {
    color: "#fff",
    fontSize: 15,
    marginLeft: 6,
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#23232b",
    fontWeight: "bold",
  },
});
