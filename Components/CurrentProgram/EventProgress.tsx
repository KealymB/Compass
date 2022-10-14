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
    let closest = dayjs("2080-10-20").tz("America/Toronto");
    let closestSession: TimeSlot;
    for (let i = 0; i < props.sessions.length; i++) {
      const session = props.sessions[i];
      //look for session with the closest end time
      const convertedDay = dayjs(session.end).tz("America/Toronto");
      console.log(convertedDay.format("HH:mm"));
      console.log(props.currTime);
      console.log(
        Math.abs(props.currTime.diff(dayjs(session.end).tz("America/Toronto")))
      );
      if (
        Math.abs(
          props.currTime.diff(dayjs(session.end).tz("America/Toronto"))
        ) < Math.abs(props.currTime.diff(closest))
      ) {
        closest = dayjs(session.end).tz("America/Toronto");
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
    console.log("scroll width: ", windowWidth * props.sessions.length);
    console.log(position);
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
