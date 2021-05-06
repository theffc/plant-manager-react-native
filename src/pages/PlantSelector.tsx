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
      <View style={styles.margin}>
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
      </View>

      <PlantCardList style={styles.plants} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  margin: {
    marginHorizontal: 20,
  },

  question: {
    marginTop: 25,
    marginBottom: 15,
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
    marginBottom: 25,
  },

  plants: {
    flexShrink: 99,
  },
});
