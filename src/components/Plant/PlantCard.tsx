import React from "react"
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native"
import { GenericTouchableProps } from "react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable"
import { SvgFromUri } from "react-native-svg"
import colors from "../../styles/colors"
import fonts from "../../styles/fonts"

type Props = {
  name: string
  photo: string
} & GenericTouchableProps

export const PlantCard = (props: Props) => {
  return (
    <TouchableHighlight {...props}>
      <View style={styles.card}>
        <SvgFromUri
          style={styles.image}
          uri={props.photo}
        />
        <Text style={styles.text} numberOfLines={2}>
          {props.name}
        </Text>
      </View>
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  card: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    paddingHorizontal: 15,
    backgroundColor: colors.shape,
    padding: 20,
    height: 160,
    aspectRatio: 1,
  },

  image: {
    height: 90,
    width: 70,
    marginBottom: 12,
    flexGrow: 1,
    flexShrink: 999,
    overflow: "hidden",
  },

  text: {
    fontSize: 15,
    textAlign: "center",
    fontFamily: fonts.heading,
    color: colors.heading,
    flexWrap: "wrap",
  },
})
