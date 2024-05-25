import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api, getImageRoot } from "../../api/axios";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { Movie, MovieDetails, MovieState } from "../../interfaces";

export const fetchMovie = createAsyncThunk("movie/fetchMovie", async () => {
  const { empty, docs } = await getDocs(collection(db, "movies"));

  if (!empty && docs.length <= 20) {
    return docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  }

  const {
    data: { results },
  } = await api.get(
    "/movie/popular?api_key=1abb3e68d878be1155d781ce812f80a8&language=pt-BR"
  );

  const movies: Movie[] = results;

  const formattedMovies = movies.map((movie: Movie, index, array) => {
    return {
      id: movie.id,
      title: movie.title,
      poster: getImageRoot() + movie.poster_path,
      overview: movie.overview,
    };
  });

  for (const movie of formattedMovies) {
    await addMovie(movie as MovieDetails);
  }

  return formattedMovies;
});

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
  loadingMovie: "idle",
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovie.fulfilled, (state, action) => {
        state.movies = action.payload as Movie[];
        state.loadingMovie = "succeeded";
      })

      .addCase(fetchMovie.pending, (state) => {
        state.movies = [];
        state.loadingMovie = "pending";
      })

      .addCase(fetchMovie.rejected, (state) => {
        state.movies = [];
        state.loadingMovie = "failed";
      });
  },
});

export default movieSlice.reducer;
