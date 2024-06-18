import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SeatsInterface, SeatsState } from "../../interfaces";
import "./roomSlice";

export const fetchSeats = createAsyncThunk("seats/fetchSeats", async () => {
  const seatsArr: SeatsInterface[] = [];
  let currentLetter = 65;

  for (let i = 1; i <= 60; i++) {
    seatsArr.push({
      seat: i,
      line: String.fromCharCode(i % 10 !== 0 ? currentLetter : currentLetter++),
      status: "available",
    });
  }

  return seatsArr;
});

const initialState: SeatsState = {
  seats: [],
  loadingSeat: "idle",
};

export const seatsSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeats.fulfilled, (state, action) => {
        state.seats = action.payload as unknown as SeatsInterface[];
        state.loadingSeat = "succeeded";
      })

      .addCase(fetchSeats.pending, (state) => {
        state.seats = [];
        state.loadingSeat = "pending";
      })

      .addCase(fetchSeats.rejected, (state) => {
        state.seats = [];
        state.loadingSeat = "failed";
      });
  },
});

export default seatsSlice.reducer;
