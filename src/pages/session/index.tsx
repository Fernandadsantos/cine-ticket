import { useLocation } from 'react-router-dom';
import SessionData from '../../components/sessionData'; 
import { useEffect, useState } from 'react';
import { MovieDetails } from '../../interfaces';
import Header from '../../components/header';
import Footer from '../../components/footer'; 
import './session.css';  
import { useSelector } from 'react-redux'; 
import { RootState } from '../../redux/store';

export default function Session(){ 
    const params = useLocation();
    const [currentMovie, setCurrentMovie] = useState<MovieDetails>();  
    const {rooms = [] } = useSelector((state: RootState) => state.roomSlice);  
 
    
    useEffect(() => {
        if(params?.state){  
            const {state: { idMovie, title, poster, overview}} = params; 
            setCurrentMovie({idMovie, title, poster, overview});   
        }
    },[params]);
   

    return(
        <div>
            <Header/>
            <main className='session'>
                <h1 className='movieTitle'>{currentMovie?.title}</h1> 
                <div className='details'>
                    <div className='container'>
                        <img src={currentMovie?.poster} alt="Poster do filme" className='moviePoster'/> 
                        <p className='movieOverview'>
                            <span className='subtitle'>Sinopse: </span> 
                            {currentMovie?.overview ? currentMovie?.overview : "Indisponível"}
                        </p> 
                    </div>
                    <div className='sessionsDays'> 
                        <SessionData rooms={rooms} movieTitle={currentMovie?.title}/> 
                    </div>
                </div> 
            </main> 
            <Footer/>
        </div>
    )
}