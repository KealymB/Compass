import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  RefreshControl,
  ScrollView,
} from "react-native";
import Toast from "react-native-toast-message";
import { Venue, TimeSlot, Place } from "../Types/FetchRequests";
import { fetchPlaces, fetchTimes } from "../Utils/API";
import Error from "../Components/Error";
import Card from "../Components/Card";
import theme from "../Utils/theme";
import { useStore } from "../Stores/EventStore";
import DatePicker from "../Components/DatePicker";
import dayjs from "dayjs";
import FilterBar from "../Components/Filters";
import { AnimatePresence } from "moti";

interface DailyProgramProps {}

const DailyProgram = (props: DailyProgramProps) => {
  const [loading, setLoading] = useState(true);
  const [dateTime, setDateTime] = useState(new Date(2018, 8, 20));
  const [schedule, setSchedule] = useState([]);
  const places = useStore((state) => state.places);
  const timeSlots = useStore((state) => state.timeSlots);

  const showError = () => {
    Toast.show({
      type: "error",
      text1: "Network Error",
      text2: "Error fetching time slots",
    });
  };

  useEffect(() => {
    setSchedule(
      timeSlots.filter((slot) => {
        return dayjs(slot.start).isSame(dateTime, "day");
      })
    );
  }, [timeSlots, dateTime]);

  const fetchData = async () => {
    //fetch time slot data from API endpoint
    setLoading(true);
    try {
      await fetchTimes();
      await fetchPlaces();
    } catch (error) {
      console.error(error);
      showError();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch time slots on component mount
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <DatePicker setDateTime={setDateTime} dateTime={dateTime} />
      <FilterBar />
      <ScrollView
        style={{ width: "100%", padding: 10 }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => fetchData()}
            tintColor={theme.colors.primary}
          />
        }
      >
        {schedule.map((time) => {
          return (
            <Card
              key={time._id}
              day={time.name}
              parent={time.parent}
              location={time.locations}
              startTime={time.start}
              endTime={time.end}
            />
          );
        })}

        {schedule?.length == 0 && (
          <Error type="Empty" title="No time slots found" />
        )}
      </ScrollView>
    </View>
  );
};

export default DailyProgram;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
