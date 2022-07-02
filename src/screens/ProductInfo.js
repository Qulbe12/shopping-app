import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { COLOURS, Items } from "../components/Database";
import Entypo from "react-native-vector-icons/Entypo";

const ProductInfo = ({ route, navigation }) => {
  const { productID } = route.params;
  const [product, setproduct] = useState({});

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

  const renderProduct = () => {
    return <Text>Product</Text>;
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
              width: "10%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: 16,
              paddingLeft: 16,
            }}
          >
            <TouchableOpacity>
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
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductInfo;
