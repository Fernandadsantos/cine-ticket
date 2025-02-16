import React, { useEffect, useState } from "react";
import Header from "../../components/header";
import "./ticket.css";
import { useLocation } from "react-router-dom";
import { TicketParams } from "../../interfaces";
import TicketCard from "../../components/tikect-card";
import { Input } from "@mui/material";

export default function Ticket() {
  const params = useLocation();
  const [currentTicketDetails, setCurrentTicketDetails] =
    useState<TicketParams>();

  useEffect(() => {
    if (params?.state) {
      const {
        state: { chairs, idMovie, title, date, idRoom, schedule, seats },
      } = params;
      setCurrentTicketDetails({
        chairs,
        idMovie,
        title,
        date,
        idRoom,
        schedule,
        seats,
      });
    }
  }, [params]);

  return (
    <div>
      <Header stepsCompleted={3} />
      <h1
        className="homepage-title"
        style={{ paddingTop: "30px", paddingBottom: "30px" }}
      >
        Bilhete
      </h1>
      <section className="tickets-card">
        {currentTicketDetails?.chairs ? (
          currentTicketDetails?.chairs.map((seat) => {
            return (
              <TicketCard
                chairs={currentTicketDetails.chairs}
                idMovie={currentTicketDetails.idMovie}
                title={currentTicketDetails.title}
                date={currentTicketDetails.date}
                idRoom={currentTicketDetails.idRoom}
                schedule={currentTicketDetails.schedule}
                seat={seat}
                line={seat.line ?? ""}
              />
            );
          })
        ) : (
          <p>falta</p>
        )}
      </section>
      <section>
        <div>
          <form>
            {currentTicketDetails?.chairs?.map((chair) => {
              return (
                <Input value={"aaaa"} color="primary" sx={{ color: "#fff" }} />
              );
            })}
          </form>
        </div>
      </section>
    </div>
  );
}
