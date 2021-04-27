import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AvoidKeyboard } from "../components/AvoidKeyboard";
import { Button } from "../components/Button";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function UserIdentification() {
  const isEditing = useState(false);
  const name = useState<string>();
  const navigation = useNavigation();

  const isInputFilled = () => name[0] !== "";

  const shouldHighlight = () =>
    isEditing[0] || isInputFilled();

  const navigateToConfirmation = () =>
    navigation.navigate("Confirmation");

  return (
    <SafeAreaView
      style={styles.container}
      onTouchStart={isEditing && Keyboard.dismiss}
    >
      <AvoidKeyboard>
        <View style={styles.form}>
          <Text style={styles.text}>
            Como podemos chamar você?
          </Text>

          <Text style={styles.emoji}>
            {isInputFilled() ? "😄" : "🤔"}
          </Text>

          <TextInput
            style={[
              styles.input,
              shouldHighlight() && {
                borderColor: colors.green,
              },
            ]}
            placeholder="Digite um nome"
            onFocus={() => isEditing[1](true)}
            onBlur={() => {
              isEditing[1](false);
            }}
            onChangeText={name[1]}
          />

          <Button
            title="Confirmar"
            onPress={navigateToConfirmation}
          />
        </View>
      </AvoidKeyboard>
    </SafeAreaView>
  );
}

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
});
