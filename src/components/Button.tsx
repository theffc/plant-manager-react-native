import React from "react"
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"
import colors from "../styles/colors"
import fonts from "../styles/fonts"

interface ButtonProps extends TouchableOpacityProps {
  title: string
}

export function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    padding: 12,
    minWidth: 230,
    minHeight: 56,
  },

  text: {
    fontSize: 17,
    color: colors.white,
    fontFamily: fonts.text,
    textAlign: "center",
  },
})
