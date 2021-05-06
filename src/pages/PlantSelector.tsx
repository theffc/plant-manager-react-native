import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { EnvironmentButtonList } from "../components/EnvironmentButtonList";
import { PlantCardList } from "../components/PlantCardList";
import { ProfileHeader } from "../components/ProfileHeader";
import { api } from "../services/api";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { Environment, Plant } from "./../services/models";

export function PlantSelector() {
  const [environments, setEnvironments] = useState<
    Environment[]
  >([]);

  useEffect(() => {
    async function fetchEnvironments() {
      const { data } = await api.get("plants_environments");

      setEnvironments([
        {
          key: "all",
          title: "Todos",
        },
        ...data,
      ]);
    }

    fetchEnvironments();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader name="Tiago" />

      <View style={styles.question}>
        <Text style={styles.first}>Em qual ambiente</Text>
        <Text style={styles.second}>
          Você quer colocar sua planta?
        </Text>
      </View>

      <EnvironmentButtonList
        environments={environments}
        style={styles.environments}
      />

      <PlantCardList style={styles.plants} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: colors.blue_light,
    flex: 1,
  },

  question: {
    marginTop: 30,
    marginBottom: 30,
  },

  first: {
    fontFamily: fonts.heading,
    color: colors.heading,
    fontSize: 17,
  },

  second: {
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
  },

  environments: {
    marginBottom: 20,
  },

  plants: {
    marginBottom: 10,
  },
});
