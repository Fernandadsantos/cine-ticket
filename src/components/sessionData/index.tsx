import { Room, SessionDetails } from '../../interfaces';  
import './sessionData.css';

const formatDate = (position: number) => {
    const days = [
        'Domingo',
        'Segunda-Feira',
        'terça-Feira',
        'Quarta-Feira',
        'Quinta-Feira',
        'Sexta-Feira',
        'Sábado'
    ];
    const months = [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12',
    ];
    const date = new Date(); 
    date.setDate(date.getDate()+position); 
    
    const currentDay = date.getDay(); 
    let day = `${date.getDate()}`;
    const currentMonths  = date.getMonth(); 

    if(day.length === 1 ){
        day = `0${day}`
    }
    
    return [days[currentDay],
    day,months[currentMonths]];
}



export default function Session({rooms ,movieTitle}: SessionDetails){  
    
    return(
        <div className='data-conatiner'>   
            
                {
                    rooms && rooms.map((room: Room, index) => {
                        const [dayOfTheWeek, day, month] = formatDate(index);
                        return <div className='time-container'>
                            <h3 className='day'>
                                {dayOfTheWeek}
                                <br/>
                                {day}/{month}
                            </h3> 
                            <h3>
                                Sala {room.id}
                            </h3> 
                            <button className='btn-time'> 
                            </button>
                        </div> 
                    })
                }  
        </div>
    )
}