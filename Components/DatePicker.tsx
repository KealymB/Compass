import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Ionicons from "@expo/vector-icons/Ionicons";
import dayjs from "dayjs";

import theme from "../Utils/theme";

type chevronProps = {
  onPress: () => void;
  type: "back" | "forward";
};

type DatePickerProps = {
  dateTime: Date;
  setDateTime: (date) => void;
};

const DatePicker = (props: DatePickerProps) => {
  const [day, setDay] = useState(20);
  const [pickerShowing, setVisibility] = useState(false);

  const incrementDay = () => {
    setDay(day + 1);
    props.setDateTime(new Date(2018, 8, day + 1));
  };

  const decrementDay = () => {
    setDay(day - 1);
    props.setDateTime(new Date(2018, 8, day - 1));
  };

  const Chevron = (props: chevronProps) => {
    //touchable chevron for changing days easily
    return (
      <TouchableOpacity onPress={props.onPress} style={styles.button}>
        <Ionicons
          name={`chevron-${props.type}-outline`}
          size={30}
          color="white"
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <Chevron type="back" onPress={decrementDay} />
        <TouchableOpacity
          onPress={() => setVisibility(true)}
          style={styles.datePicker}
        >
          <Text style={styles.dateText}>
            {dayjs(props.dateTime).format("DD-MM-YYYY")}
          </Text>
        </TouchableOpacity>
        <Chevron type="forward" onPress={incrementDay} />
      </View>
      <DateTimePickerModal
        isVisible={pickerShowing}
        mode="date"
        onConfirm={(date) => {
          props.setDateTime(date);
          setVisibility(false);
        }}
        date={props.dateTime}
        onCancel={() => setVisibility(false)}
      />
    </>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: theme.colors.primary,
    justifyContent: "space-between",
    alignItems: "center",
    padding: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  dateText: {
    fontSize: 18,
    color: "white",
  },
  button: {
    margin: 8,
  },
  datePicker: {
    padding: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "white",
  },
});
