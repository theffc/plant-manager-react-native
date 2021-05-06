import React from "react";
import {
  Button,
  ButtonProps,
  StyleSheet,
  Text,
  TextStyle,
  Touchable,
  TouchableHighlight,
  View,
  ViewStyle,
} from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { SvgFromUri } from "react-native-svg";

import { GenericTouchableProps } from "react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable";

type PlantCardProps = {
  name: string;
  photo: string;
} & GenericTouchableProps;

export const PlantCard = (props: PlantCardProps) => {
  return (
    <TouchableHighlight {...props}>
      <View style={styles.card}>
        <SvgFromUri
          style={styles.image}
          uri={props.photo}
          height={90}
          width={70}
        />
        <Text style={styles.text} numberOfLines={2}>
          {props.name}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: colors.shape,
    padding: 20,
    // flexWrap: "wrap",
    maxHeight: 160,
    aspectRatio: 1,
  },

  image: {
    // resizeMode: "center",
    height: 90,
    width: 70,
    marginBottom: 12,
    flexShrink: 1,
    overflow: "hidden",
  },

  text: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: fonts.heading,
    color: colors.heading,
    flexWrap: "wrap",
  },
});
