import React from "react"; 
import './header.css'; 

export default function Header(){
    
    return(
        <header className="header-container">
            <a href="/" className="header">
                <h1>Filmes</h1>
            </a>
            <a href="/session" className="header">
                <h1>Sessões</h1>
            </a>
            <a href="/seats" className="header">
                <h1>Assentos</h1>
            </a>
            <a href="/ticket" className="header">
                <h1>Bilhete</h1>
            </a>
        </header> 
    )
}