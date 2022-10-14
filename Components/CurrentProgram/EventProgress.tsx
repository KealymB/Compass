import React, { useEffect, useRef } from "react";
import { Text, View, StyleSheet, ScrollView, Dimensions } from "react-native";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import { Place, TimeSlot } from "../../Types/FetchRequests";
import SessionCard from "./SessionCard";

interface EventProgressProps {
  sessions: TimeSlot[];
  places: Place[];
  currTime: dayjs.Dayjs;
}

const EventProgress = (props: EventProgressProps) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault("America/Toronto");
  const scrollRef = useRef(null);
  const windowWidth = Dimensions.get("window").width;

  const findClosestSession = () => {
    //returns progress between 0 and 1
    let closest = 99999999999;
    let closestSession: TimeSlot;

    for (let i = 0; i < props.sessions.length; i++) {
      const session = props.sessions[i];
      //look for session with the closest end time

      const convertedDay = dayjs(session.end).tz("America/Toronto");

      const sessionMS = convertedDay.hour() * 3600 + convertedDay.minute() * 60;
      const currDayMS =
        props.currTime.hour() * 3600 + props.currTime.minute() * 60;

      const diff = Math.abs(sessionMS - currDayMS);

      if (diff < closest) {
        closest = diff;
        closestSession = session;
      }
    }

    return closestSession;
  };

  const calculatePosition = () => {
    const closestSession = findClosestSession();
    const sessionIndex = props.sessions.findIndex(
      (session) => session._id == closestSession._id
    );

    const position = sessionIndex * windowWidth;
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
  }, [scrollRef?.current]);

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={windowWidth / 1.5}
        snapToEnd={false}
        style={{ marginLeft: -windowWidth / 2 }}
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
