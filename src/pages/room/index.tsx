import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header";
import { SeatParams } from "../../interfaces";
import "./room.css";
import Seats from "../../components/seats";

export default function Room() {
  const params = useLocation();
  const [currentSessionDetails, setCurrentSessionDetails] =
    useState<SeatParams>();

  useEffect(() => {
    if (params?.state) {
      const {
        state: { idMovie, title, date, idRoom, schedule },
      } = params;
      setCurrentSessionDetails({ idMovie, title, date, idRoom, schedule });
    }
  }, [params]);
  const currentDay = currentSessionDetails?.date[0];
  const currentDate = `${currentSessionDetails?.date[1]}`;
  const dayLogo = `${currentDate[0]}${currentDate[1]} `;

  return (
    <div>
      <Header />
      <main className="room">
        <h1 className="page_title">Escolha seu assento</h1>
        <div className="room_details">
          <div className="infos_session">
            <h2 className="">{currentSessionDetails?.title}</h2>
            <div className="div_format">
              <p className="dayLogo">{dayLogo}</p>
              <p>
                {currentDay as string}, {currentDate as string}
              </p>
            </div>
            <div className="div_format">
              <svg viewBox="0 0 20 20" focusable="false" className="svg_time">
                <circle
                  cx="10.0013"
                  cy="9.99984"
                  r="5.83333"
                  fill="#fff"
                ></circle>
                <path
                  d="M10 7.5V10H12.5"
                  stroke="#363333"
                  stroke-width="1.5"
                ></path>
              </svg>
              <p>{currentSessionDetails?.schedule}</p>
            </div>
          </div>
          <Seats />
        </div>
      </main>
    </div>
  );
}
