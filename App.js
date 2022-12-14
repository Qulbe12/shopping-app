import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import MyCart from "./src/screens/MyCart";
import ProductInfo from "./src/screens/ProductInfo";
import Form from "./src/screens/Form";
import { NativeBaseProvider } from "native-base"

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
      <NativeBaseProvider>
    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MyCart" component={MyCart} />
        <Stack.Screen name="ProductInfo" component={ProductInfo} />
        <Stack.Screen name="Form" component={Form} />
      </Stack.Navigator>

    </NavigationContainer>
      </NativeBaseProvider>

  );
}
