import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");
const POSTER_HEIGHT = width * 0.9;

interface MovieBannerProps {
  posterPath: string;
}

export function MovieBanner({ posterPath }: MovieBannerProps) {
  return (
    <View style={styles.bannerContainer}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${posterPath}`,
        }}
        style={styles.bannerBg}
        blurRadius={2}
      />
      <View style={styles.bannerOverlay} />
      <LinearGradient
        colors={["#18181c", "transparent"]}
        style={styles.bannerFadeTop}
        pointerEvents="none"
      />
      <LinearGradient
        colors={["transparent", "#18181c"]}
        style={styles.bannerFadeBottom}
        pointerEvents="none"
      />
      <BlurView intensity={60} style={StyleSheet.absoluteFill} tint="dark" />
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${posterPath}`,
        }}
        style={styles.posterOnBanner}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    width,
    marginBottom: 18,
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
    overflow: "hidden",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    backgroundColor: "#23232b",
    alignSelf: "center",
  },
  bannerBg: {
    width,
    height: POSTER_HEIGHT + 40,
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "cover",
    opacity: 0.5,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#18181c",
    opacity: 0.45,
    zIndex: 1,
  },
  bannerFadeTop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 80,
    zIndex: 2,
  },
  bannerFadeBottom: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
    zIndex: 2,
  },
  posterOnBanner: {
    width: width - 40,
    height: POSTER_HEIGHT,
    borderRadius: 24,
    resizeMode: "cover",
    marginBottom: 0,
    marginTop: 12,
    backgroundColor: "#23232b",
    zIndex: 3,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
});
