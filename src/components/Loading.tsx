import LottieView from "lottie-react-native"
import React from "react"
import { View } from "react-native"
import loadAnimation from "./../assets/load.json"

export const Loading = () => (
  <View
    style={{
      justifyContent: "center",
      alignItems: "center",
      flexGrow: 1,
    }}
  >
    <LottieView
      source={loadAnimation}
      autoPlay
      loop
      style={{
        width: 200,
        height: 200,
        position: "absolute",
      }}
    />
  </View>
)
