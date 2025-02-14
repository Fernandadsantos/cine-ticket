import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovie } from "../../redux/slicesReducers/movieSlice";
import { Box, Fab, Skeleton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Header from "../../components/header";
import Poster from "../../components/poster";
import { Movie } from "../../interfaces";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./homepage.css";

export default function HomePage() {
  const { movies = [], loadingMovie } = useSelector(
    (state: RootState) => state.movieSlice
  );
  const [moviesList, setMoviesList] = useState<Movie[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
  const navigate = useNavigate();
  const skeletonArray: number[] = Array.from({ length: 20 }, (v, k) => k);

  const loadingMovies = async () => {
    await dispatch(fetchMovie());
  };
  useEffect(() => {
    loadingMovies();
  }, []);

  useEffect(() => {
    setMoviesList(movies);
  }, [movies]);

  const paramsToSession = (
    idMovie: string,
    title: string,
    poster: string,
    overview: string
  ) => {
    navigate("/session", {
      state: {
        idMovie,
        title,
        poster,
        overview,
      },
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <Header />
      <main>
        <div
          className="floating-btn"
          style={{ display: isVisible ? "flex" : "none" }}
        >
          <Fab
            sx={{ backgroundColor: "#a32121" }}
            aria-label="add"
            onClick={() => scrollToTop()}
          >
            <KeyboardArrowUpIcon sx={{ height: "30px", width: "30px" }} />
          </Fab>
        </div>
        <h1 className="homepage-title">Filmes em cartaz</h1>
        <div className="containerMovies">
          <Grid container spacing={8} justifyContent="center">
            {loadingMovie !== "succeeded"
              ? skeletonArray.map((e) => {
                  return (
                    <Grid>
                      <div>
                        <Skeleton
                          className="skeleton-poster"
                          variant="rounded"
                          width={200}
                          height={320}
                          animation="wave"
                          sx={{ bgcolor: "grey.900" }}
                        />
                      </div>
                    </Grid>
                  );
                })
              : moviesList &&
                moviesList.map((movie: Movie) => {
                  if (movie.poster !== "") {
                    return (
                      <Grid>
                        <div
                          onClick={() =>
                            paramsToSession(
                              movie.id,
                              movie.title,
                              movie.poster,
                              movie.overview
                            )
                          }
                        >
                          <Poster
                            poster_path={movie.poster}
                            staticMode={false}
                          />
                        </div>
                      </Grid>
                    );
                  }
                })}
          </Grid>
        </div>
      </main>
    </div>
  );
}
