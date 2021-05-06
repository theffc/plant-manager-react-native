import React from "react";
import { FlatList } from "react-native";
import { StyleProp } from "../utils/ReactUtils";
import { Environment } from "./../services/models";
import { EnvironmentButton } from "./EnvironmentButton";

export const EnvironmentButtonList: React.FunctionComponent<
  {
    environments: Environment[];
  } & StyleProp
> = props => {
  return (
    <FlatList
      data={props.environments}
      renderItem={x => (
        <EnvironmentButton
          title={`${x.item.title}`}
          style={{ marginLeft: x.index > 0 ? 6 : 0 }}
        ></EnvironmentButton>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[{ overflow: "visible" }, props.style]}
    />
  );
};
