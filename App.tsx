import {
  Jost_400Regular,
  Jost_600SemiBold,
  Jost_700Bold,
  useFonts,
} from "@expo-google-fonts/jost";
import AppLoading from "expo-app-loading";
import React from "react";
import { StyleSheet } from "react-native";
import { Navigation } from "./src/routes";

export default function App() {
  const [isFontLoaded] = useFonts({
    Jost_600SemiBold,
    Jost_400Regular,
    Jost_700Bold,
  });

  if (!isFontLoaded) {
    return <AppLoading />;
  }

  return <Navigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
