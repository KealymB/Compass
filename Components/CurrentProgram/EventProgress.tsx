import React, { useEffect, useRef } from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
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

  const findClosestSession = () => {
    //returns progress between 0 and 1
    let closest = 99999999999;
    let closestSession: TimeSlot;

    for (let i = 0; i < props.sessions.length; i++) {
      //look for session with the closest end time
      const session = props.sessions[i];

      const convertedDay = dayjs(session.end).tz("America/Toronto"); //convert session to UTC-5:00
      const currTime = dayjs(props.currTime).tz("America/Toronto"); //converts current time to UTC-5:00

      const sessionSeconds =
        convertedDay.hour() * 3600 + convertedDay.minute() * 60;
      const currDaySeconds = currTime.hour() * 3600 + currTime.minute() * 60;

      const diff = Math.abs(sessionSeconds - currDaySeconds);

      if (diff < closest) {
        closest = diff;
        closestSession = session;
      }
    }

    console.log("session:", closestSession.name);

    return closestSession;
  };

  const calculatePosition = () => {
    //returns position in pixels of where the session is
    const closestSession = findClosestSession();
    const sessionIndex = props.sessions.findIndex(
      (session) => session._id == closestSession._id
    );

    const position = sessionIndex * CARD_WIDTH;
    console.log("Pos:", position);
    return position;
  };

  useEffect(() => {
    if (scrollRef?.current) {
      scrollRef.current.scrollTo({
        x: calculatePosition(),
        y: 0,
        animated: true,
      });
    }
  }, [scrollRef?.current, props.currTime]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH}
        snapToEnd={false}
        contentContainerStyle={{
          marginLeft: posOffset,
          paddingRight: windowWidth / 2,
        }}
      >
        {props.sessions.map((session) => (
          <SessionCard
            session={session}
            places={props.places}
            key={session._id}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default EventProgress;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
