import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slicesReducers/movieSlice";
import roomSlice from "./slicesReducers/roomSlice"; 

export const store = configureStore({
    reducer: {
        movieSlice,
        roomSlice, 
    }
}); 

export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch 
export type AppThunk = ThunkAction<void, RootState, unknown, Action>