import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Animated,
  Button,
  ToastAndroid,
  AsyncStorage,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLOURS, Items } from "../components/Database";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";

const ProductInfo = ({ route, navigation }) => {
  const { productID } = route.params;
  const [product, setproduct] = useState({});

  const width = Dimensions.get("window").width;

  const scrollX = new Animated.Value(0);

  let position = Animated.divide(scrollX, width);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getDataFromDB();
    });
  }, [navigation]);

  const getDataFromDB = () => {
    Items.map((item) => {
      if (item.id == productID) {
        setproduct(item);
        return;
      }
    });
  };

  const addToCart = async (id) => {
    let itemArray = await AsyncStorage.getItem("cartItems");
    console.log("itemArray", itemArray);
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "item added successfully to cart",
          ToastAndroid.SHORT
        );
        navigation.navigate("Home");
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(array));
        ToastAndroid.show(
          "item added successfully to cart",
          ToastAndroid.SHORT
        );
        navigation.navigate("Home");
      } catch (error) {
        return error;
      }
    }
  };

  const renderProduct = ({ item, i }) => {
    return (
      <View
        style={{
          width: width,
          height: 240,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          source={item}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
          }}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: COLOURS.white,
        position: "relative",
      }}
    >
      <StatusBar
        backgroundColor={COLOURS.backgroundLight}
        barStyle="dark-content"
      />

      <ScrollView>
        <View
          style={{
            width: "100%",
            backgroundColor: COLOURS.backgroundLight,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            position: "relative",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: 47,
          }}
        >
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 16,
              paddingLeft: 16,
            }}
          >
            <TouchableOpacity onPress={() => navigation.goBack("Home")}>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 18,
                  color: COLOURS.backgroundDark,
                  padding: 12,
                  backgroundColor: COLOURS.white,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={product.productImageList ? product.productImageList : null}
            horizontal
            renderItem={renderProduct}
            showsHorizontalScrollIndicator={false}
            decelerationRate={0.8}
            snapToInterval={width}
            bounces={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
          />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 16,
              marginTop: 32,
            }}
          >
            {product.productImageList
              ? product.productImageList.map((data, index) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: "clamp",
                  });
                  return (
                    <Animated.View
                      key={index}
                      style={{
                        width: "16%",
                        height: 2.4,
                        backgroundColor: COLOURS.black,
                        opacity,
                        marginHorizontal: 4,
                        borderRadius: 100,
                      }}
                    ></Animated.View>
                  );
                })
              : null}
          </View>
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 6,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 14,
            }}
          >
            <Entypo
              name="shopping-cart"
              style={{
                fontSize: 18,
                color: COLOURS.blue,
                marginRight: 6,
              }}
            />
            <Text
              style={{
                fontSize: 12,
                color: COLOURS.black,
              }}
            >
              Shopping
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 4,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 24,
                fontWeight: "600",
                letterSpacing: 0.5,
                marginVertical: 4,
                color: COLOURS.black,
                maxWidth: "84%",
              }}
            >
              {product.productName}
            </Text>
            <Ionicons
              name="link-outline"
              style={{
                fontSize: 24,
                color: COLOURS.blue,
                backgroundColor: COLOURS.blue + 10,
                padding: 8,
                borderRadius: 100,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 12,
              color: COLOURS.black,
              fontWeight: "400",
              letterSpacing: 1,
              opacity: 0.5,
              lineHeight: 20,
              maxWidth: "85%",
              maxHeight: 44,
              marginBottom: 18,
            }}
          >
            {product.description}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginVertical: 14,
              borderBottomColor: COLOURS.backgroundLight,
              borderBottomWidth: 1,
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "80%",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  color: COLOURS.blue,
                  backgroundColor: COLOURS.backgroundLight,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 12,
                  borderRadius: 100,
                  marginRight: 10,
                }}
              >
                <Entypo
                  name="location-pin"
                  style={{
                    fontSize: 16,
                    color: COLOURS.blue,
                  }}
                />
              </View>
              <Text>Rustaveli Ave 57,{"\n"}17-001 , Batume</Text>
            </View>
            <Entypo
              name="chevron-right"
              style={{
                fontSize: 12,
                color: COLOURS.blue,
              }}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "500",
                maxWidth: "85%",
                color: COLOURS.black,
                marginBottom: 4,
              }}
            >
              &#8377; {product.productPrice}.00
            </Text>
            <Text>
              Tax Rate 2%~ &#8377; {product.productPrice / 20} (&#7377;{" "}
              {product.productPrice + product.productPrice / 20})
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => (product.isAvailable ? addToCart(product.id) : null)}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                padding: 16,
                backgroundColor: COLOURS.blue,
                borderRadius: 20,
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "500",
                  letterSpacing: 1,
                  color: COLOURS.white,
                  textTransform: "uppercase",
                }}
              >
                {product.isAvailable ? "Add to cart" : "Not Avialable"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductInfo;
