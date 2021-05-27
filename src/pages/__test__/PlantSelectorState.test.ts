import { act, renderHook } from "@testing-library/react-hooks"
import { assign } from "lodash"
import { environmentAll } from "../../components/Environment/EnvironmentButtonList"
import * as api from "../../services/api"
import {
  bathroom,
  environments,
  PlantFactory,
} from "../../services/__test__/models"
import {
  initialState,
  State,
  usePlantSelectorState,
} from "../PlantSelectorState"

let { sut, state, waitForValueToChange } = {} as ReturnType<typeof aux.setup>

describe("Plant Selector State", () => {
  beforeEach(() => {
    ;({ sut, state, waitForValueToChange } = aux.setup())
  })

  test("First successful data load", async () => {
    Given.isInInitialState()

    await When.waitForSuccessfullResponse()

    Then.shouldDisplayAllPlants()
  })

  test("Selecting an environment", async () => {
    // Given
    await When.waitForSuccessfullResponse()
    const previousState = state()

    // When
    act(() => sut().selectEnvironment(bathroom))

    // Then
    Then.shouldShowJustBathroomPlants(previousState)
  })
})

// Auxiliaries

const Given = {
  isInInitialState() {
    expect(state()).toMatchObject(initialState)
  },
}

const Then = {
  shouldDisplayAllPlants() {
    expect(state().environments).toEqual([environmentAll, ...environments])
    expect(state().selectedEnvironment).toMatchObject(environmentAll)
    expect(state().filteredPlants).toBe(state().plants)
  },

  shouldShowJustBathroomPlants(previous: State) {
    expect(state()).toMatchObject({
      ...previous,
      selectedEnvironment: bathroom,
      filteredPlants: aux.getBathroomPlants(previous),
    })
  },
}

const When = {
  async waitForSuccessfullResponse() {
    return waitForValueToChange(() => state().requestState === "success", {
      timeout: 3000,
    })
  },
}

const aux = {
  setup() {
    this.mockServices()

    const { result: r, waitForValueToChange } = renderHook(() =>
      usePlantSelectorState(),
    )

    return {
      state: () => r.current.state,
      sut: () => r.current,
      waitForValueToChange,
    }
  },

  mockServices() {
    const plant = PlantFactory.extend({
      environments: [bathroom.key],
    }).build()

    const plantNotInBathroom = assign({}, plant, {
      environments: [],
    })

    jest
      .spyOn(api, "fetchPlants")
      .mockReturnValue(Promise.resolve([plant, plantNotInBathroom, plant]))

    jest
      .spyOn(api, "fetchEnvironments")
      .mockReturnValue(Promise.resolve(environments))
  },

  getBathroomPlants(state: State) {
    return state.plants.filter(p => p.environments.includes(bathroom.key))
  },
}
