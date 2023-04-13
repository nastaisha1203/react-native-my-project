import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./screens/AuthNavigation";
import MainNavigation from "./screens/MainNavigator";

const useRoute = (isAuth) => {
  if (!isAuth) {
    return <AuthNavigation />;
  }
  return <MainNavigation />;
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Bold": require("./assets/Fonts/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/Fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/Fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }
  const routing = useRoute(true);
  return (
    <NavigationContainer>
      <View style={styles.container}>
        {routing}
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
