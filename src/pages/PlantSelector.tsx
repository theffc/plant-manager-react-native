import React from "react"
import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import { EnvironmentButtonList } from "../components/Environment/EnvironmentButtonList"
import { Loading } from "../components/Loading"
import { PlantCardList } from "../components/Plant/PlantCardList"
import { ProfileHeader } from "../components/ProfileHeader"
import colors from "../styles/colors"
import fonts from "../styles/fonts"
import { usePlantSelectorState } from "./PlantSelectorState"

export function PlantSelector() {
  const { state, selectEnvironment } = usePlantSelectorState()

  if (state.requestState === "loading") {
    return <Loading></Loading>
  }

  if (state.requestState === "error") {
    return <Text>Error</Text>
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.margin}>
        <ProfileHeader name="Tiago" />

        <View style={styles.question}>
          <Text style={styles.first}>Em qual ambiente</Text>
          <Text style={styles.second}>Você quer colocar sua planta?</Text>
        </View>

        <EnvironmentButtonList
          environments={state.environments}
          selected={state.selectedEnvironment}
          setSelected={selectEnvironment}
          style={styles.environments}
        />
      </View>

      <PlantCardList plants={state.filteredPlants} style={styles.plants} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  margin: {
    marginHorizontal: 20,
  },

  question: {
    marginTop: 20,
    marginBottom: 10,
  },

  first: {
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 16,
  },

  second: {
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 15,
  },

  environments: {
    marginBottom: 25,
  },

  plants: {
    flexShrink: 99,
  },
})
