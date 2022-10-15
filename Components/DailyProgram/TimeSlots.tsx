import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import * as React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { TimeSlot } from "../../Types/FetchRequests";
import theme from "../../Utils/theme";
import { useStore } from "../../Stores/EventStore";
import SessionCard from "./SessionCard";

type timeSlot = {};

interface TimeSlotsProps {
  schedule: TimeSlot[];
  selectedDate: Date;
}

const TimeSlots = (props: TimeSlotsProps) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const places = useStore((state) => state.places);

  type SlotProps = {
    children: React.ReactNode;
  };

  const Slot = (props: SlotProps) => {
    return <View style={styles.slot}>{props.children}</View>;
  };

  type TimelineProps = {
    passed: boolean;
  };

  const Timeline = (props: TimelineProps) => {
    return (
      <View style={styles.timelineContainer}>
        <View style={styles.circle}>
          {props.passed && (
            <Ionicons name="ios-checkmark" size={12} color={"white"} />
          )}
        </View>
        <View
          style={{
            height: 100,
            width: 1,
            backgroundColor: theme.colors.lightgray,
          }}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {props.schedule.map((event) => {
          const eventOccured = dayjs(event.end).isBefore(
            dayjs(props.selectedDate)
              .hour(dayjs().hour())
              .minute(dayjs().minute())
          );

          const placeName =
            event.locations.length > 0
              ? places[
                  places.findIndex((place) => {
                    return place._id === event?.locations[0]._id;
                  })
                ].name
              : "unknown";

          return (
            <Slot key={event._id}>
              <Timeline passed={eventOccured} />
              <SessionCard
                startTime={new Date(event.start)}
                endTime={new Date(event.end)}
                title={event.name}
                placeName={placeName}
              />
            </Slot>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TimeSlots;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
