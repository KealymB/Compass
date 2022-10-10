import { useStore } from "../Stores/EventStore";
import { Place, TimeSlot } from "../Types/FetchRequests";

const placesURL =
  "https://raw.githubusercontent.com/KealymB/CompassData/main/places.json";
const timesURL =
  "https://raw.githubusercontent.com/KealymB/CompassData/main/timeslots.json";

export const fetchTimes = async () => {
  // Tries to fetch slots and fill the store. If it fails it will show a toast
  const slots = await fetch(timesURL).then((response) => {
    return response.json().then((data) => {
      return data as TimeSlot[];
    });
  });
  if (slots) useStore.setState({ timeSlots: slots }); // if slots were retrieved fill store
};

export const fetchPlaces = async () => {
  // Tries to fetch places and fill the store. If it fails it will show a toast
  const places = await fetch(placesURL).then((response) => {
    return response.json().then((data) => {
      return data as Place[];
    });
  });
  if (places) useStore.setState({ places: places }); // if places were retrieved fill store
};

export default { fetchTimes, fetchPlaces };
