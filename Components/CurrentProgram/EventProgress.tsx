import React, { useCallback, useEffect, useRef } from "react";
import { Text, View, StyleSheet, FlatList, Dimensions } from "react-native";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { Place, TimeSlot } from "../../Types/FetchRequests";
import SessionCard from "./SessionCard";
import theme from "../../Utils/theme";

interface EventProgressProps {
  sessions: TimeSlot[];
  places: Place[];
  currTime: dayjs.Dayjs;
}

const EventProgress = (props: EventProgressProps) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const scrollRef = useRef(null);
  const windowWidth = Dimensions.get("window").width;

  const padding = theme.basePadding * 4;
  const CARD_WIDTH = windowWidth / 1.5 - padding;
  const posOffset = CARD_WIDTH / 3;

  const closestSessionIndex = () => {
    //returns progress between 0 and 1
    let closest = 99999999999;
    let closestSession: TimeSlot;

    for (let i = 0; i < props.sessions.length; i++) {
      //look for session with the closest end time
      const session = props.sessions[i];

      const convertedDay = dayjs(session.end).tz("America/Chicago"); //convert session to UTC-5:00
      const currTime = dayjs(props.currTime).tz("America/Chicago"); //converts current time to UTC-5:00

      const sessionSeconds =
        convertedDay.hour() * 3600 + convertedDay.minute() * 60;
      const currDaySeconds = currTime.hour() * 3600 + currTime.minute() * 60;

      const diff = Math.abs(sessionSeconds - currDaySeconds);

      if (diff < closest) {
        closest = diff;
        closestSession = session;
      }
    }

    const sessionIndex = props.sessions.findIndex(
      (session) => session._id == closestSession._id
    );

    return sessionIndex;
  };

  const isHappeningNow = (session: TimeSlot) => {
    if (
      props.currTime
        .tz("America/Chicago")
        .isBefore(dayjs(session.start).tz("America/Chicago"))
    )
      return false;
    if (
      props.currTime
        .tz("America/Chicago")
        .isAfter(dayjs(session.end).tz("America/Chicago"))
    )
      return false;
    return true;
  };

  return (
    <View style={styles.container}>
      <FlatList
        initialScrollIndex={closestSessionIndex()}
        data={props.sessions}
        contentContainerStyle={{
          marginLeft: posOffset,
          paddingRight: windowWidth / 2,
        }}
        renderItem={({ item }) => {
          return (
            <SessionCard
              session={item}
              places={props.places}
              key={item._id}
              happeningNow={isHappeningNow}
            />
          );
        }}
        horizontal
      />
    </View>
  );
};

export default EventProgress;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
