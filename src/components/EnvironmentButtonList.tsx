import { merge } from "lodash";
import React from "react";
import { FlatList, ViewProps } from "react-native";
import { Environment } from "./../services/models";
import { StyleProp } from "../utils/ReactUtils";
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
          style={x.index > 0 ? { marginLeft: 6 } : {}}
        ></EnvironmentButton>
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[
        { overflow: "visible", height: 40 },
        props.style,
      ]}
    />
  );
};
