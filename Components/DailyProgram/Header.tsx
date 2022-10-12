import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import {} from "moti";
import { TimeSlot } from "../../Types/FetchRequests";
import theme from "../../Utils/theme";

interface HeaderProps {
  type: "DROPDOWN" | "FILTER";
  title: string;
  options: TimeSlot[];
  onPress: () => void;
}

const Header = (props: HeaderProps) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: { margin: theme.basePadding },
  text: {
    fontSize: 20,
  },
});
