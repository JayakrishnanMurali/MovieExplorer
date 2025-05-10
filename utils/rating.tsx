import * as React from "react";
import { Text } from "react-native";

const getStars = (rating: number): React.ReactElement[] => {
  const stars: React.ReactElement[] = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Text
        key={i}
        style={{
          color: i <= Math.round(rating / 2) ? "#f5c518" : "#444",
          fontSize: 20,
          marginRight: 2,
        }}
      >
        ★
      </Text>
    );
  }
  return stars;
};

export default getStars;
