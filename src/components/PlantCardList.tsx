import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { api } from "../services/api";
import colors from "../styles/colors";
import { StyleProp } from "../utils/ReactUtils";
import { Plant } from "./../services/models";
import { PlantCard } from "./PlantCard";

export const PlantCardList: React.FunctionComponent<StyleProp> = props => {
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    async function fetchPlants() {
      const { data } = await api.get("plants");
      setPlants(data);
    }

    fetchPlants();
  }, []);

  return (
    <FlatList
      style={[styles.list, props.style]}
      data={plants}
      renderItem={x => (
        <PlantCard {...x.item} style={cardStyle(x.index)} />
      )}
      numColumns={2}
      contentContainerStyle={styles.content}
      columnWrapperStyle={styles.row}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    backgroundColor: colors.red,
  },

  content: {
    margin: 8,
    backgroundColor: colors.blue,
  },

  row: {
    flexDirection: "row",
    margin: 8,
    backgroundColor: colors.green_light,
    justifyContent: "space-around",
    // alignContent: "space-between",
  },
});

function cardStyle(index: number): ViewStyle {
  return {
    margin: 8,
    // marginTop: index > 1 ? 6 : 8,
    borderWidth: 1,
    borderColor: colors.gray,
  };
}
