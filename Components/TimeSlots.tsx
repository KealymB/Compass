import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Timeline } from "react-native-just-timeline";
import Ionicons from "@expo/vector-icons/Ionicons";

import { TimeSlot } from "../Types/FetchRequests";
import theme from "../Utils/theme";
import { useStore } from "../Stores/EventStore";

type timeSlot = {};

interface TimeSlotsProps {
  schedule: TimeSlot[];
  selectedDate: Date;
}

const TimeSlots = (props: TimeSlotsProps) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const places = useStore((state) => state.places);
  //modify data to fit style
  const data = props.schedule.map((slot) => {
    return {
      title: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Ionicons
            name="time-outline"
            size={16}
            color={theme.colors.tertiary}
          />
          <Text
            style={{
              fontSize: 12,
              color: theme.colors.tertiary,
              paddingLeft: 5,
            }}
          >
            {dayjs("2013-11-18 11:55:20")
              .tz("America/Toronto")
              .format("ddd, HH:mm") +
              " - " +
              dayjs(slot.end).tz("America/Toronto").format("HH:mm")}
          </Text>
        </View>
      ),
      description: () => (
        <View>
          <Text
            style={{
              fontSize: 16,
              color: "black",
            }}
          >
            {slot.name}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Ionicons name="location-outline" size={16} color={"black"} />
            <Text
              style={{
                fontSize: 16,
                color: "black",
                paddingLeft: 5,
              }}
            >
              {slot.locations.length > 0
                ? places[
                    places.findIndex((place) => {
                      return place._id === slot?.locations[0]._id;
                    })
                  ].name
                : "unkown"}
            </Text>
          </View>
        </View>
      ),
      icon: {
        content:
          dayjs(slot.end).isBefore(
            dayjs(props.selectedDate)
              .hour(dayjs().hour())
              .minute(dayjs().minute())
          ) && "check",
        style: {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.secondary,
        },
      },
    };
  });
  return (
    <View style={styles.container}>
      <Timeline
        data={data}
        TimelineHeader={() => {
          return <View style={{ height: theme.basePadding }}></View>;
        }}
        timeContainerStyle={{ display: "none" }}
        contentContainerStyle={{ flexBasis: "80%" }}
        zIndex={-9999}
      />
    </View>
  );
};

export default TimeSlots;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
