import React from "react"
import { FlatList, StyleSheet, ViewStyle } from "react-native"
import { Plant } from "../../services/models"
import { StyleProp } from "../../utils/ReactUtils"
import { PlantCard } from "./PlantCard"

type Props = {
  plants: Plant[]
} & StyleProp

export const PlantCardList = (props: Props) => {
  return (
    <FlatList
      style={props.style}
      data={props.plants}
      renderItem={x => <PlantCard {...x.item} style={cardStyle(x.index)} />}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.content}
    />
  )
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 10,
  },

  row: {
    justifyContent: "space-evenly",
  },
})

function cardStyle(index: number): ViewStyle {
  return {
    marginTop: index > 1 ? 12 : 0,
  }
}
