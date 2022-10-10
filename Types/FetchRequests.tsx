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
