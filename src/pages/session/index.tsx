import { useLocation } from 'react-router-dom';
import SessionData from '../../components/sessionData'; 
import { useEffect, useState } from 'react';
import { MovieDetails} from '../../interfaces';
import Header from '../../components/header';
import Footer from '../../components/footer';
import './session.css'; 

export default function Session(){
    const params = useLocation();
    const [currentMovie, setCurrentMovie] = useState<MovieDetails>(); 

    useEffect(() => {
        if(params?.state){ 
            const {state: {title, poster, overview}} = params; 
            setCurrentMovie({title, poster, overview}); 
        }
    },[params]);

    const formatDate = (position: number) => {
        const date = new Date();
        date.setDate(date.getDate()+position); 
        var day = `${date.getDate()}`;
        var mouth  = `${date.getMonth()}`;

        if(day.length === 1 ){
            day = `0${day}`
        }

        if(mouth.length === 1 ){
            mouth = `0${mouth}`
        }

        return `${day}/${mouth}`;
    } 

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
                        <SessionData day='Domingo' currentDate={formatDate(0)} timeSessionOne='14:00' timeSessionTwo='19:00' movieTitle={currentMovie?.title}/>
                        <SessionData day='Segunda-feira' currentDate={formatDate(1)} timeSessionOne='14:00' timeSessionTwo='19:00' movieTitle={currentMovie?.title}/>
                        <SessionData day='Terça-feira' currentDate={formatDate(2)} timeSessionOne='14:00' timeSessionTwo='19:00' movieTitle={currentMovie?.title}/>
                        <SessionData day='Quarta-feira' currentDate={formatDate(3)} timeSessionOne='14:00' timeSessionTwo='19:00' movieTitle={currentMovie?.title}/>
                        <SessionData day='Quinta-feira' currentDate={formatDate(4)} timeSessionOne='14:00' timeSessionTwo='19:00' movieTitle={currentMovie?.title}/>
                        <SessionData day='Sexta-feira' currentDate={formatDate(5)} timeSessionOne='14:00' timeSessionTwo='19:00' movieTitle={currentMovie?.title}/>
                        <SessionData day='Sábado' currentDate={formatDate(6)} timeSessionOne='14:00' timeSessionTwo='19:00' movieTitle={currentMovie?.title}/>
                    </div>
                </div> 
            </main> 
            <Footer/>
        </div>
    )
}