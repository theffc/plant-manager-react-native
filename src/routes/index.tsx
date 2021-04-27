import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Confirmation } from "../pages/Confirmation";
import { UserIdentification } from "../pages/UserIdentification";
import { Welcome } from "../pages/Welcome";
import colors from "../styles/colors";

export const Screens = {
  welcome: {
    name: "Welcome",
    component: Welcome,
    params: {},
  },

  userIdentification: {
    name: "UserIdentification",
    component: UserIdentification,
    params: {},
  },

  confirmation: {
    name: "Confirmation",
    component: Confirmation,
    params: {},
  },
};

const Stack = createStackNavigator();

export const Navigation = () => (
  <NavigationContainer>
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Stack.Screen {...Screens.welcome} />
      <Stack.Screen {...Screens.userIdentification} />
      <Stack.Screen {...Screens.confirmation} />
    </Stack.Navigator>
  </NavigationContainer>
);
