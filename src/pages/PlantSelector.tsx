import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  environmentAll,
  EnvironmentButtonList,
} from "../components/Environment/EnvironmentButtonList";
import { Loading } from "../components/Loading";
import { PlantCardList } from "../components/Plant/PlantCardList";
import { ProfileHeader } from "../components/ProfileHeader";
import { api } from "../services/api";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { Environment, Plant } from "./../services/models";

export function PlantSelector() {
  const [
    selectedEnvironment,
    setSelectedEnvironment,
  ] = useState<Environment>(environmentAll);

  const [plants, setPlants] = useState<Plant[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<
    Plant[]
  >([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPlants() {
      const { data } = await api.get<Plant[]>("plants");
      data.sort((a, b) => a.name.localeCompare(b.name));
      setPlants(data);
      setIsLoading(false);
    }

    fetchPlants();
  }, []);

  useEffect(() => {
    console.log("bla");
    if (selectedEnvironment === environmentAll) {
      setFilteredPlants(plants);
      return;
    }

    const filtered = plants.filter(x =>
      x.environments.includes(selectedEnvironment.key),
    );
    setFilteredPlants(filtered);
  }, [selectedEnvironment, plants]);

  if (isLoading) {
    return <Loading></Loading>;
  }

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
          selected={selectedEnvironment}
          setSelected={setSelectedEnvironment}
          style={styles.environments}
        />
      </View>

      <PlantCardList
        plants={filteredPlants}
        style={styles.plants}
      />
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
