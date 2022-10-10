import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import dayjs from "dayjs";

import { Venue } from "../Utils/API";
import Ionicons from "@expo/vector-icons/Ionicons";
import theme from "../Utils/theme";

interface CardProps {
  startTime: string;
  endTime: string;
  day: string;
  location: Venue[];
  parent: string;
}

const Card = (props: CardProps) => {
  dayjs.locale("");
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="time-outline" size={24} color="black" />
        <Text>{props.day} </Text>
        <Text>
          {dayjs(props.startTime).format("HH:mm")} -{" "}
          {dayjs(props.endTime).format("HH:mm")}
        </Text>
      </View>
      <Text>Card</Text>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 120,
    backgroundColor: theme.colors.primary,
    padding: theme.basePadding,
    borderRadius: 10,
    marginBottom: theme.basePadding,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
