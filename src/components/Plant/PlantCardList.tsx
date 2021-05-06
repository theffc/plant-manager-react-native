import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { api } from "../../services/api";
import colors from "../../styles/colors";
import { StyleProp } from "../../utils/ReactUtils";
import { Plant } from "../../services/models";
import { PlantCard } from "./PlantCard";

export const PlantCardList: React.FC<
  { plants: Plant[] } & StyleProp
> = props => {
  return (
    <FlatList
      style={props.style}
      data={props.plants}
      renderItem={x => (
        <PlantCard {...x.item} style={cardStyle(x.index)} />
      )}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
    />
  );
};

const styles = StyleSheet.create({
  content: {
    paddingBottom: 10,
  },

  row: {
    justifyContent: "space-evenly",
  },
});

function cardStyle(index: number): ViewStyle {
  return {
    marginTop: index > 1 ? 12 : 0,
  };
}
