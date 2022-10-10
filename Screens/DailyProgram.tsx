import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  RefreshControl,
  ScrollView,
} from "react-native";
import { fetchTimes, Venue, TimeSlot, Place } from "../Utils/API";
import Error from "../Components/Error";
import Card from "../Components/Card";
import theme from "../Utils/theme";

interface DailyProgramProps {}

const DailyProgram = (props: DailyProgramProps) => {
  const [loading, setLoading] = useState(true);
  const [times, setTimes] = useState<TimeSlot[]>([]);

  const fetchData = async () => {
    //fetch time slot data from API endpoint
    setLoading(true);

    try {
      const times = await fetchTimes();

      if (times) setTimes(times);
    } catch (error) {
      console.error(error);
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
        {times.map((time) => {
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
        {times?.length == 0 && (
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
