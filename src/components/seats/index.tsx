import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import './seats.css';
import { useEffect, useState } from 'react';

export default function Seats(){
     

    return(
        <div className='seat-container'>
            {}
            <div className='seat'></div>
        </div>
    )
}