import create from "zustand";
import { Place, TimeSlot } from "../Types/FetchRequests";

interface PlaceState {
  places: Place[];
  setPlaces: (places: Place[]) => void;
  timeSlots: TimeSlot[];
  setSlots: (timeSlots: TimeSlot[]) => void;
}

export const useStore = create<PlaceState>((set) => ({
  places: [],
  setPlaces: (places) =>
    set((state) => ({
      ...state,
      places,
    })),
  timeSlots: [],
  setSlots: (timeSlots) =>
    set((state) => ({
      ...state,
      timeSlots,
    })),
}));
