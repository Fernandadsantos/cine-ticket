import { SessionDetails } from '../../interfaces'; 
import { useEffect, useState } from 'react'; 
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import './sessionData.css';

export default function Session({day, currentDate, timeSessionOne, timeSessionTwo, movieTitle}: SessionDetails){ 
    const [currentMovie, setCurrentMovie] = useState<string>(); 
    const {movies = [] } = useSelector((state: RootState) => state.movieSlice); 
    const {rooms = []} = useSelector((state: RootState) => state.roomSlice); 
    
    useEffect(() => {
        setCurrentMovie(movieTitle);
    }, [movieTitle]);
 
  
    return(
        <div className='data-conatiner'>  
            <h2 className='day'>{day}</h2>
            <p className='currentDate'>{currentDate}</p>
            <div className='time-container'>
                <button className='btn-time' >
                    {timeSessionOne}
                </button>
                <button className='btn-time'  >
                    {timeSessionTwo}
                </button> 
            </div>
        </div>
    )
}