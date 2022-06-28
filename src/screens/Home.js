import { View, StatusBar, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { COLOURS } from "../components/Database";
import Entypo from "react-native-vector-icons";

const Home = () => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
      }}
    >
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 16,
          }}
        >
          <TouchableOpacity></TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
