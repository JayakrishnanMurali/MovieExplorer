import { Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 56) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

export function GridSkeleton() {
  return (
    <View style={styles.grid}>
      {[...Array(6)].map((_, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.poster} />
          <View style={styles.info}>
            <View style={styles.title} />
            <View style={styles.genre} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    margin: 8,
    borderRadius: 12,
    backgroundColor: "#1a1a1a",
    overflow: "hidden",
  },
  poster: {
    width: "100%",
    height: "80%",
    backgroundColor: "#2a2a2a",
  },
  info: {
    padding: 8,
    flex: 1,
    justifyContent: "space-between",
  },
  title: {
    height: 16,
    backgroundColor: "#2a2a2a",
    borderRadius: 4,
    marginBottom: 4,
  },
  genre: {
    height: 12,
    backgroundColor: "#2a2a2a",
    borderRadius: 4,
    width: "60%",
  },
});
