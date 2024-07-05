import { useEffect, useState } from "react";
import {
  FormatDate,
  Movie,
  Room,
  SeatsInterface,
  SessionDetails,
} from "../../interfaces";
import { formatDate } from "../../redux/slicesReducers/dateSlice";
import { useSelector, useDispatch } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { fetchRooms } from "../../redux/slicesReducers/roomSlice";
import { Skeleton } from "@mui/material";
import "./sessionData.css";

const filterSchedules = (rooms: Room[], idMovie: string) => {
  let schedulesToCurrentMovie: Room[] = [];

  for (let room of rooms) {
    let schedule = room?.schedules?.filter(
      (schedule) => schedule.idMovie === idMovie
    );
    let seats = schedule?.find((elem) => elem.seats);

    schedulesToCurrentMovie.push({
      idRoom: room.id as string,
      schedules: schedule,
      seats: seats as SeatsInterface,
    });
  }

  return schedulesToCurrentMovie;
};

export default function Session({ idMovie, movieTitle }: SessionDetails) {
  const { availableDate } = useSelector((state: RootState) => state.dateSlice);
  const { rooms = [], loadingRooms = "" } = useSelector(
    (state: RootState) => state.roomSlice
  );
  const { movies = [] } = useSelector((state: RootState) => state.movieSlice);
  const [datesAvailable, setDatesAvailable] = useState<FormatDate[]>();
  const [currentIdMovie, setCurrentIdMovie] = useState<string>();
  const [roomsList, setRoomsList] = useState<Room[]>([]);
  const dispatch = useDispatch<ThunkDispatch<RootState, any, AnyAction>>();
  const navigate = useNavigate();

  const init = async () => {
    await dispatch(fetchRooms(movies as Movie[]));
  };

  useEffect(() => {
    init();
  }, [movies]);

  useEffect(() => {
    if (rooms) {
      setRoomsList(rooms);
    }
  }, [rooms]);

  const paramsToRoom = (
    idMovie: string,
    title: string,
    date: FormatDate[],
    idRoom: string,
    schedule: string,
    seats: SeatsInterface[]
  ) => {
    navigate("/session/room", {
      state: {
        idMovie,
        title,
        date,
        idRoom,
        schedule,
        seats,
      },
    });
  };

  useEffect(() => {
    if (idMovie) {
      setCurrentIdMovie(idMovie);
    }
  }, [idMovie]);

  const schedulesToCurrentMovie = filterSchedules(
    roomsList as Room[],
    currentIdMovie as string
  );

  useEffect(() => {
    if (!Boolean(availableDate.length)) {
      dispatch(formatDate());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableDate]);

  useEffect(() => {
    setDatesAvailable(availableDate as FormatDate[]);
  }, [availableDate]);

  const skeletonArray: number[] = Array.from({ length: 6 }, (v, k) => k);

  return (
    <div className="data-container">
      <div className="time-container">
        {loadingRooms !== "succeeded"
          ? skeletonArray.map((e) => {
              return (
                <Skeleton
                  className="skeleton-sessionData"
                  variant="rounded"
                  width={400}
                  height={80}
                  animation="wave"
                  sx={{ bgcolor: "grey.900" }}
                />
              );
            })
          : datesAvailable?.map(({ weekDay, day_month }) => (
              <div className="sessionData-container">
                <h3 className="day">
                  {weekDay}
                  <br />
                  {day_month}
                </h3>

                {schedulesToCurrentMovie?.map((room: Room) => {
                  if (room.schedules?.length !== 0) {
                    return (
                      <div className="roomSession">
                        <h3>Sala {room.idRoom}</h3>
                        {room.schedules?.map((schedule) => {
                          return (
                            <button
                              className="btn-time"
                              onClick={() =>
                                paramsToRoom(
                                  idMovie as string,
                                  movieTitle as string,
                                  [weekDay, day_month] as FormatDate[],
                                  room.idRoom as string,
                                  schedule.schedule as string,
                                  schedule.seats as SeatsInterface[]
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
