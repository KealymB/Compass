import * as React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import theme from "../../Utils/theme";

const TabBar = ({ state, descriptors, navigation }) => {
  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <View key={label + index} style={{ flex: 1 }}>
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.buttonStyle}
            >
              <Ionicons
                name={
                  label == "Program" ? "list-circle-outline" : "time-outline"
                }
                size={isFocused ? 48 : 40}
                color={isFocused ? theme.colors.primary : "black"}
              />
              <Text
                style={{ color: isFocused ? theme.colors.primary : "black" }}
              >
                {label}
              </Text>
            </TouchableOpacity>
            {index != state.routes.length - 1 && (
              <View
                style={{
                  height: 60,
                  width: 1,
                  backgroundColor: theme.colors.lightgray,
                  alignSelf: "center",
                }}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexDirection: "row",
    justifyContent: "center",
    padding: theme.basePadding,
    borderTopWidth: 1,
    borderTopColor: theme.colors.lightgray,
  },
  buttonStyle: {
    height: 100,
    alignItems: "center",
  },
});
