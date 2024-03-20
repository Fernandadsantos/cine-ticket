import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import movieSlice from "./slicesReducers/movieSlice";

export const store = configureStore({
    reducer: {
        movieSlice,
    }
}); 

export type RootState = ReturnType<typeof store.getState> 
export type AppDispatch = typeof store.dispatch 
export type AppThunk = ThunkAction<void, RootState, unknown, Action>