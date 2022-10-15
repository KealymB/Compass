import dayjs from "dayjs";
import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import theme from "../../Utils/theme";
import Toast from "react-native-toast-message";

type CardProps = {
  startTime: Date;
  endTime: Date;
  title: string;
  placeName: string;
};

const SessionCard = (props: CardProps) => {
  const showError = () => {
    Toast.show({
      type: "error",
      text1: "Error saving event",
      text2: "Calender permissions denied",
    });
  };

  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <Ionicons name="time-outline" size={12} color={theme.colors.tertiary} />
        <Text
          style={{
            fontSize: 12,
            color: theme.colors.tertiary,
            paddingLeft: 5,
          }}
        >
          {dayjs(props.startTime).tz("America/Toronto").format("ddd, HH:mm") +
            " - " +
            dayjs(props.endTime).tz("America/Toronto").format("HH:mm")}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: 16,
            color: "black",
          }}
          numberOfLines={1}
        >
          {props.title}
        </Text>
        <View style={{ flexDirection: "row", paddingTop: 5 }}>
          <Ionicons name="location-outline" size={16} color={"black"} />
          <Text
            style={{
              fontSize: 16,
              color: "black",
              paddingLeft: 5,
            }}
          >
            {props.placeName}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SessionCard;

const styles = StyleSheet.create({
  card: {
    flex: 4,
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 20,
    borderTopLeftRadius: 0,
    padding: theme.basePadding * 2,
    margin: theme.basePadding * 2,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  slot: {
    width: "100%",
    height: 120,
    flexDirection: "row",
  },
  timelineContainer: {
    flex: 1,
    alignItems: "center",
    paddingTop: theme.basePadding * 2,
  },
  circle: {
    height: 20,
    width: 20,
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.secondary,
    borderWidth: 3,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  calendarContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
});
