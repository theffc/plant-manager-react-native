import React from "react"
import { FlatList, ListRenderItemInfo } from "react-native"
import { Environment } from "../../services/models"
import { StyleProp } from "../../utils/ReactUtils"
import { EnvironmentButton } from "./EnvironmentButton"

export const environmentAll = {
  key: "all",
  title: "Todos",
}

type Props = {
  environments: Environment[]
  selected: Environment
  setSelected: (environment: Environment) => void
} & StyleProp

export const EnvironmentButtonList = (props: Props) => {
  const ListItem = (x: ListRenderItemInfo<Environment>) => (
    <EnvironmentButton
      title={`${x.item.title}`}
      isSelected={x.item.key === props.selected.key}
      style={{ marginLeft: x.index > 0 ? 6 : 0 }}
      onPress={() => props.setSelected(x.item)}
    ></EnvironmentButton>
  )

  return (
    <FlatList
      data={props.environments}
      renderItem={ListItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[{ overflow: "visible" }, props.style]}
    />
  )
}
