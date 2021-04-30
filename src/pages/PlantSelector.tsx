import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { EnvironmentButton } from "../components/EnvironmentButton";
import { ProfileHeader } from "../components/ProfileHeader";
import { api } from "../services/api";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

type Environment = {
  key: string;
  title: string;
};

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

      <FlatList
        data={environments}
        renderItem={x => (
          <EnvironmentButton
            title={`${x.item.title}`}
            style={x.index > 0 ? { marginLeft: 6 } : {}}
          ></EnvironmentButton>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ overflow: "visible" }}
      ></FlatList>

      <View
        style={{
          flexDirection: "row",
          // width: "100%",
          backgroundColor: colors.blue_light,
          marginTop: 20,
          // alignContent: "stretch",
          // alignItems: "stretch",
        }}
      >
        <EnvironmentButton title="Sala"></EnvironmentButton>

        <EnvironmentButton
          title="Cozinha"
          isSelected
        ></EnvironmentButton>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 30,
    justifyContent: "flex-start",
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
});
