import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import TrendingMovies from "../components/trendingMovies";
import MovieList from "../components/movieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";
import { fetchTrendingMovies } from "../api/moviedb";

const ios = Platform.OS == "ios";

export default function HomeScreen() {
  const [trending, setTrending] = useState([1, 2, 3, 4]);

  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    // console.log(data);
    if (data && data.results) setTrending(data.results);
  };

  return (
    <>
      <View className="flex-1 bg-neutral-800">
        {/* search bar and logo */}
        <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
          <StatusBar style="light" />
          <View className="flex-row justify-between items-center mx-4">
            <Bars3BottomLeftIcon size="30" strokeWidth={2} color="white" />
            <Text className="text-white text-3xl font-bold">
              <Text style={styles.text}>M</Text>ovies
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
              <MagnifyingGlassIcon color="white" size="30" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>

        {loading ? (
          <Loading />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          >
            {/* trending movies  */}
            <TrendingMovies data={trending} />

            {/* upcoming movies row */}
            <MovieList title="Upcoming" data={upcoming} />

            {/* top rated movies row */}
            <MovieList title="Top Rated" data={topRated} />
          </ScrollView>
        )}
      </View>
    </>
  );
}
