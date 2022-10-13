import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import theme from "../../Utils/theme";

interface FilterButtonProps {
  onPress?: () => void;
}

const FilterButton = (props: FilterButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={() => props.onPress()}>
      <Ionicons name="filter" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default FilterButton;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    margin: theme.basePadding,
  },
});
