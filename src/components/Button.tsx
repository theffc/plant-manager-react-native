import React from "react"
import {
  ButtonProps as RNProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native"
import colors from "../styles/colors"
import fonts from "../styles/fonts"

type ButtonProps = {
  title: string
  isEnabled?: boolean
  onPress: RNProps["onPress"]
}

export function Button(props: ButtonProps) {
  const isEnabled = props.isEnabled ?? true

  return (
    <TouchableOpacity
      style={containerStyle(isEnabled)}
      disabled={!isEnabled}
      activeOpacity={0.8}
      {...props}
    >
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 17,
    color: colors.white,
    fontFamily: fonts.text,
    textAlign: "center",
  },
})

function containerStyle(isEnabled: boolean): ViewStyle {
  return {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    padding: 12,
    minWidth: 230,
    minHeight: 56,
    backgroundColor: colors.green,
    opacity: isEnabled ? 1.0 : 0.5,
  }
}
