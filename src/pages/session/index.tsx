import { useLocation } from "react-router-dom";
import SessionData from "../../components/sessionData";
import { useEffect, useState } from "react";
import { MovieDetails } from "../../interfaces";
import Header from "../../components/header";
import Poster from "../../components/poster";
import "./session.css";

export default function Session() {
  const params = useLocation();
  const [currentMovie, setCurrentMovie] = useState<MovieDetails>();

  useEffect(() => {
    if (params?.state) {
      const {
        state: { idMovie, title, poster, overview },
      } = params;
      setCurrentMovie({ idMovie, title, poster, overview });
    }
  }, [params]);

  return (
    <div>
      <Header />
      <main className="session">
        <h1 className="movieTitle">{currentMovie?.title}</h1>
        <div className="details">
          <div className="container">
            <Poster
              poster_path={currentMovie?.poster as string}
              staticMode={true}
            />
            <p className="movieOverview">
              <span className="subtitle">Sinopse: </span>
              {currentMovie?.overview ? currentMovie?.overview : "Indisponível"}
            </p>
          </div>
          <div className="sessionsDays">
            <SessionData
              idMovie={currentMovie?.idMovie}
              movieTitle={currentMovie?.title}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
