import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Toast from "react-native-toast-message";

import DailyProgram from "./Screens/DailyProgram";
import CurrentProgram from "./Screens/CurrentProgram";
import TabBar from "./Components/Navigation/TabBar";
import FilterButton from "./Components/DailyProgram/FilterButton";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator tabBar={(props) => <TabBar {...props} />}>
          <Tab.Screen
            name="Program"
            component={DailyProgram}
            options={{
              headerRight: () => <FilterButton />,
            }}
          />
          <Tab.Screen name="Now" component={CurrentProgram} />
        </Tab.Navigator>
      </NavigationContainer>
      <Toast />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
