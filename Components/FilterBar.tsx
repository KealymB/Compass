import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Place } from "../Types/FetchRequests";
import theme from "../Utils/theme";

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
        </View>
      </TouchableOpacity>
    );
  };

  const isSelected = (filter: Place) => {
    return (
      props.selectedFilters.findIndex((item) => {
        return item._id == filter._id;
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
  container: {},
  filterContainer: {
    padding: theme.basePadding,
    height: 40,
    justifyContent: "center",
    margin: theme.basePadding,
    borderRadius: theme.basePadding,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    backgroundColor: theme.colors.secondary,
  },
  filterSelected: {
    borderColor: theme.colors.secondary,
    backgroundColor: theme.colors.primary,
  },
});
