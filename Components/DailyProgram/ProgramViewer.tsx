import React, { useEffect } from "react";
import { Text, View, StyleSheet, Animated, Dimensions } from "react-native";
import PagerView, {
  PagerViewOnPageScrollEventData,
} from "react-native-pager-view";
import { ExpandingDot } from "react-native-animated-pagination-dots";

import { Place, TimeSlot } from "../../Types/FetchRequests";
import TimeSlots from "./TimeSlots";
import theme from "../../Utils/theme";

interface ProgramViewerProps {
  events: TimeSlot[];
  selectedDate: Date;
  currentSession: TimeSlot;
  sessions: TimeSlot[];
  onSessionChange: (place: TimeSlot) => void;
}

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const ProgramViewer = (props: ProgramViewerProps) => {
  const width = Dimensions.get("window").width;
  const pagerRef = React.useRef<PagerView>(null);
  const scrollOffsetAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const positionAnimatedValue = React.useRef(new Animated.Value(0)).current;
  const inputRange = [0, props.sessions.length];

  const scrollX = Animated.add(
    scrollOffsetAnimatedValue,
    positionAnimatedValue
  ).interpolate({
    inputRange,
    outputRange: [0, props.sessions.length * width],
  });

  const onPageScroll = React.useMemo(
    () =>
      Animated.event<PagerViewOnPageScrollEventData>(
        [
          {
            nativeEvent: {
              offset: scrollOffsetAnimatedValue,
              position: positionAnimatedValue,
            },
          },
        ],
        {
          useNativeDriver: false,
        }
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{props.currentSession.name}</Text>
      <View
        style={{
          width: "40%",
          alignSelf: "center",
          height: 1,
          backgroundColor: theme.colors.lightgray,
        }}
      />
      <ExpandingDot
        data={props.sessions}
        expandingDotWidth={30}
        //@ts-ignore
        scrollX={scrollX}
        inActiveDotOpacity={0.6}
        activeDotColor={theme.colors.primary}
        dotStyle={{
          width: 10,
          height: 10,
          backgroundColor: theme.colors.primary,
          borderRadius: 5,
          marginHorizontal: 5,
          borderColor: theme.colors.primary,
        }}
        containerStyle={{ position: "absolute" }}
      />
      <AnimatedPagerView
        initialPage={0}
        style={styles.viewPager}
        ref={pagerRef}
        onPageScroll={onPageScroll}
        onPageSelected={(e) =>
          props.onSessionChange(props.sessions[e.nativeEvent.position])
        }
        overdrag
      >
        {Array(props.sessions.length)
          .fill(0)
          .map((_, i) => {
            const schedule = props.events.filter((event) => {
              return event.parent == props.sessions[i]._id;
            });

            return (
              <TimeSlots
                schedule={schedule}
                selectedDate={props.selectedDate}
                key={i}
              />
            );
          })}
      </AnimatedPagerView>
    </View>
  );
};

export default ProgramViewer;

const styles = StyleSheet.create({
  container: { flex: 1 },
  viewPager: { height: 1500 },
  dotsContainer: { backgroundColor: "red" },
  headerText: {
    padding: theme.basePadding,
    fontSize: 24,
    textAlign: "center",
  },
});
