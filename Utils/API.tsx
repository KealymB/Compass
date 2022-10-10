const baseURL = "https://github.com/KealymB/CompassData";

type Place = {
  _id: string;
  name: string;
  configuratorType: string;
};

type Venue = {
  _id: string;
  ordering: number;
};

type TimeSlot = {
  _id: string;
  start: string;
  name: string;
  end: string;
  locations: Venue[];
  parent: string;
};

const fetchData = (endPoint: string) => {
  //returns JSON data from URL
  fetch(baseURL + endPoint)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

export default fetchData;
