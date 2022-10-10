import * as React from "react";
import { Text, View, StyleSheet, Image } from "react-native";

interface ErrorProps {
  type: "Empty";
  title: string;
}

const Error = (props: ErrorProps) => {
  const types = ["Empty"];
  const images = [require("../assets/information/Not_found.png")];

  return (
    <View style={styles.container}>
      <Image
        source={images[types.findIndex((item) => props.type == item)]}
        style={styles.image}
      />
      <Text style={styles.errorText}>{props.title}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center" },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    overflow: "hidden",
  },
  errorText: {
    fontSize: 28,
    paddingTop: 8,
  },
});
