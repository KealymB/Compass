import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { TimeSlot } from "../../Types/FetchRequests";
import TimeSlots from "../TimeSlots";
import Header from "./Header";

interface ProgramViewerProps {
  selected: "DROPDOWN" | "FILTER";
  title: string;
  options: TimeSlot[];
  events: TimeSlot[];
  selectedDate: Date;
}

const ProgramViewer = (props: ProgramViewerProps) => {
  return (
    <View style={styles.container}>
      <TimeSlots schedule={props.events} selectedDate={props.selectedDate} />
    </View>
  );
};

export default ProgramViewer;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
