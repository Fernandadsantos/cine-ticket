import { useEffect, useState } from "react";
import { FormatDate, Room, SessionDetails } from "../../interfaces";
import { formatDate } from "../../redux/slicesReducers/dateSlice";
import { useSelector, useDispatch } from "react-redux";
import "./sessionData.css";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";

const filterSchedules = (rooms: Room[], idMovie: string) => {
  let schedulesToCurrentMovie: Room[] = [];

  for (let room of rooms) {
    let schedule = room?.schedules?.filter(
      (schedule) => schedule.idMovie === idMovie
    );
    schedulesToCurrentMovie.push({
      idRoom: room.id,
      schedules: schedule,
    });
  }

  return schedulesToCurrentMovie;
};

export default function Session({
  rooms,
  idMovie,
  movieTitle,
}: SessionDetails) {
  const { availableDate } = useSelector((state: RootState) => state.dateSlice);
  const [datesAvailable, setDatesAvailable] = useState<FormatDate[]>();
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
  const navigate = useNavigate();

  const paramsToSeats = (
    idMovie: string,
    title: string,
    date: FormatDate[],
    idRoom: string,
    schedule: string
  ) => {
    navigate("/session/room", {
      state: {
        idMovie,
        title,
        date,
        idRoom,
        schedule,
      },
    });
  };

  const schedulesToCurrentMovie = filterSchedules(
    rooms as Room[],
    idMovie as string
  );

  useEffect(() => {
    if (availableDate.length === 0) dispatch(formatDate());
  }, []);

  useEffect(() => {
    setDatesAvailable(availableDate as FormatDate[]);
  }, [availableDate]);

  return (
    <div className="data-container">
      <div className="time-container">
        {datesAvailable?.map(({ weekDay, day_month }) => (
          <div className="sessionData-container">
            <h3 className="day">
              {weekDay}
              <br />
              {day_month}
            </h3>

            {schedulesToCurrentMovie &&
              schedulesToCurrentMovie.map((room: Room) => {
                if (room.schedules?.length !== 0) {
                  return (
                    <div className="roomSession">
                      <h3>Sala {room.idRoom}</h3>
                      {room.schedules?.map((schedule) => {
                        return (
                          <button
                            className="btn-time"
                            onClick={() =>
                              paramsToSeats(
                                idMovie as string,
                                movieTitle as string,
                                [weekDay, day_month] as FormatDate[],
                                room.idRoom as string,
                                schedule.schedule as string
                              )
                            }
                          >
                            {schedule.schedule}
                          </button>
                        );
                      })}
                    </div>
                  );
                }
                return null;
              })}
          </div>
        ))}
      </div>
    </div>
  );
}
