import { Entypo } from "@expo/vector-icons"
import React from "react"
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native"
import colors from "../styles/colors"

interface ButtonNextProps extends TouchableOpacityProps {
  title: string
}

export function ButtonNext(props: ButtonNextProps) {
  return (
    <TouchableOpacity
      {...props}
      style={[styles.button, props.style]}
      activeOpacity={0.7}
    >
      <Entypo name="chevron-right" style={styles.icon} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 12,
    width: 56,
    height: 56,
  },

  icon: {
    fontSize: 28,
    color: colors.white,
  },
})
