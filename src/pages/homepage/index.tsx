import {useEffect, useState} from "react";
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from "react-redux";
import { fetchMovie } from "../../redux/slicesReducers/movieSlice";  
import { getImageRoot } from "../../api/axios";   
import { Grid} from "@mui/material"; 
import Poster from "../../components/poster";
import Footer from "../../components/footer";
import "./homepage.css";  

export default function HomePage(){ 
    const [posters, setPosters] = useState<string[]>([]);
    const {movie = [], loadingMovie} = useSelector((state: RootState) => state.movieSlice);
    const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();  
 
    
    useEffect(()=> {
        loadingMovies();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) 

    useEffect(()=>{
        if(loadingMovie === 'succeeded'){
            setPosters(movie.map(movie => { 
                return getImageRoot() + movie["poster_path"];
            }));  
        }

    },[movie, loadingMovie]);

    const loadingMovies = async () => {
        await dispatch(fetchMovie());  
    }
   
    return(
        <div> 
            <h1 className="homepage-title">Filmes em cartaz</h1> 
            <div className="container-movies"> 
                <Grid container spacing={8} justifyContent="center"   >
                        {// eslint-disable-next-line array-callback-return
                            posters.map(poster => {
                                if(poster !== ''){
                                    return  <Grid item > <Poster poster_path={poster} /> </Grid>;
                                }
                        })} 
                </Grid>
            </div>
            <Footer/>
        </div>
    )
}