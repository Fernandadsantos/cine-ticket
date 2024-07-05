import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slicesReducers/movieSlice";
import roomSlice from "./slicesReducers/roomSlice";
import dateSlice from "./slicesReducers/dateSlice";

export const store = configureStore({
  reducer: {
    movieSlice,
    roomSlice,
    dateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action>;
