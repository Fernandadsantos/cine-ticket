import React from "react"; 
import github from '../../assets/github.png';
import instagram from '../../assets/instagram.png';
import linkedin from '../../assets/linkedin.png';
import './footer.css';

export default function Footer(){
    return(
        <div className="footer">
            <div className="social-media">
                <a href="https://www.instagram.com/fe_nandasantosz/?next=%2F" target="_blank" rel="noreferrer">
                    <img className="social-media-logo" src={instagram} alt="Instagram logo"/>  
                </a>
                <a href="https://github.com/Fernandadsantos" target="_blank" rel="noreferrer">
                    <img className="social-media-logo github-logo" src={github} alt="Github logo"/>
                </a>
                <a href="https://www.linkedin.com/in/fernanda-santos-864a19232?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer">
                    <img className="social-media-logo" src={linkedin} alt="Linkedin logo"/>
                </a> 
            </div>
            <h3 className="author">By <a href="https://github.com/Fernandadsantos" target="_blank" rel="noreferrer"> Fernanda da Silva Santos</a></h3>
        </div>
    )
}