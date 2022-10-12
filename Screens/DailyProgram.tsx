import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import dayjs from "dayjs";

import { useStore } from "../Stores/EventStore";
import { Place, TimeSlot } from "../Types/FetchRequests";
import DatePicker from "../Components/DatePicker";
import Error from "../Components/Error";
import { fetchPlaces, fetchTimes } from "../Utils/API";
import theme from "../Utils/theme";
import Header from "../Components/DailyProgram/Header";
import ProgramViewer from "../Components/DailyProgram/ProgramViewer";
import FilterBar from "../Components/FilterBar";

interface DailyProgramProps {}

const DailyProgram = (props: DailyProgramProps) => {
  const [loading, setLoading] = useState(true);
  const [dateTime, setDateTime] = useState(new Date(2018, 8, 18));
  const [schedule, setSchedule] = useState<TimeSlot[]>([]);
  const [headerType, setHeaderType] = useState<"DROPDOWN" | "FILTER">(
    "DROPDOWN"
  );
  const [options, setOptions] = useState<TimeSlot[]>([]);
  const [selectedSession, setSession] = useState<TimeSlot>();
  const [events, setEvents] = useState<TimeSlot[]>([]);
  const [filters, setFilters] = useState<Place[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Place[]>([]);
  const places = useStore((state) => state.places);
  const timeSlots = useStore((state) => state.timeSlots);

  const showError = () => {
    // displays new work error toast
    Toast.show({
      type: "error",
      text1: "Network Error",
      text2: "Error fetching time slots",
    });
  };

  useEffect(() => {
    // Updates sessions based on the day and slot selected
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

    setOptions(sessions);
    updateEvents(sessions[0]);
    setSession(sessions[0]);
  }, [timeSlots, places, dateTime]);

  useEffect(() => {
    // sort time slots available on that day
    const unsortedSchedule = timeSlots.filter((slot) => {
      return dayjs(slot.start).isSame(dateTime, "day");
    });

    const sortedSchedule = unsortedSchedule.sort((a, b) => {
      return new Date(a.start).getTime() - new Date(b.start).getTime();
    });

    setSchedule(sortedSchedule);
  }, [timeSlots, dateTime]);

  useEffect(() => {
    // Updates available filters for the selected day
    let newFilters = [];
    if (schedule.length > 0 && places.length > 0) {
      schedule.map((scheduleItem) => {
        if (scheduleItem?.locations.length > 0) {
          const place = places.find((placeItem) => {
            return placeItem._id == scheduleItem.locations[0]._id;
          });
          // add Place to filter list, if daily schedule contains that Place
          newFilters.push(place);
        }
      });
    }

    setFilters(newFilters);
  }, [places, schedule]);

  useEffect(() => {
    // Fetch time slots on component mount
    fetchData();
  }, []);

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

  const updateEvents = (session: TimeSlot) => {
    const events = timeSlots
      .filter((slot) => {
        //filters all matching children
        return slot.parent === session._id;
      })
      .sort((a, b) => {
        //sort sessions reverse date
        return new Date(a.start).getTime() - new Date(b.start).getTime();
      });
    setEvents(events);
  };

  const handleFilter = (filter: Place) => {
    // adds filter to selected filter state if unique, removes if not unique
    if (
      !selectedFilters.some((item) => {
        return item._id == filter._id;
      })
    ) {
      setSelectedFilters([...selectedFilters, filter]);
    } else {
      const editedFilters = selectedFilters.filter((filterItem) => {
        return filterItem._id != filter._id;
      });
      setSelectedFilters(editedFilters);
    }
  };

  const setSelectedSession = (session: TimeSlot) => {
    updateEvents(session);
    setSession(session);
  };

  return (
    <View style={styles.container}>
      <DatePicker setDateTime={setDateTime} dateTime={dateTime} />
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}
      {places?.length > 0 && schedule?.length > 0 && (
        <ProgramViewer
          selected={headerType}
          options={options}
          title={selectedSession.name}
          events={events}
          selectedDate={dateTime}
        />
      )}

      {!loading && schedule?.length == 0 && (
        <Error type="Empty" title="No time slots found" />
      )}
    </View>
  );
};

export default DailyProgram;

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { flex: 1, justifyContent: "center" },
});
