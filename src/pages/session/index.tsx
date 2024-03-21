 import { time } from 'console';
import SessionData from '../../components/sessionData';
import './session.css';

export default function Session(){
    
    const formatDate = (position: number) => {
        const date = new Date();
        date.setDate(date.getDate()+position); 
        var day = `${date.getDate()}`;
        var mouth  = `${date.getMonth()}`;
        

        if(day.length === 1 ){
            day = `0${day}`
        }

        if(mouth.length === 1 ){
            mouth = `0${date.getMonth()}`
        }

        return `${day}/${mouth}`;
        
    }
    return(
        <div>
            <h1>Escolha a sessão</h1> 
            <div className='sessionsDays'>
                <SessionData day='Domingo' currentDate={formatDate(0)}></SessionData>
                <SessionData day='Segunda-feira' currentDate={formatDate(1)}></SessionData>
                <SessionData day='Terça-feira' currentDate={formatDate(2)}></SessionData>
                <SessionData day='Quarta-feira' currentDate={formatDate(3)}></SessionData>
                <SessionData day='Quinta-feira' currentDate={formatDate(4)}></SessionData>
                <SessionData day='Sexta-feira' currentDate={formatDate(5)}></SessionData>
                <SessionData day='Sábado' currentDate={formatDate(6)}></SessionData>
            </div>
        </div>
    )
}