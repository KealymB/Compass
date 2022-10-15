import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Toast from "react-native-toast-message";
import Ionicons from "@expo/vector-icons/Ionicons";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import theme from "../Utils/theme";

type chevronProps = {
  onPress: () => void;
  type: "back" | "forward";
};

type DatePickerProps = {
  dateTime: Date;
  setDateTime: (date: dayjs.Dayjs) => void;
};

const DAYOFFSET = 18;
const DATEMAX = new Date(2018, 8, 20, dayjs().hour(), dayjs().minute());
const DATEMIN = new Date(2018, 8, 18, dayjs().hour(), dayjs().minute());

const DatePicker = (props: DatePickerProps) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const days = ["TUES", "WED", "THUR"];
  const [day, setDay] = useState(0);
  const [pickerShowing, setVisibility] = useState(false);

  const showError = () => {
    Toast.show({
      type: "info",
      text1: "Date selection",
      text2: "Dates must be between 2018-08-18 and 2018-08-20",
    });
  };

  const incrementDay = () => {
    // incremments selected day, wraping if over 3
    const newDay = day >= days.length - 1 ? 0 : day + 1;
    setDay(newDay);
    props.setDateTime(
      dayjs(
        new Date(2018, 8, DAYOFFSET + newDay, dayjs().hour(), dayjs().minute())
      )
    );
  };

  const decrementDay = () => {
    // decrements selected day, wraping if under 0
    const newDay = day <= 0 ? days.length - 1 : day - 1;
    setDay(newDay);
    props.setDateTime(
      dayjs(
        new Date(2018, 8, DAYOFFSET + newDay, dayjs().hour(), dayjs().minute())
      )
    );
  };

  const confirmDay = (date: Date) => {
    // clamps dates selected between DATEMAX and DATEMIN
    // displays info toast if out of bounds
    let newDate = date;
    if (dayjs(date).isAfter(DATEMAX)) {
      showError();
      newDate = DATEMAX;
    }
    if (dayjs(date).isBefore(DATEMIN)) {
      showError();
      newDate = DATEMIN;
    }
    props.setDateTime(dayjs(newDate));
    setVisibility(false);
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
            {dayjs(props.dateTime).format("ddd D MMMM")}
          </Text>
        </TouchableOpacity>
        <Chevron type="forward" onPress={incrementDay} />
      </View>
      <DateTimePickerModal
        isVisible={pickerShowing}
        mode="date"
        onConfirm={confirmDay}
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
