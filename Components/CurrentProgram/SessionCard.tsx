import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

import theme from "../../Utils/theme";
import { Place, SplashFetch, TimeSlot } from "../../Types/FetchRequests";
import Toast from "react-native-toast-message";
import { Env } from "../../Utils/Env";

const windowWidth = Dimensions.get("window").width;
const CARD_HEIGHT = 300;
const padding = theme.basePadding * 4;
const CARD_WIDTH = windowWidth / 1.5 - padding;

type SessionCardProps = {
  session: TimeSlot;
  places: Place[];
};

const SessionCard = (props: SessionCardProps) => {
  const [imageURI, setImage] = useState<string>();
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const fetchImage = async (locationName: string) => {
    try {
      const query = locationName + " event";
      const url = `https://api.unsplash.com/search/photos?client_id=${Env.ACCESS_KEY}&query=${query}&orientation=landscape`;
      const res: SplashFetch = await fetch(url).then((response) => {
        return response.json();
      });
      setImage(res.results[Math.floor(Math.random() * 10)].urls.small);
    } catch (error) {
      console.error(error);
      showError();
    }
  };

  const place = props.places.find((place) => {
    if (props.session?.locations.length == 0) return false;

    return props.session.locations[0]._id == place._id;
  });

  useEffect(() => {
    fetchImage(props.session.name);
  }, []);

  const showError = () => {
    // displays network error toast
    Toast.show({
      type: "error",
      text1: "Network Error",
      text2: "Error fetching images",
    });
  };

  const ImageLoader = () => {
    return (
      <View style={[styles.image]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={[styles.sessionContainer, styles.card]}>
        {imageURI ? (
          <Image
            style={{
              width: CARD_WIDTH - padding,
              height: 200,
              overflow: "hidden",
              borderRadius: 10,
              marginBottom: theme.basePadding,
            }}
            source={{ uri: imageURI }}
          />
        ) : (
          <ImageLoader />
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 5,
          }}
        >
          <Ionicons
            name="time-outline"
            size={12}
            color={theme.colors.tertiary}
          />
          <Text
            style={{
              fontSize: 12,
              color: theme.colors.tertiary,
              paddingLeft: 5,
            }}
          >
            {dayjs(props.session.start)
              .tz("America/Toronto")
              .format("ddd, HH:mm") +
              " - " +
              dayjs(props.session.end).tz("America/Toronto").format("HH:mm")}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontSize: 16,
              color: "black",
            }}
            numberOfLines={1}
          >
            {props.session.name}
          </Text>
          <View
            style={{ flexDirection: "row", alignSelf: "center", paddingTop: 5 }}
          >
            <Ionicons name="location-outline" size={16} color={"black"} />
            <Text
              style={{
                fontSize: 16,
                color: "black",
                paddingLeft: 5,
              }}
            >
              {place ? place.name : "unknown"}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SessionCard;

const styles = StyleSheet.create({
  container: { flex: 1, alignSelf: "center" },
  sessionContainer: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    alignSelf: "center",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: theme.basePadding * 2,
    margin: theme.basePadding * 2,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
  },
  slot: {
    width: "100%",
    height: 120,
    flexDirection: "row",
  },
  image: {
    width: CARD_WIDTH - padding,
    height: 200,
    overflow: "hidden",
    borderRadius: 10,
    marginBottom: theme.basePadding,
    justifyContent: "center",
  },
});
