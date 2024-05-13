import { useEffect } from "react"; 
import { useNavigate } from "react-router-dom";
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from "react-redux";
import { fetchMovie } from "../../redux/slicesReducers/movieSlice"; 
import { Grid } from "@mui/material";
import Header from "../../components/header";
import Poster from "../../components/poster";
import Footer from "../../components/footer";
import { Movie } from "../../interfaces"; 
import "./homepage.css";  

export default function HomePage() { 
    const {movies = [] } = useSelector((state: RootState) => state.movieSlice); 
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
    const navigate = useNavigate();
 
    const loadingMovies = async () => {
        await dispatch(fetchMovie());
    }

    useEffect(() => {
        loadingMovies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])  

    
    const paramsToSession = (title: string, poster: string, overview: string) => {

        navigate("/session", {
            state: {
                title,
                poster,
                overview,
            }
        })
    }


    return (
        <div>
            <Header />
            <main>
                <h1 className="homepage-title">Filmes em cartaz</h1>
                <div className="containerMovies">
                    <Grid container spacing={8} justifyContent="center" >
                        {// eslint-disable-next-line array-callback-return
                            movies && movies.map((movie: Movie) => { 
                                if (movie.poster !== '') {
                                    return <Grid item>
                                        <div onClick={() => paramsToSession(movie.title, movie.poster, movie.overview)}>
                                            <Poster poster_path={movie.poster}/>
                                        </div>
                                    </Grid>;
                                }
                            })        
                        }
                    </Grid>
                </div>
            </main>
            <Footer />
        </div>
    )
}