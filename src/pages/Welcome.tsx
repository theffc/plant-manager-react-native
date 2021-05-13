import { useNavigation } from "@react-navigation/core"
import React from "react"
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import wateringImg from "../assets/watering.png"
import { ButtonNext } from "../components/ButtonNext"
import { Screens } from "../routes/Screens"
import colors from "../styles/colors"
import fonts from "../styles/fonts"

export function Welcome() {
  const navigation = useNavigation()

  function navigateToUserIdentification() {
    navigation.navigate(Screens.userIdentification)
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
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
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 15,
    marginVertical: 20,
  },

  title: {
    fontSize: 28,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginHorizontal: "10%",
    marginTop: 20,
  },

  image: {
    maxHeight: Dimensions.get("window").height * 0.5,
    flexShrink: 99,
  },

  subtitle: {
    fontSize: 18,
    textAlign: "center",
    color: colors.heading,
    paddingHorizontal: 20,
    fontFamily: fonts.text,
  },
})
