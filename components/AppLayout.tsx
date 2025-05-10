import React, { ReactNode } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomNav from "./BottomNav";

interface AppLayoutProps {
  children: ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  topSafeAreaColor?: string;
}

export default function AppLayout({
  children,
  activeTab,
  onTabChange,
  topSafeAreaColor = "#18181c",
}: AppLayoutProps) {
  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: topSafeAreaColor }]}
      edges={["top", "left", "right"]}
    >
      <View style={styles.container}>{children}</View>
      <View style={styles.floatingNavWrapper}>
        <BottomNav activeTab={activeTab} onTabChange={onTabChange} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1, backgroundColor: "#18181c" },
  floatingNavWrapper: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: Platform.OS === "ios" ? 32 : 16,
    borderRadius: 28,
    backgroundColor: "#23232b",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
    padding: 0,
  },
});
