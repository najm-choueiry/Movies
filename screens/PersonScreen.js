import {
  View,
  Text,
  Dimensions,
  Platform,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HeartIcon } from "react-native-heroicons/solid";

import { styles } from "../theme";
import { useNavigation, useRoute } from "@react-navigation/native";
import MovieList from "../components/movieList";
import Loading from "../components/loading";
import {
  fallbackPersonImage,
  fetchPersonDetails,
  fetchPersonMovies,
  image342,
} from "../api/moviedb";

var { width, height } = Dimensions.get("window");

const ios = Platform.OS == "ios";
const verticalMargin = ios ? "w-11/12 ml-4" : "mt-14 mb-4  w-full";

export default function PersonScreen() {
  const { params: item } = useRoute();

  const [isFavorite, toggleFavorite] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const [person, setPerson] = useState([]);

  const [personMovies, setPersonMovies] = useState([]);

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
  }, [item]);

  const getPersonDetails = async (id) => {
    const data = await fetchPersonDetails(id);
    if (data) setPerson(data);
    setLoading(false);
  };
  // const getPersonDetails = async (id) => {
  //   const data = await fetchPersonMovies(id);
  // };

  return loading ? (
    <View className="flex-1 bg-neutral-900">
      <Loading />
    </View>
  ) : (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      {/* back button */}
      <SafeAreaView
        className={`z-20 flex-row  justify-between items-center px-4 ${verticalMargin}`}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.background}
          className="rounded-xl p-1"
        >
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => toggleFavorite(!isFavorite)}>
          <HeartIcon size="35" color={isFavorite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person details */}

      <View>
        <View
          className="flex-row justify-center"
          style={{
            shadowColor: "gray",
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1,
          }}
        >
          <View
            className="items-center rounded-full overflow-hidden h-72 w-72 border-2 border-neutral-500
        "
          >
            <Image
              source={{
                uri: image342(person.profile_path) || fallbackPersonImage,
              }}
              style={{ height: height * 0.43, width: width * 0.74 }}
            />
          </View>
        </View>
        <View className="mt-6">
          <Text className="text-3xl text-white font-bold text-center">
            {person?.name}
          </Text>
          <Text className="text-base text-neutral-500 text-center">
            {person?.place_of_birth}
          </Text>
        </View>

        <View className="mx-3 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full p-4">
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Gender</Text>
            <Text className="text-neutral-300 text-sm">
              {person?.gender == 1 ? "Female" : "Male"}
            </Text>
          </View>

          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Birthday</Text>
            <Text className="text-neutral-300 text-sm">
              {person?.birthday || "N/A"}
            </Text>
          </View>

          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">Known for</Text>
            <Text className="text-neutral-300 text-sm">
              {person?.known_for_department || "N/A"}
            </Text>
          </View>

          <View className="px-2 items-center">
            <Text className="text-white font-semibold">Popularity</Text>
            <Text className="text-neutral-300 text-sm">
              {person?.popularity?.toFixed(2)} %
            </Text>
          </View>
        </View>

        {/* bio */}
        <View className="my-6 mx-4 space-y-2">
          <Text className="text-white text-lg"> Biography</Text>
          <Text className="text-neutral-400 tracking-wide">
            Lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem
          </Text>
        </View>

        {/* movies of character*/}

        <MovieList data={personMovies} title="Movies" hideSeeAll={true} />
      </View>
    </ScrollView>
  );
}
