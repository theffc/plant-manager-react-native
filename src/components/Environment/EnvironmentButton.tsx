import React from "react"
import {
  Text,
  TextStyle,
  View,
  ViewStyle,
  TouchableWithoutFeedback,
} from "react-native"
// import { TouchableWithoutFeedback } from "react-native-gesture-handler"
// import { GenericTouchableProps } from "react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable"
import colors from "../../styles/colors"
import fonts from "../../styles/fonts"
import { StyleProp } from "../../utils/ReactUtils"

type Props = {
  title: string
  isSelected?: boolean
  onPress: () => void
} & StyleProp

export const EnvironmentButton = (props: Props) => {
  const isSelected = props.isSelected ?? false

  return (
    <TouchableWithoutFeedback {...props}>
      <View style={[containerStyle(isSelected), props.style]}>
        <Text style={textStyle(isSelected)}>{props.title}</Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

function containerStyle(isSelected: boolean): ViewStyle {
  return {
    justifyContent: "center",
    // flexWrap: "nowrap",
    minWidth: 76,
    // maxWidth: "100%",
    height: 40,
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: isSelected ? colors.green_light : colors.shape,
  }
}

function textStyle(isSelected: boolean): TextStyle {
  return {
    fontSize: 15,
    textAlign: "center",
    fontFamily: isSelected ? fonts.heading : fonts.text,
    color: isSelected ? colors.green_dark : colors.heading,
    // flexWrap: "nowrap",
  }
}
