const baseURL = "https://github.com/KealymB/CompassData";
const placesURL =
  "https://raw.githubusercontent.com/KealymB/CompassData/main/places.json";
const timesURL =
  "https://raw.githubusercontent.com/KealymB/CompassData/main/timeslots.json";

export type Place = {
  _id: string;
  name: string;
  configuratorType: string;
};

export type Venue = {
  _id: string;
  ordering: number;
};

export type TimeSlot = {
  _id: string;
  start: string;
  name: string;
  end: string;
  locations: Venue[];
  parent: string;
};

export const fetchTimes = () => {
  //returns JSON data from URL
  return fetch(timesURL).then((response) => {
    return response.json().then((data) => {
      return data;
    });
  });
};

export const fetchPlaces = (id: string) => {
  //returns JSON data from URL
  return fetch(placesURL).then((response) => {
    return response.json().then((data) => {
      return data;
    });
  });
};

export default { fetchTimes, fetchPlaces };
