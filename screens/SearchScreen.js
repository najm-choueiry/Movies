import {
  View,
  Text,
  Dimensions,
  TextInput,
  Platform,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { XMarkIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

var { width, height } = Dimensions.get("window");
const ios = Platform.OS == "ios";

const TopMargin = ios ? " " : "mt-2";

export default function SearchScreen() {
  const navigation = useNavigation();
  const [results, setResults] = useState([1, 2, 3, 4, 5]);

  const searchInputRef = useRef(null);

  useEffect(() => {
    searchInputRef.current.focus();
  }, []);

  return (
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        className="space-y-3"
      >
        <Text className="text-white font-semibold ml-1">
          Results {results.length}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
