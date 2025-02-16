import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FormatDate, SeatParams, SeatsInterface } from "../../interfaces";
import { Button } from "@mui/material";
import ComponentSeats from "../../components/ComponentSeats";
import Header from "../../components/header";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import "./room.css";

export default function Room() {
  const params = useLocation();
  const [currentSessionDetails, setCurrentSessionDetails] =
    useState<SeatParams>();
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [chairs, setChairs] = useState<SeatsInterface[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (params?.state) {
      const {
        state: { idMovie, title, date, idRoom, schedule, seats },
      } = params;
      setCurrentSessionDetails({
        idMovie,
        title,
        date,
        idRoom,
        schedule,
        seats,
      });
    }
  }, [params]);

  const currentDay = currentSessionDetails?.date[0];
  const currentDate = `${currentSessionDetails?.date[1]}`;
  const dayLogo = `${currentDate[0]}${currentDate[1]} `;
  const seats: SeatsInterface[] =
    currentSessionDetails?.seats as SeatsInterface[];

  const letters = seats
    // eslint-disable-next-line array-callback-return
    ?.filter((seat, index, array) => {
      if (
        (index + 1 < array.length && seat.line !== array[index + 1].line) ||
        index === array.length - 1
      ) {
        return seat?.line;
      }
    })
    .map((seat) => seat?.line);

  useEffect(() => {
    if (chairs.length === 0) {
      setDisabledButton(true);
    } else {
      setDisabledButton(false);
    }
  }, [chairs]);

  const paramsToTicket = (
    chairs: SeatsInterface[],
    idMovie: string,
    title: string,
    date: FormatDate[],
    idRoom: string,
    schedule: string,
    seats: SeatsInterface[]
  ) => {
    navigate("/session/room/ticket", {
      state: {
        chairs,
        idMovie,
        title,
        date,
        idRoom,
        schedule,
        seats,
      },
    });
  };

  return (
    <div>
      <Header stepsCompleted={2} />
      <main className="room">
        <h1 className="page_title">Escolha seu assento</h1>
        <div className="room_details">
          <div className="infos_session">
            <h2>{currentSessionDetails?.title}</h2>
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
          <div className="wrapper">
            <div className="seats">
              <div className="queue">
                {letters &&
                  letters?.map((letter) => {
                    return <p className="letter">{letter}</p>;
                  })}
              </div>
              <div>
                <ComponentSeats
                  seats={seats ? seats : []}
                  letters={letters?.join("")}
                  chairs={chairs}
                  setChairs={setChairs}
                />
              </div>
              <div className="queue">
                {letters &&
                  letters?.map((letter) => {
                    return <p className="letter">{letter}</p>;
                  })}
              </div>
            </div>
            <div className="screen-box">
              <p className="screen-label">Tela</p>
              <span className="screen"></span>
            </div>
            <div className="seats-exemple">
              <div className="available-seat-exemple"></div>
              <p>Disponível</p>
              <div className="unAvailable-seat-exemple">
                <ClearIcon sx={{ color: "#000" }} />
              </div>
              <p>Indisponível</p>
            </div>
          </div>
        </div>
        <div className="btn-continue">
          <Button
            disabled={disabledButton}
            size="large"
            variant="contained"
            sx={{
              backgroundColor: "#a32121",
              color: " #fff ",
            }}
            onClick={() => {
              if (currentSessionDetails !== null) {
                paramsToTicket(
                  chairs,
                  currentSessionDetails?.idMovie as string,
                  currentSessionDetails?.title as string,
                  currentSessionDetails?.date as FormatDate[],
                  currentSessionDetails?.idRoom as string,
                  currentSessionDetails?.schedule as string,
                  currentSessionDetails?.seats as SeatsInterface[]
                );
              }
            }}
          >
            Comprar
          </Button>
        </div>
      </main>
    </div>
  );
}
