import { act, renderHook } from "@testing-library/react-hooks"
import { assign } from "lodash"
import { environmentAll } from "../components/Environment/EnvironmentButtonList"
import * as api from "../services/api"
import { PlantFactory } from "../services/__test__/models"
import { EnvironmentFactory, environments } from "../services/__test__/models"
import {
  initialState,
  usePlantSelectorState,
  State,
} from "./PlantSelectorState"
import { loadFeature, defineFeature } from "jest-cucumber"

const feature = loadFeature("./src/pages/PlantSlectorState.feature")

let { sut, state, waitForValueToChange } = {} as ReturnType<typeof aux.setup>

defineFeature(feature, scenario => {
  beforeEach(() => {
    ;({ sut, state, waitForValueToChange } = aux.setup())
  })

  scenario("First successful data load", ({ given, when, then }) => {
    given("state is 'initialState'", () => {
      expect(state()).toMatchObject(initialState)
    })

    when("the first server response arrives with success", async () => {
      await aux.waitForSuccessfullResponse()
    })

    then("should have filter with all plants", () => {
      expect(state().environments.length).toEqual(5)
      expect(state().selectedEnvironment).toMatchObject(environmentAll)
      expect(state().filteredPlants).toBe(state().plants)
    })
  })

  scenario("Selecting an environment", ({ given, when, then }) => {
    let previousState: State

    given("it has succesfully loaded data", async () => {
      await aux.waitForSuccessfullResponse()
      previousState = state()
    })

    when("I select the 'bathroom' environment", () => {
      act(() => sut().selectEnvironment(bathroom))
    })

    then("should show just plants of that environment", () => {
      expect(state()).toMatchObject({
        ...previousState,
        selectedEnvironment: bathroom,
        filteredPlants: aux.getBathroomPlants(previousState),
      })
    })
  })
})

const bathroom = EnvironmentFactory.build({
  key: "bathroom",
})

const aux = {
  setup() {
    this.mockServices()

    const { result: r, waitForValueToChange } = renderHook(() =>
      usePlantSelectorState(),
    )
    const state = () => r.current.state
    const sut = () => r.current

    return { sut, state, waitForValueToChange }
  },

  async waitForSuccessfullResponse() {
    return waitForValueToChange(() => state().requestState === "success", {
      timeout: 3000,
    })
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
