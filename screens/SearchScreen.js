import {
  View,
  Text,
  Dimensions,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/loading";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

const TopMargin = ios ? " " : "mt-2";

const movieName = "Big Bang theoryyyyyyyyyyyyyyy";

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([1, 2, 3, 4, 5]);
  const [loading, setLoading] = useState(false);

  const searchInputRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      searchInputRef.current.focus();
    }
  }, []);

  return loading ? (
    <View className="flex-1 bg-neutral-900">
      <Loading />
    </View>
  ) : (
    <SafeAreaView className="bg-neutral-800 flex-1">
      <View
        className={`mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full ${TopMargin}`}
      >
        <TextInput
          placeholder="Search Movie"
          placeholderTextColor={"lightgray"}
          className={`pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider`}
          ref={searchInputRef}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-neutral-500"
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {/* results */}
      {results.length < 1 ? (
        <View className="flex-row justify-center">
          <Image
            source={require("../assets/images/movieTime.png")}
            className="h-96 w-96"
          />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          className="space-y-3"
        >
          <Text className="text-white font-semibold ml-1">
            Results {results.length}
          </Text>
          <View className="flex-row justify-between flex-wrap">
            {results.map((item, index) => {
              return (
                <TouchableWithoutFeedback
                  key={index}
                  onPress={() => navigation.push("Movie", item)}
                >
                  <View className="space-y-2 mb-4">
                    <Image
                      className="rounded-3xl"
                      source={require("../assets/images/moviePoster2.png")}
                      style={{ width: width * 0.44, height: height * 0.3 }}
                    />
                    <Text className="text-neutral-300 ml-1">
                      {movieName.length > 22
                        ? movieName.slice(0, 22) + "..."
                        : movieName}
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}
