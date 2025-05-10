import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { GENRE_LIST } from "../../constants/genres";

const { height } = Dimensions.get("window");

interface GenreFilterSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (id: number) => void;
  selectedGenre: number;
  sheetAnim: Animated.Value;
}

export function GenreFilterSheet({
  visible,
  onClose,
  onSelect,
  selectedGenre,
  sheetAnim,
}: GenreFilterSheetProps) {
  if (!visible) return null;

  const translateY = sheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [height, 0],
  });

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.backdrop} onPress={onClose} />
      <Animated.View
        style={[
          styles.sheet,
          {
            transform: [{ translateY }],
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Select Genre</Text>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          {GENRE_LIST.map((genre) => (
            <TouchableOpacity
              key={genre.id}
              style={[
                styles.genreButton,
                selectedGenre === genre.id && styles.selectedGenre,
              ]}
              onPress={() => onSelect(genre.id)}
            >
              <Text
                style={[
                  styles.genreText,
                  selectedGenre === genre.id && styles.selectedGenreText,
                ]}
              >
                {genre.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sheet: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#1a1a1a",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: height * 0.8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  closeButton: {
    color: "#f5c518",
    fontSize: 16,
  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  genreButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#2a2a2a",
    marginBottom: 8,
  },
  selectedGenre: {
    backgroundColor: "#f5c518",
  },
  genreText: {
    color: "#fff",
    fontSize: 14,
  },
  selectedGenreText: {
    color: "#000",
  },
});
