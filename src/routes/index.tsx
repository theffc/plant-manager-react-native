import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { merge } from "lodash";
import React from "react";
import { Confirmation } from "../pages/Confirmation";
import { UserIdentification } from "../pages/UserIdentification";
import { Welcome } from "../pages/Welcome";
import colors from "../styles/colors";
import { Screens } from "./Screens";

const Stack = createStackNavigator();

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
      {allScreens()}
    </Stack.Navigator>
  </NavigationContainer>
);

const allScreens = () =>
  Object.values(screensWithComponents).map(x => (
    <Stack.Screen {...x} key={x.name} />
  ));

// specially created to avoid import cycles
const screensWithComponents = (function () {
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
  };

  // const mergeWithoutUsingLodash = {
  //   confirmation: {
  //     ...Screens.confirmation,
  //     component: Confirmation,
  //   },

  //   welcome: {
  //     ...Screens.welcome,
  //     component: Welcome,
  //   },

  //   userIdentification: {
  //     ...Screens.userIdentification,
  //     component: UserIdentification
  //   }
  // };

  return merge(components, Screens);
})();
