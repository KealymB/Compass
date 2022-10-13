import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

import { Place, TimeSlot } from "../../Types/FetchRequests";
import TimeSlots from "./TimeSlots";
import theme from "../../Utils/theme";

interface FilteredResultsProps {
  events: TimeSlot[];
  selectedDate: Date;
  selectedFilters: Place[];
  places: Place[];
}

const FilteredResults = (props: FilteredResultsProps) => {
  // Find all places with the same name as the names in the selectedFilter array
  const matchingPlaces = props.places.filter((place) => {
    return props.selectedFilters.some((filter) => {
      return place.name === filter.name;
    });
  });

  // Filter events that match the place filter's ID
  const filteredEvents = props.events.filter((event) => {
    if (event?.locations.length == 0) return false;

    return matchingPlaces.some((place) => {
      return place._id == event.locations[0]._id;
    });
  });

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Filtered Results</Text>
      <View
        style={{
          width: "40%",
          alignSelf: "center",
          height: 1,
          backgroundColor: theme.colors.lightgray,
        }}
      />
      <TimeSlots schedule={filteredEvents} selectedDate={props.selectedDate} />
    </View>
  );
};

export default FilteredResults;

const styles = StyleSheet.create({
  container: { flex: 1 },
  dotsContainer: { backgroundColor: "red" },
  headerText: {
    padding: theme.basePadding,
    fontSize: 24,
    textAlign: "center",
  },
});
