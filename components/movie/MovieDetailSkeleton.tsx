import React from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");
const POSTER_HEIGHT = width * 0.9;

export function MovieDetailSkeleton() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      {/* Header row skeleton */}
      <View style={styles.headerRow}>
        <View style={styles.iconBtn} />
        <View style={styles.iconBtn} />
      </View>
      {/* Banner with poster skeleton */}
      <View style={styles.bannerContainer}>
        <View style={styles.bannerBg} />
        <View style={styles.posterSkeleton} />
      </View>
      {/* Title skeleton */}
      <View style={styles.titleSkeleton} />
      {/* Meta row skeleton */}
      <View style={styles.metaRow}>
        <View style={styles.metaSkeleton} />
        <View style={styles.metaSkeleton} />
        <View style={styles.metaSkeleton} />
      </View>
      {/* Stars skeleton */}
      <View style={styles.starsRow}>
        {[...Array(5)].map((_, i) => (
          <View key={i} style={styles.starSkeleton} />
        ))}
      </View>
      {/* Action row skeleton */}
      <View style={styles.actionRow}>
        <View style={styles.actionBtn} />
        <View style={styles.actionBtn} />
      </View>
      {/* Watch Now button skeleton */}
      <View style={styles.watchBtn} />
      {/* Overview skeleton */}
      <View style={styles.overviewSkeleton} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 40,
    height: 40,
    backgroundColor: "#23232b",
    borderRadius: 16,
  },
  bannerContainer: {
    width,
    alignItems: "center",
    marginBottom: 18,
    position: "relative",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: "hidden",
    backgroundColor: "#23232b",
    alignSelf: "center",
  },
  bannerBg: {
    width,
    height: POSTER_HEIGHT + 40,
    backgroundColor: "#23232b",
    position: "absolute",
    top: 0,
    left: 0,
  },
  posterSkeleton: {
    width: width - 40,
    height: POSTER_HEIGHT,
    backgroundColor: "#333",
    borderRadius: 24,
    marginTop: 12,
    alignSelf: "center",
    opacity: 0.5,
  },
  titleSkeleton: {
    width: width * 0.6,
    height: 28,
    backgroundColor: "#23232b",
    borderRadius: 8,
    alignSelf: "center",
    marginBottom: 8,
    opacity: 0.5,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  metaSkeleton: {
    width: 60,
    height: 16,
    backgroundColor: "#23232b",
    borderRadius: 8,
    marginHorizontal: 4,
    opacity: 0.5,
  },
  starsRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  starSkeleton: {
    width: 20,
    height: 20,
    backgroundColor: "#23232b",
    borderRadius: 10,
    marginRight: 2,
    opacity: 0.5,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  actionBtn: {
    width: 48,
    height: 48,
    backgroundColor: "#23232b",
    borderRadius: 16,
    marginHorizontal: 6,
    opacity: 0.5,
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
    opacity: 0.3,
    width: 180,
    height: 48,
  },
  overviewSkeleton: {
    width: width - 40,
    height: 80,
    backgroundColor: "#23232b",
    borderRadius: 12,
    marginHorizontal: 20,
    marginTop: 8,
    alignSelf: "center",
    opacity: 0.5,
  },
});
