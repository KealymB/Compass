import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import EventProgress from "../Components/CurrentProgram/EventProgress";
import DatePicker from "../Components/DatePicker";
import Error from "../Components/Error";

import { useStore } from "../Stores/EventStore";
import { Place, TimeSlot } from "../Types/FetchRequests";

interface CurrentProgramProps {}

const CurrentProgram = (props: CurrentProgramProps) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const places = useStore((state) => state.places);
  const timeSlots = useStore((state) => state.timeSlots);

  const [dateTime, setDateTime] = useState(dayjs(new Date(2018, 8, 18)));
  const [events, setEvents] = useState<TimeSlot[]>([]);
  const [currTime, setCurrTime] = useState<dayjs.Dayjs>();

  useEffect(() => {
    // Updates events based on the day and slot selected
    const day = timeSlots.find((slot) => {
      // Retrieves the currently selected day
      return dayjs(slot.start).isSame(dateTime, "day") && !slot?.parent;
    });

    const sessions = timeSlots
      .filter((slot) => {
        //filters all matching children
        return slot.parent === day._id;
      })
      .sort((a, b) => {
        //sort sessions reverse date
        return new Date(a.start).getTime() - new Date(b.start).getTime();
      });

    const filteredEvents = timeSlots.filter((event) => {
      // filters all timeslots for events that are inside a session
      return sessions.some((session) => session._id == event.parent);
    });

    const sortedEvents = filteredEvents.sort((a, b) => {
      //sort sessions reverse date
      return new Date(a.start).getTime() - new Date(b.start).getTime();
    });

    const currentTime = dayjs(new Date(2018, 8, 18))
      .hour(dayjs().hour() - 5)
      .minute(dayjs().minute());

    setCurrTime(currentTime);
    setEvents(sortedEvents);
  }, [timeSlots, places, dateTime]);

  return (
    <View style={{ flex: 1 }}>
      <DatePicker
        setDateTime={(date: Date) => {
          setDateTime(dayjs(date));
        }}
        dateTime={dateTime.toDate()}
      />
      {places.length != 0 && events.length != 0 && (
        <EventProgress sessions={events} places={places} currTime={currTime} />
      )}
    </View>
  );
};

export default CurrentProgram;
