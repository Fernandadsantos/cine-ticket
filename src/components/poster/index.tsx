import { PosterSettings } from "../../interfaces";
import "./poster.css";

export default function Poster({ poster_path, staticMode }: PosterSettings) {
  return (
    <div className="poster-container">
      <img
        className={staticMode ? "poster-image-static" : "poster-image"}
        src={poster_path}
        alt="Poster do filme"
      />
    </div>
  );
}
