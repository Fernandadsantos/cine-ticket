import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; 
import { getDocs, collection, addDoc } from "firebase/firestore"; 
import { db } from "../../firebase"; 

const addRooms = async () => {
    try {
        const docRef = await addDoc(collection(db, "rooms"), [{roomId: "01", schedules: []}, 
            {roomId: "02", schedules: []},
            {roomId: "03", schedules: []},
            {roomId: "04", schedules: []}]);
        console.log("Document written with ID: ", docRef);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}; 

export const fetchRoom = createAsyncThunk(
    'movie/fetchMovie',
    async () => {
        const { empty, docs } = await getDocs(collection(db, "rooms"));
        const rooms = docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        if(!empty){ 
            return rooms;
        }  
        addRooms();  

        return rooms;
    }
)

export const roomSlice = createSlice({
    name: 'room',
    initialState: {
        rooms: [{}],
        loading: '',
    },
    reducers: {  
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRoom.fulfilled, (state, action) => {
                state.rooms = action.payload;
                state.loading = 'succeeded'; 
            })

            .addCase(fetchRoom.pending, (state) => {
                state.rooms = [];
                state.loading = 'pending';
            })

            .addCase(fetchRoom.rejected, (state) => {
                state.rooms = [];
                state.loading = 'failed';
            })
    },

})

export default roomSlice.reducer;