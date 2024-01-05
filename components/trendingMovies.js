import { View, Text, TouchableWithoutFeedback } from "react-native";
import React from "react";

import Carousel from "react-native-snap-carousel";

export default function TrendingMovies({ data }) {
  if (!data) {
    return "no data available";
  }

  return (
    <View className="mb-8">
      <Text className="text-white text-xl mx-4 mb-5">Trending </Text>
      <Carousel
        data={data}
        firstItem={1}
        inactiveSlideOpacity={0.6}
        sliderWidth={600}
        itemWidth={400}
        slideStyle={{ display: "flex", alignItems: "center" }}
        renderItem={({ item }) => <MovieCard item={item} />}
      />
    </View>
  );
}

const MovieCard = ({ item }) => {
  return (
    <TouchableWithoutFeedback>
      <Text className="text-white"> Movie</Text>
    </TouchableWithoutFeedback>
  );
};
