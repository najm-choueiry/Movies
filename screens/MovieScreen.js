import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";
import { styles, theme } from "../theme";
import { LinearGradient } from "expo-linear-gradient";
import Cast from "../components/cast";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fallbackMoviePoster,
  fetchMovieDetails,
  image500,
} from "../api/moviedb";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";
const topMargin = ios ? "absolute mt-3" : "absolute mt-3";
const movieName = "The Big Bang Therory";

export default function MovieScreen() {
  const { params: item } = useRoute();

  const navigation = useNavigation();

  const [isFavorite, toggleFavorite] = useState(false);

  const [cast, setCast] = useState([]);

  const [similarMovies, setSimilarMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const [movie, setMovie] = useState({});
  useEffect(() => {
    setLoading(true);
    getMovieDetails(item.id);
  }, [item]);

  const getMovieDetails = async (id) => {
    const data = await fetchMovieDetails(id);
    if (data) setMovie(data);
    setLoading(false);
    console.log("data****** ", data);
  };

  return loading ? (
    <View className="flex-1 bg-neutral-900">
      <Loading />
    </View>
  ) : (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-neutral-900"
    >
      {/* back button and movie poster */}

      <>
        <View className="w-full ">
          <View>
            <Image
              source={{
                uri: image500(movie?.poster_path) || fallbackMoviePoster,
              }}
              style={{ width, height: height * 0.65 }}
            />
            <LinearGradient
              colors={["transparent", "rgba(23,23,23,0.8)", "rgba(23,23,23,1)"]}
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="bottom-0 absolute"
            />
          </View>
          <SafeAreaView
            className={`z-20 w-full flex-row justify-between items-center px-4 ${topMargin}`}
          >
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.background}
              className="rounded-xl p-1"
            >
              <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
              <HeartIcon
                size="35"
                color={isFavorite ? theme.background : "white"}
              />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        <View style={{ marginTop: -height * 0.09 }} className="space-y-3">
          <Text className="text-white text-center text-3xl font-bold tracking-wider">
            {movie?.original_title}
          </Text>

          <Text className="text-neutral-400 font-semibold text-base text-center">
            {movie?.status} • {movie?.release_date?.split("-")[0]} •{" "}
            {movie?.runtime} min
          </Text>

          {/* genres */}
          <View className="flex-row justify-center mx-4 space-x-2">
            <Text className="text-neutral-400 font-semibold text-base text-center">
              Action •
            </Text>
            <Text className="text-neutral-400 font-semibold text-base text-center">
              Thrill •
            </Text>
            <Text className="text-neutral-400 font-semibold text-base text-center">
              Comedy
            </Text>
          </View>

          {/* description */}
          <Text className="text-neutral-400 mx-4 tracking-wide">
            loran lorem lorem lorem loran lorem lorem lorem loran lorem lorem
            lorem loran lorem lorem lorem loran lorem lorem lorem loran lorem
            lorem lorem loran lorem lorem lorem loran lorem lorem lorem loran
            lorem lorem lorem loran lorem lorem lorem loran lorem lorem lorem
            loran lorem lorem lorem loran lorem lorem lorem loran lorem lorem
            lorem loran lorem lorem lorem loran lorem lorem lorem loran lorem
          </Text>
        </View>

        <Cast cast={cast} navigation={navigation} />

        <MovieList
          title="Similar Movies"
          data={similarMovies}
          hideSeeAll={true}
        />
      </>
    </ScrollView>
  );
}
