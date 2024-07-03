import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  Movie,
  Room,
  RoomSchedule,
  RoomState,
  SeatsInterface,
} from "../../interfaces";
import moment from "moment";

const createSeats = () => {
  const seatsArr: SeatsInterface[] = [];
  let currentLetter = 65;

  for (let i = 1; i <= 75; i++) {
    if (i >= 61) {
      seatsArr.push({
        seat: i,
        line: String.fromCharCode(currentLetter),
        status: "available",
      });
    } else {
      seatsArr.push({
        seat: i,
        line: String.fromCharCode(
          i % 10 === 0 ? currentLetter++ : currentLetter
        ),
        status: "available",
      });
    }
  }

  return seatsArr;
};

export const fetchRooms = createAsyncThunk(
  "rooms/fetchRooms",

  async (movies: Movie[]) => {
    const { empty, docs } = await getDocs(collection(db, "rooms"));

    if (!empty) return docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    for (let i = 1; i < 5; i++) {
      const docRef = doc(db, "rooms", `${i}`);
      await setDoc(docRef, {});
    }

    const { docs: docRooms } = await getDocs(collection(db, "rooms"));

    const rooms: Room[] = docRooms.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    const hoursFormat = (hours: number) => {
      return moment().hours(hours).format("HH:00");
    };

    const seats = createSeats();
    let currentMovie = 0;

    for (let room of rooms) {
      const aux: RoomSchedule[] = [];

      for (let i = 9, j = 9; i <= 23; i++) {
        aux.push({
          idMovie: movies[currentMovie].id,
          schedule: hoursFormat(j++),
          seats: seats,
        } as RoomSchedule);

        currentMovie === 19 ? (currentMovie = 0) : (currentMovie += 1);
      }
      aux.push();
      await addRoom(room.id as string, aux as RoomSchedule[]);
    }

    return rooms;
  }
);

const addRoom = async (idRoom: string, schedules: RoomSchedule[]) => {
  const docRef = doc(db, "rooms", `${idRoom}`);
  try {
    const response = await getDoc(docRef);

    if (response.exists()) {
      await updateDoc(docRef, {
        ...response.data(),
        schedules,
      });

      return;
    }

    await setDoc(docRef, schedules);

    console.log("Document written with ID: ", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const initialState: RoomState = {
  rooms: [],
  loadingRooms: "idle",
};

export const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload as Room[];
        state.loadingRooms = "succeeded";
      })

      .addCase(fetchRooms.pending, (state) => {
        state.rooms = [];
        state.loadingRooms = "pending";
      })

      .addCase(fetchRooms.rejected, (state) => {
        state.rooms = [];
        state.loadingRooms = "failed";
      });
  },
});

export default roomSlice.reducer;
