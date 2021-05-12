import React from "react"
import {
  KeyboardAvoidingView,
  Platform,
} from "react-native"

export const AvoidKeyboard: React.FunctionComponent = ({
  children,
}) => {
  const isIos = Platform.OS === "ios"
  return (
    <KeyboardAvoidingView
      enabled={isIos}
      behavior="position"
    >
      {children}
    </KeyboardAvoidingView>
  )
}
