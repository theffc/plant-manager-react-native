import { useEffect, useState } from "react"
import { environmentAll } from "../components/Environment/EnvironmentButtonList"
import {
  fetchEnvironments,
  fetchPlants,
} from "../services/api"
import { Environment, Plant } from "./../services/models"

const initialState = {
  environments: [environmentAll],
  selectedEnvironment: environmentAll,

  plants: [] as Plant[],
  filteredPlants: [] as Plant[],

  requestState: "loading" as
    | "loading"
    | "error"
    | "success",
}

type State = typeof initialState

export const usePlantSelectorState = () => {
  const [state, _setState] = useState(initialState)

  useEffect(() => {
    _fetchData()
  }, [])

  async function _fetchData() {
    let allServices
    try {
      allServices = await Promise.all([
        fetchPlants(),
        fetchEnvironments(),
      ])
    } catch {
      _setPartialState({
        requestState: "error",
      })
      return
    }

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
      requestState: "success",
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
