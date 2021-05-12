import { useNavigation } from "@react-navigation/core"
import React from "react"
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native"
import { Button } from "../components/Button"
import { Screens } from "../routes/Screens"
import colors from "../styles/colors"
import fonts from "../styles/fonts"

export function Confirmation() {
  const navigation = useNavigation()

  const navigateToPlantSelector = () =>
    navigation.navigate(Screens.plantSelector)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.emoji}>🥳</Text>

        <Text style={styles.title}>Prontinho</Text>

        <Text style={styles.subtitle}>
          Agora vamos começar a cuidar das suas plantinhas
          com muito cuidado.
        </Text>

        <Button
          title="Começar"
          onPress={navigateToPlantSelector}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  form: {
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    width: "70%",
  },

  emoji: {
    fontSize: 96,
    marginBottom: 64,
  },

  title: {
    textAlign: "center",
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginBottom: 16,
  },

  subtitle: {
    color: colors.body_dark,
    fontFamily: fonts.text,
    textAlign: "center",
    fontSize: 17,
    marginBottom: 40,
  },
})
