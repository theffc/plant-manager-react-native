import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { merge } from "lodash"
import React from "react"
import { Confirmation } from "../pages/Confirmation"
import { PlantSelector } from "../pages/PlantSelector"
import { UserIdentification } from "../pages/UserIdentification"
import { Welcome } from "../pages/Welcome"
import colors from "../styles/colors"
import { Screens } from "./Screens"

const Stack = createStackNavigator()

export const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName={Screens.welcome.name}
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      {stackedScreens()}
    </Stack.Navigator>
  </NavigationContainer>
)

const stackedScreens = () =>
  routesWithComponents.map(x => <Stack.Screen {...x} key={x.name} />)

type Routes = Array<{
  name: string
  params: Record<string, unknown>
  component: () => JSX.Element
}>

// just created to avoid import cycles
const routesWithComponents: Routes = (function () {
  const components = {
    welcome: {
      component: Welcome,
    },
    confirmation: {
      component: Confirmation,
    },
    userIdentification: {
      component: UserIdentification,
    },
    plantSelector: {
      component: PlantSelector,
    },
  }

  return Object.values(merge(components, Screens))
})()
