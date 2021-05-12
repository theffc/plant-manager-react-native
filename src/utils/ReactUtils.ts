import { Dispatch, SetStateAction } from "react"
import { StyleProp as RNStyleProp, ViewStyle } from "react-native"

export type SetState<T> = Dispatch<SetStateAction<T>>

export type StyleProp = {
  style?: RNStyleProp<ViewStyle>
}