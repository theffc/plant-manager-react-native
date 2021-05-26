import {
  act,
  renderHook,
} from "@testing-library/react-hooks"
import { assign } from "lodash"
import { environmentAll } from "../components/Environment/EnvironmentButtonList"
import * as api from "../services/api"
import { PlantFactory } from "../services/__test__/models"
import {
  EnvironmentFactory,
  environments,
} from "../services/__test__/models"
import {
  initialState,
  usePlantSelectorState,
  State,
} from "./PlantSelectorState"

_mockServices()

const { result: r, waitForValueToChange } = renderHook(() =>
  usePlantSelectorState(),
)
const state = () => r.current.state
const sut = () => r.current

test("PlantSelectorState", async () => {
  // Given
  expect(state()).toMatchObject(initialState)

  // When
  await waitForValueToChange(
    () => state().requestState === "success",
    { timeout: 3000 },
  )

  // Then
  assertions.shouldHaveFilterWithAllPlants()

  // Given
  const beforeFilterState = state()

  // When
  act(() => sut().selectEnvironment(bathroom))

  // Then
  assertions.shouldPreserveInvariantProperties(
    state(),
    beforeFilterState,
  )

  expect(state().filteredPlants.length).toEqual(2)
  expect(state().selectedEnvironment).toEqual(bathroom)
})

const assertions = {
  shouldHaveFilterWithAllPlants() {
    expect(state().environments.length).toEqual(5)
    expect(state().selectedEnvironment).toMatchObject(
      environmentAll,
    )
    expect(state().filteredPlants).toBe(state().plants)
  },

  shouldPreserveInvariantProperties(
    state: State,
    previousState: State,
  ) {
    const getInvariant = (state: State) => {
      const {
        filteredPlants,
        selectedEnvironment,
        ...invariant
      } = state
      return invariant
    }

    expect(getInvariant(state)).toMatchObject(
      getInvariant(previousState),
    )
  },
}

const bathroom = EnvironmentFactory.build({
  key: "bathroom",
})

function _mockServices() {
  const plant = PlantFactory.extend({
    environments: [bathroom.key],
  }).build()

  const plantNotInBathroom = assign({}, plant, {
    environments: [],
  })

  jest
    .spyOn(api, "fetchPlants")
    .mockReturnValue(
      Promise.resolve([plant, plantNotInBathroom, plant]),
    )

  jest
    .spyOn(api, "fetchEnvironments")
    .mockReturnValue(Promise.resolve(environments))
}
