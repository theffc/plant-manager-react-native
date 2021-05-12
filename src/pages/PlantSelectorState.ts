import { useEffect, useState } from "react"
import { environmentAll } from "../components/Environment/EnvironmentButtonList"
import { api } from "../services/api"
import { Environment, Plant } from "./../services/models"

const initialState = {
  environments: [environmentAll],
  selectedEnvironment: environmentAll,

  plants: [] as Plant[],
  filteredPlants: [] as Plant[],

  isLoading: true,
}

type State = typeof initialState

export const usePlantSelectorState = () => {
  const [state, _setState] = useState(initialState)

  useEffect(() => {
    _fetchData()
  }, [])

  async function _fetchData() {
    const allServices = await Promise.all([
      api.get<Plant[]>("plants"),
      api.get<Environment[]>("plants_environments"),
    ])

    const [{ data: plants }, { data: environments }] =
      allServices

    plants.sort((a, b) => a.name.localeCompare(b.name))

    environments.sort((a, b) =>
      a.title.localeCompare(b.title),
    )

    _setPartialState({
      environments: [environmentAll, ...environments],
      plants: plants,
      filteredPlants: plants,
      isLoading: false,
    })
  }

  function selectEnvironment(environment: Environment) {
    _setPartialState({
      selectedEnvironment: environment,
      filteredPlants: _filterPlants(environment),
    })
  }

  function _filterPlants(environment: Environment) {
    if (environment === environmentAll) {
      return state.plants
    }

    return state.plants.filter(x =>
      x.environments.includes(environment.key),
    )
  }

  function _setPartialState(newState: Partial<State>) {
    _setState(prev => ({
      ...prev,
      ...newState,
    }))
  }

  return {
    state,
    selectEnvironment,
  }
}

type Action =
  | {
      type: "didSelectEnvironment"
      environment: Environment
    }
  | { type: "didLoadPlants" }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "didSelectEnvironment":
      return {
        ...state,
        selectedEnvironment: action.environment,
        filteredPlants: filterPlants(action.environment),
      }
  }

  function filterPlants(environment: Environment) {
    if (environment === environmentAll) {
      return state.plants
    }

    return state.plants.filter(x =>
      x.environments.includes(environment.key),
    )
  }

  async function fetchPlants() {
    const { data } = await api.get<Plant[]>("plants")
    data.sort((a, b) => a.name.localeCompare(b.name))
    return data
  }

  return initialState
}
