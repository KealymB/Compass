import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

import { Place } from "../../Types/FetchRequests";
import theme from "../../Utils/theme";
import FilterBar from "./FilterBar";

interface FilterModalProps {
  filters: Place[];
  selectedFilters: Place[];
  setSelectedFilters: (filter: Place) => void;
  modelOpen: boolean;
  setModal: (flag: boolean) => void;
}

const FilterModal = (props: FilterModalProps) => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["75%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    if (index == -1) {
      props.setModal(false);
    }
  }, []);

  useEffect(() => {
    if (props.modelOpen) {
      bottomSheetRef?.current.snapToIndex(0);
    } else {
      bottomSheetRef?.current.close();
    }
  }, [props.modelOpen]);

  type SheetProps = {
    filters: Place[];
  };

  type FilterItemProps = {
    children: React.ReactNode;
    title: string;
  };

  const FilterItem = (props: FilterItemProps) => {
    return (
      <View style={styles.filterItemContainer}>
        <Text style={styles.filterItemText}>{props.title}</Text>
        {props.children}
        <View style={styles.divider} />
      </View>
    );
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      style={styles.shadow}
      enablePanDownToClose
    >
      <Text style={styles.headerText}>Filters</Text>
      <FilterItem title="Location">
        <FilterBar
          filters={props.filters}
          selectedFilters={props.selectedFilters}
          onPress={props.setSelectedFilters}
        />
      </FilterItem>
    </BottomSheet>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  divider: {
    marginTop: theme.basePadding,
    width: "80%",
    height: 1,
    backgroundColor: theme.colors.lightgray,
    alignSelf: "center",
  },
  filterItemText: {
    fontSize: 16,
  },
  filterItemContainer: { padding: theme.basePadding, flex: 1 },
});
