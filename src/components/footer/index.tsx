import React from "react"; 
import github from '../../assets/github.png';
import instagram from '../../assets/instagram.png';
import linkedin from '../../assets/linkedin.png';
import './footer.css';

export default function Footer(){
    return(
        <div className="footer">
            <h1 className="footerTitle">CINE TICKET</h1>
            <div className="social-media">
                <a href="https://www.instagram.com/fe_nandasantosz/?next=%2F" target="_blank" rel="noreferrer">
                    <img className="social-media-logo logo" src={instagram} alt="Instagram logo"/>  
                </a>
                <a href="https://github.com/Fernandadsantos" target="_blank" rel="noreferrer">
                    <img className="social-media-logo logo" src={github} alt="Github logo"/>
                </a>
                <a href="https://www.linkedin.com/in/fernanda-santos-864a19232?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer">
                    <img className="social-media-logo logo" src={linkedin} alt="Linkedin logo"/>
                </a> 
            </div>
        </div>
    )
}