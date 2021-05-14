import { useNavigation } from "@react-navigation/core"
import React, { useState } from "react"
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native"
import { AvoidKeyboard } from "../components/AvoidKeyboard"
import { Button } from "../components/Button"
import { Screens } from "../routes/Screens"
import colors from "../styles/colors"
import fonts from "../styles/fonts"
import { SetState } from "../utils/ReactUtils"

export function UserIdentification() {
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState<string>("")
  const navigation = useNavigation()

  const isInputFilled = () => name.length >= 3

  const navigateToConfirmation = () =>
    navigation.navigate(Screens.confirmation)

  return (
    <SafeAreaView
      style={styles.container}
      onTouchStart={Keyboard.dismiss}
    >
      <AvoidKeyboard>
        <View style={styles.form}>
          <Text style={styles.text}>
            Como podemos chamar você?
          </Text>

          <Text style={styles.emoji}>
            {isInputFilled() ? "😄" : "🤔"}
          </Text>

          <NameInput
            setName={setName}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />

          <Button
            title="Confirmar"
            onPress={navigateToConfirmation}
            isEnabled={isInputFilled()}
          />
        </View>
      </AvoidKeyboard>
    </SafeAreaView>
  )
}

const NameInput = (props: {
  setName: SetState<string>
  isEditing: boolean
  setIsEditing: SetState<boolean>
}) => (
  <TextInput
    style={[
      styles.input,
      props.isEditing && {
        borderColor: colors.green,
      },
    ]}
    placeholder="Digite um nome"
    onFocus={() => props.setIsEditing(true)}
    onBlur={() => props.setIsEditing(false)}
    onChangeText={props.setName}
    selectionColor={colors.green}
  />
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },

  form: {
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    width: "70%",
  },

  text: {
    marginTop: 24,
    width: "100%",
    textAlign: "center",
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginBottom: 10,
  },

  emoji: {
    fontSize: 44,
    marginBottom: 40,
  },

  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.body_light,
    fontFamily: fonts.text,
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 18,
    marginBottom: 40,
  },
})
