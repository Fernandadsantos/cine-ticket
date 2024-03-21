import './sessionData.css';
import { Session} from '../../interfaces';

export default function SessionData({day, currentDate}: Session){
    return(
        <div className='data-conatiner'>  
            <h2 className='day'>{day}</h2>
            <p className='currentDate'>{currentDate}</p>
            <div className='time-container'>
                <button className='btn-time'>14:30</button>
                <button className='btn-time'>19:30</button> 
            </div>
        </div>
    )
}