import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Button } from "../components/Button";
import { ProfileHeader } from "../components/ProfileHeader";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function PlantSelector() {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader name="Tiago" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
  },
});
