import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import image from "../assets/profile.jpeg";
import { StyleProp } from "../utils/ReactUtils";

export const ProfileHeader: React.FunctionComponent<{
  name: string;
  style?: StyleProp;
}> = props => {
  return (
    <View style={[styles.container, props.style]}>
      <View>
        <Text style={styles.subtitle}>Olá,</Text>
        <Text style={styles.title}>{props.name}</Text>
      </View>

      <Image source={image} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 30,
    fontFamily: fonts.heading,
    color: colors.heading,
  },

  subtitle: {
    color: colors.body_dark,
    fontFamily: fonts.text,
    fontSize: 30,
  },

  image: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
});
