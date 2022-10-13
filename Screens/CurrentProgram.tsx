import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

import { useStore } from "../Stores/EventStore";

interface CurrentProgramProps {}

const CurrentProgram = (props: CurrentProgramProps) => {
  const places = useStore((state) => state.places);
  const timeSlots = useStore((state) => state.timeSlots);

  return (
    <View>
      <Text>CurrentProgram</Text>
    </View>
  );
};

export default CurrentProgram;
