import { Dimensions, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");
const CARD_HEIGHT = height * 0.38;

export function FavoritesSkeleton() {
  return (
    <View style={styles.container}>
      {[0, 1, 2].map((i) => (
        <View key={i} style={styles.skeletonCard} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  skeletonCard: {
    width: width - 32,
    height: CARD_HEIGHT,
    backgroundColor: "#23232b",
    borderRadius: 28,
    marginBottom: 24,
    opacity: 0.5,
  },
});
