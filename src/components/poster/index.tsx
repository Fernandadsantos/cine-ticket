 import './poster.css';  

export interface PosterMovie{
    poster_path: string;  
}

export default function Poster({poster_path }: PosterMovie){ 
  
    return(
        <div className="poster-container">
            <img className="poster-image" src={poster_path} alt="Poster do filme"  />  
        </div>
    )
}