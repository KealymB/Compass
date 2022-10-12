import React, { useRef } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import LottieView from "lottie-react-native";

interface ErrorProps {
  type: "Empty";
  title: string;
}

const Error = (props: ErrorProps) => {
  const animation = useRef(null);
  const types = ["Empty"];
  const anims = [require("../assets/lottie/not-found.json")];

  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        ref={animation}
        style={styles.anim}
        source={anims[types.findIndex((item) => props.type == item)]}
      />
      <Text style={styles.errorText}>{props.title}</Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  container: { justifyContent: "center", alignItems: "center", flex: 1 },
  anim: {
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
