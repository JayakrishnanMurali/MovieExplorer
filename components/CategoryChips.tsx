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
    icon: Film,
  },
  {
    id: 35,
    name: "Comedy",
    icon: Laugh,
  },
  {
    id: 27,
    name: "Horror",
    icon: Ghost,
  },
  {
    id: 10749,
    name: "Romance",
    icon: Heart,
  },
  {
    id: 18,
    name: "Drama",
    icon: Drama,
  },
  {
    id: 0,
    name: "All",
    icon: Star,
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
        {GENRES.map((genre) => {
          const Icon = genre.icon;
          const isSelected = selectedGenre === genre.id;
          return (
            <TouchableOpacity
              key={genre.id}
              style={[styles.chip, isSelected && styles.chipSelected]}
              onPress={() => onSelect(genre.id)}
              activeOpacity={0.8}
            >
              {/* @ts-ignore */}
              <Icon
                color={isSelected ? "#23232b" : "#fff"}
                stroke={isSelected ? "#23232b" : "#fff"}
                size={18}
              />
              <Text
                style={[styles.chipText, isSelected && styles.chipTextSelected]}
              >
                {genre.name}
              </Text>
            </TouchableOpacity>
          );
        })}
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
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "transparent",
    minHeight: 40,
    minWidth: 80,
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
