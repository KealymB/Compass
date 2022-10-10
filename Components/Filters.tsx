import * as React from "react";
import { Text, View, StyleSheet } from "react-native";

interface FilterBarProps {}

const FilterBar = (props: FilterBarProps) => {
  return (
    <View style={styles.container}>
      <Text>FilterBar</Text>
    </View>
  );
};

export default FilterBar;

const styles = StyleSheet.create({
  container: {},
});
