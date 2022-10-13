import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Place } from "../../Types/FetchRequests";
import theme from "../../Utils/theme";

interface FilterBarProps {
  filters: Place[];
  selectedFilters: Place[];
  onPress: (filter: Place) => void;
}

const FilterBar = (props: FilterBarProps) => {
  type FilterProps = {
    filter: Place;
    onPress: (filter: Place) => void;
    selected: boolean;
  };

  const Filter = (props: FilterProps) => {
    return (
      <TouchableOpacity onPress={() => props.onPress(props.filter)}>
        <View
          style={[
            styles.filterContainer,
            props.selected ? styles.filterSelected : {},
          ]}
        >
          <Text>{props.filter.name}</Text>
          {!props.selected && <View style={{ width: 16 }} />}
          {props.selected && (
            <Ionicons name={`checkmark`} size={16} color="black" />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const isSelected = (filter: Place) => {
    return (
      props.selectedFilters.findIndex((item) => {
        return item.name == filter.name;
      }) != -1
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {props.filters.map((filter) => {
          return (
            <Filter
              key={filter._id}
              filter={filter}
              onPress={props.onPress}
              selected={isSelected(filter)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  filterContainer: {
    padding: theme.basePadding,
    height: 40,
    justifyContent: "center",
    margin: theme.basePadding,
    borderRadius: 20,
    borderColor: theme.colors.darksecondary,
    borderWidth: 1,
    backgroundColor: theme.colors.secondary,
    flexDirection: "row",
    alignItems: "center",
  },
  filterSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
});
