import React from "react";
import {
  Text,
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle,
} from "react-native";
import { GenericTouchableProps } from "react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

type EnvironmentButtonProps = {
  title: string;
  isSelected?: boolean;
} & GenericTouchableProps;

export const EnvironmentButton = (
  props: EnvironmentButtonProps,
) => {
  const isSelected = props.isSelected ?? false;

  return (
    <TouchableHighlight {...props}>
      <View style={containerStyle(isSelected)}>
        <Text style={textStyle(isSelected)}>
          {props.title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

function containerStyle(isSelected: boolean): ViewStyle {
  return {
    justifyContent: "center",
    // flexWrap: "nowrap",
    minWidth: 76,
    // maxWidth: "100%",
    height: 40,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: isSelected
      ? colors.green_light
      : colors.shape,
  };
}

function textStyle(isSelected: boolean): TextStyle {
  return {
    fontSize: 15,
    textAlign: "center",
    fontFamily: isSelected ? fonts.heading : fonts.text,
    color: isSelected ? colors.green_dark : colors.heading,
    // flexWrap: "nowrap",
  };
}
