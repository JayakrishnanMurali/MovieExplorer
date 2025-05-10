import { Dimensions, StyleSheet, View } from "react-native";

const { width, height } = Dimensions.get("window");

export function SkeletonCarousel() {
  return (
    <View style={styles.container}>
      {[1, 2, 3].map((i) => (
        <View key={i} style={styles.card}>
          <View style={styles.content} />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingLeft: 20,
  },
  card: {
    width: width * 0.82,
    height: height * 0.44,
    backgroundColor: "#23232b",
    borderRadius: 28,
    marginRight: 24,
    opacity: 0.5,
    overflow: "hidden",
  },
  content: {
    flex: 1,
    backgroundColor: "#333",
    opacity: 0.2,
  },
});
