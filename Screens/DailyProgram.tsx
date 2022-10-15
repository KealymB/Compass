import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import DatePicker from "../Components/DatePicker";
import Error from "../Components/Error";
import ProgramViewer from "../Components/DailyProgram/ProgramViewer";
import FilterModal from "../Components/DailyProgram/FilterModel";
import FilterButton from "../Components/DailyProgram/FilterButton";

import { useStore } from "../Stores/EventStore";
import { Place, TimeSlot } from "../Types/FetchRequests";
import { fetchPlaces, fetchTimes } from "../Utils/API";
import theme from "../Utils/theme";
import FilteredResults from "../Components/DailyProgram/FilteredResults";

interface DailyProgramProps {
  navigation: NativeStackScreenProps<any, any>;
}

const DailyProgram = (props: DailyProgramProps) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const [loading, setLoading] = useState(true);
  const [dateTime, setDateTime] = useState(
    dayjs(new Date(2018, 8, 18, dayjs().hour(), dayjs().minute()))
  );

  const [schedule, setSchedule] = useState<TimeSlot[]>([]);
  const [sessions, setSessions] = useState<TimeSlot[]>([]);
  const [currentSession, setSession] = useState<TimeSlot>();
  const [isModelOpen, setModal] = useState(false);
  const [filters, setFilters] = useState<Place[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Place[]>([]);

  const places = useStore((state) => state.places);
  const timeSlots = useStore((state) => state.timeSlots);

  const showError = () => {
    // displays network error toast
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
        // filters timeslots where they have a parent that matches the dayID
        return slot.parent === day._id;
      })
      .sort((a, b) => {
        //sort sessions reverse date
        return new Date(a.start).getTime() - new Date(b.start).getTime();
      });

    setSessions(sessions);
    setSession(sessions[0]);
    setSelectedFilters([]);
  }, [timeSlots, places, dateTime]);

  useEffect(() => {
    // filter and sort time slots available on that day
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
    let newFilters: Place[] = [];

    if (schedule.length > 0 && places.length > 0) {
      schedule.map((scheduleItem) => {
        if (scheduleItem?.locations.length > 0) {
          const place = places.find((placeItem) => {
            // look for places that are in the schedule
            return placeItem._id == scheduleItem.locations[0]._id;
          });
          // add Place to filter list, if daily schedule contains that Place and place name isn't duplicated
          if (
            !newFilters.some((filterItem) => filterItem.name === place.name)
          ) {
            newFilters.push(place);
          }
        }
      });
    }

    setFilters(newFilters);
  }, [places, schedule]);

  useEffect(() => {
    // Fetch time slots on component mount
    fetchData();
    // set header
    setHeader();
  }, []);

  const setHeader = () => {
    // @ts-ignore
    props.navigation.setOptions({
      headerRight: () => (
        <FilterButton
          onPress={() => {
            setModal(true);
          }}
        />
      ),
    });
  };

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

  return (
    <View style={styles.container}>
      <DatePicker
        setDateTime={(date) => {
          setDateTime(date);
          setSelectedFilters([]);
          setModal(false);
        }}
        dateTime={dateTime.toDate()}
      />
      {loading && (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}
      {selectedFilters.length == 0 &&
        places?.length > 0 &&
        schedule?.length > 0 && (
          <ProgramViewer
            events={schedule}
            selectedDate={dateTime}
            currentSession={currentSession}
            sessions={sessions}
            onSessionChange={(session) => {
              setSession(session);
            }}
          />
        )}

      {selectedFilters.length != 0 && (
        <FilteredResults
          events={schedule}
          selectedDate={dateTime}
          selectedFilters={selectedFilters}
          places={places}
        />
      )}

      {!loading && schedule?.length == 0 && (
        <Error type="Empty" title="No time slots found" />
      )}

      {filters.length > 0 && (
        <FilterModal
          filters={filters}
          setSelectedFilters={handleFilter}
          modelOpen={isModelOpen}
          setModal={(flag) => {
            setModal(flag);
          }}
          selectedFilters={selectedFilters}
        />
      )}
    </View>
  );
};

export default DailyProgram;

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: { flex: 1, justifyContent: "center" },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
});
