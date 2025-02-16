import { createSlice } from "@reduxjs/toolkit";
import { Chairs } from "../../interfaces";

const initialState: Chairs = {
  chairs: [],
};

export const chairsSlice = createSlice({
  name: "chairs",
  initialState,
  reducers: {
    addChairs: (state, actions) => {
      state.chairs?.push(actions.payload);
    },
    removeChairs: (state, actions) => {
      const index = state.chairs?.indexOf(actions.payload);
      if (index) {
        state.chairs?.splice(state.chairs?.indexOf(actions.payload), 1);
      }
    },
  },
});

export const { addChairs, removeChairs } = chairsSlice.actions;
export default chairsSlice.reducer;
