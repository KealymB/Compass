import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import * as React from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import { TimeSlot } from "../../Types/FetchRequests";
import theme from "../../Utils/theme";
import { useStore } from "../../Stores/EventStore";

type timeSlot = {};

interface TimeSlotsProps {
  schedule: TimeSlot[];
  selectedDate: Date;
}

const TimeSlots = (props: TimeSlotsProps) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const places = useStore((state) => state.places);

  type CardProps = {
    startTime: Date;
    endTime: Date;
    title: string;
    placeName: string;
  };

  const Card = (props: CardProps) => {
    return (
      <View style={styles.card}>
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
          <View style={{ flexDirection: "row" }}>
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
              .tz("America/Toronto")
          );

          const placeName =
            event.locations.length > 0
              ? places[
                  places.findIndex((place) => {
                    return place._id === event?.locations[0]._id;
                  })
                ].name
              : "unkown";

          return (
            <Slot key={event._id}>
              <Timeline passed={eventOccured} />
              <Card
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
  card: {
    flex: 4,
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
});
