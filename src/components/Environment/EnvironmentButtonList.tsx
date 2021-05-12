import React, { useEffect, useState } from "react";
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
} from "react-native";
import { api } from "../../services/api";
import {
  SetState,
  StyleProp,
} from "../../utils/ReactUtils";
import { Environment } from "../../services/models";
import { EnvironmentButton } from "./EnvironmentButton";

export const environmentAll = {
  key: "all",
  title: "Todos",
};

export const EnvironmentButtonList: React.FC<
  {
    selected: Environment;
    setSelected: (environment: Environment) => void;
  } & StyleProp
> = props => {
  const [environments, setEnvironments] = useState<
    Environment[]
  >([environmentAll]);

  useEffect(() => {
    async function fetchEnvironments() {
      const { data } = await api.get<Environment[]>(
        "plants_environments",
      );
      data.sort((a, b) => a.title.localeCompare(b.title));

      setEnvironments([environmentAll, ...data]);
    }

    fetchEnvironments();
  }, []);

  const ListItem = (x: ListRenderItemInfo<Environment>) => (
    <EnvironmentButton
      title={`${x.item.title}`}
      isSelected={x.item.key === props.selected.key}
      style={{ marginLeft: x.index > 0 ? 6 : 0 }}
      onPress={() => props.setSelected(x.item)}
    ></EnvironmentButton>
  );

  return (
    <FlatList
      data={environments}
      renderItem={ListItem}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[{ overflow: "visible" }, props.style]}
    />
  );
};
