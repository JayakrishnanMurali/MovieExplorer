import { Compass, Heart, Home } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const TABS = [
  {
    key: "home",
    label: "Home",
    icon: /* @ts-ignore */ <Home color="#fff" stroke="#fff" size={24} />,
  },
  {
    key: "explore",
    label: "Explore",
    icon: /* @ts-ignore */ <Compass color="#fff" stroke="#fff" size={24} />,
  },
  {
    key: "favorites",
    label: "Favorites",
    icon: /* @ts-ignore */ <Heart color="#fff" stroke="#fff" size={24} />,
  },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = activeTab === tab.key;
        return (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, isActive && styles.tabActive]}
            onPress={() => onTabChange(tab.key)}
            activeOpacity={0.8}
          >
            {tab.icon}
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#18181c",
    paddingVertical: 10,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderRadius: 24,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  tab: {
    alignItems: "center",
    padding: 8,
    flex: 1,
    borderRadius: 16,
  },
  tabActive: {
    backgroundColor: "#23232b",
  },
  label: {
    color: "#bbb",
    fontSize: 13,
    marginTop: 2,
    fontWeight: "500",
  },
  labelActive: {
    color: "#fff",
    fontWeight: "bold",
  },
});
