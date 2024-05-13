import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, getImageRoot } from "../../api/axios";
import { Movie, MovieDetails, MovieState, Schedules } from "../../interfaces";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase"; 
 


export const fetchMovie = createAsyncThunk(
    'movie/fetchMovie',
    async () => { 
        const { empty, docs } = await getDocs(collection(db, "movies"));
        
        const getAvaliableTime = () => {
            const start = 9;
            const end = 23;
            const schedules = [];

            for(let i = start; i <= end; i+=2){
                let currentTime = new Date(i);
                schedules.push({
                   'time': `${currentTime.getHours()}:${currentTime.getMinutes()}` ,
                   'avaliable': true,
                   'idMovie': ''
                }); 
            }

            return schedules;
        };
        const schedules = getAvaliableTime(); 

        if(!empty){
            docs.map((doc) => ({ ...doc.data(), id: doc.id}))
            .forEach(doc => {
                schedules.forEach(schedule => {
                    //schedule.idMovie = doc.idMovie;
                    schedule.avaliable = false; 
                    console.log(schedule)  
                });
            });  
        }
        
        const { data: { results } } = await api
        .get("/movie/popular?api_key=1abb3e68d878be1155d781ce812f80a8&language=pt-BR");
        
        const movies = results.map((movie: Movie) => ({ 
            idMovie: movie.id,
            title: movie.title,
            poster: getImageRoot() + movie.poster_path,
            overview: movie.overview,
        }))
        
        for (const movie of movies) {  
            await addMovie(movie);
            
        }

        return movies;
    }
);

const addMovie = async (movie: MovieDetails) => {
    try {
        const docRef = await addDoc(collection(db, "movies"), movie);
        console.log("Document written with ID: ", docRef);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}; 
const initialState: MovieState = {
    movies: [],
    loadingMovie: 'idle',
} 

export const movieSlice = createSlice({
    name: 'movie',
    initialState,
    reducers: {  

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovie.fulfilled, (state, action) => { 
                state.movies = action.payload;
                state.loadingMovie = 'succeeded'; 
            })

            .addCase(fetchMovie.pending, (state) => {
                state.movies = [];
                state.loadingMovie = 'pending';
            })

            .addCase(fetchMovie.rejected, (state) => {
                state.movies = [];
                state.loadingMovie = 'failed';
            })
    },
})
 
export default movieSlice.reducer;