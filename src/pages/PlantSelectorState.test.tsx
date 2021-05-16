import {
  renderHook,
  act,
} from "@testing-library/react-hooks"
import { usePlantSelectorState } from "./PlantSelectorState"

test("PlantSelectorState", async () => {
  const { result: r, waitForValueToChange } = renderHook(
    () => usePlantSelectorState(),
  )

  expect(r.current.state).toMatchInlineSnapshot(`
    Object {
      "environments": Array [
        Object {
          "key": "all",
          "title": "Todos",
        },
      ],
      "filteredPlants": Array [],
      "isLoading": true,
      "plants": Array [],
      "selectedEnvironment": Object {
        "key": "all",
        "title": "Todos",
      },
    }
  `)

  await waitForValueToChange(
    () => r.current.state.isLoading,
    { timeout: 3000 },
  )

  act(() => {
    r.current.selectEnvironment({
      key: "Banheiro",
      title: "",
    })
  })

  expect(r.current.state.environments.length > 1)
  expect(r.current.state.filteredPlants.length === 3)
})
