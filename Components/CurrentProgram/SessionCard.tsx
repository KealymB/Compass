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
const CARD_HEIGHT = 350;
const padding = theme.basePadding * 4;
const CARD_WIDTH = windowWidth / 1.5 - padding;

type SessionCardProps = {
  session: TimeSlot;
  places: Place[];
  happeningNow: (session: TimeSlot) => boolean;
};

const SessionCard = (props: SessionCardProps) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  const [imageURI, setImage] = useState<string>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const isHappening = props.happeningNow(props.session);

  const place = props.places.find((place) => {
    if (props.session?.locations.length == 0) return false;

    return props.session.locations[0]._id == place._id;
  });

  useEffect(() => {
    fetchImage(props.session.name);
  }, []);

  const fetchImage = async (locationName: string) => {
    // fetches related images (based on location name) to be shown in session card
    setLoading(true);
    try {
      const query = locationName + " event";
      const url = `https://api.unsplash.com/search/photos?client_id=${Env.ACCESS_KEY}&query=${query}&orientation=landscape`;
      const res: SplashFetch = await fetch(url).then((response) => {
        return response.json();
      });
      if (res?.results) {
        setImage(res.results[Math.floor(Math.random() * 10)].urls.small);
      } else {
        setError(true);
        showError();
      }
    } catch (error) {
      console.error(error);
      showError();
    } finally {
      setLoading(false);
    }
  };

  const showError = () => {
    // displays network error toast
    Toast.show({
      type: "error",
      text1: "Network Error",
      text2: "key = " + process.env.ACCESS_KEY,
    });
  };

  const ImageLoader = () => {
    return (
      <View style={[styles.image]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  };

  const Description = () => {
    // renders session time, name and location
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
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
              .tz("America/Chicago")
              .format("ddd, HH:mm") +
              " - " +
              dayjs(props.session.end).tz("America/Chicago").format("HH:mm")}
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
    );
  };

  return (
    <View
      style={[
        styles.container,
        isHappening ? { height: CARD_HEIGHT + 50, width: CARD_WIDTH + 50 } : {},
      ]}
    >
      <View style={[styles.card, isHappening ? styles.highlighted : {}]}>
        {loading && <ImageLoader />}
        {error && (
          <Image
            style={styles.image}
            source={require("../../assets/placeHolder.png")}
          />
        )}
        {imageURI && <Image style={styles.image} source={{ uri: imageURI }} />}
        <Description />
      </View>
    </View>
  );
};

export default SessionCard;

const styles = StyleSheet.create({
  container: {
    height: CARD_HEIGHT,
    width: CARD_WIDTH,
    alignSelf: "center",
    padding: theme.basePadding,
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 20,
    padding: theme.basePadding * 2,
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
  highlighted: {
    borderWidth: 1,
    borderColor: theme.colors.primary,

    shadowColor: theme.colors.primary,
    shadowOffset: {
      width: 2,
      height: 6,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6.2,

    elevation: 12,
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
    borderRadius: theme.basePadding * 2,
    marginBottom: theme.basePadding,
  },
});
