import { useNavigation } from "@react-navigation/core";
import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import wateringImg from "../assets/watering.png";
import { ButtonNext } from "../components/ButtonNext";
import { Screens } from "../routes";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Welcome() {
  const navigation = useNavigation();

  function navigateToUserIdentification() {
    navigation.navigate(Screens.userIdentification);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie suas plantas de forma fácil
        </Text>

        <Image
          style={styles.image}
          source={wateringImg}
          resizeMode="contain"
        />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas. Nós
          cuidamos de lembrar você sempre que precisar.
        </Text>

        <ButtonNext
          title=">"
          onPress={navigateToUserIdentification}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 15,
  },

  image: {
    height: Dimensions.get("window").width * 0.7,
  },

  title: {
    fontSize: 28,
    textAlign: "center",
    color: colors.heading,
    margin: 38,
    fontFamily: fonts.heading,
    lineHeight: 34,
    marginHorizontal: "20%",
  },

  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: colors.heading,
    paddingHorizontal: 20,
    fontFamily: fonts.text,
  },
});
