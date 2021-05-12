import { useEffect, useState } from "react";
import { environmentAll } from "../components/Environment/EnvironmentButtonList";
import { api } from "../services/api";
import { Environment, Plant } from "./../services/models";

const initialState = {
  environments: [environmentAll],
  selectedEnvironment: environmentAll,

  plants: [] as Plant[],
  filteredPlants: [] as Plant[],

  isLoading: true,
};

type State = typeof initialState;

export const usePlantSelectorState = () => {
  const [state, setState] = useState(initialState);
  function setPartialState(newState: Partial<State>) {
    setState(prev => ({
      ...prev,
      ...newState
    }))
  }

  useEffect(() => { _fetchPlants() }, []);

  async function _fetchPlants() {
    const { data } = await api.get<Plant[]>("plants");
    data.sort((a, b) => a.name.localeCompare(b.name));
    setPartialState({
      plants: data,
      filteredPlants: data,
      isLoading: false
    })
  }

  function selectEnvironment(environment: Environment) {
    setPartialState({
      selectedEnvironment: environment,
      filteredPlants: _filterPlants(environment)
    });
  };

  function _filterPlants(environment: Environment) {
    if (environment === environmentAll) {
      return state.plants;
    }

    return state.plants.filter(x =>
      x.environments.includes(environment.key),
    );
  }

  return {
    state,
    selectEnvironment
  }
}

type Action =
  | {
      type: "didSelectEnvironment";
      environment: Environment;
    }
  | { type: "didLoadPlants" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "didSelectEnvironment":
      return {
        ...state,
        selectedEnvironment: action.environment,
        filteredPlants: filterPlants(action.environment),
      };
  }

  function filterPlants(environment: Environment) {
    if (environment === environmentAll) {
      return state.plants;
    }

    return state.plants.filter(x =>
      x.environments.includes(environment.key),
    );
  }

  async function fetchPlants() {
    const { data } = await api.get<Plant[]>("plants");
    data.sort((a, b) => a.name.localeCompare(b.name));
    return data;
  }

  return initialState;
}