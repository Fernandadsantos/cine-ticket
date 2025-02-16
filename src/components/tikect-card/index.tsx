import React, { useEffect, useState } from "react";
import { TicketParams } from "../../interfaces";
import "./tikectCard.css";

export default function TicketCard(currentTicketDetails: TicketParams) {
  const [numTicket, setNumTicket] = useState<string>("");
  const randomNumTicket = () => {
    var newNumTicket = "";

    for (var i = 0; i < 16; i++) {
      newNumTicket += Math.floor(Math.random() * 10 + 1).toString();
    }

    setNumTicket(newNumTicket);
  };

  useEffect(() => {
    if (!numTicket) {
      randomNumTicket();
    }
  }, [numTicket]);

  return (
    <div className="ticket-container">
      <section>
        <div className="ticket-top">
          <div style={{ padding: "20px 0" }}>
            <div>
              <p className="subtitle">Movie</p>
              <h1 className="title">{currentTicketDetails?.title}</h1>
            </div>
            <div className="div-detail-top">
              <p className="detail-top">----------------</p>
            </div>
            <div className="div-details">
              <div className="div-room-details">
                <div className="sub-div-details">
                  <p className="label">Sala</p>
                  <p className="value">{currentTicketDetails?.idRoom}</p>
                </div>
                <div className="sub-div-details">
                  <p className="label">Fila</p>
                  <p className="value">
                    {currentTicketDetails
                      ? currentTicketDetails.chairs[0].line
                      : "erro"}
                  </p>
                </div>
                <div className="sub-div-details">
                  <p className="label">Assento</p>
                  <p className="value">
                    {currentTicketDetails
                      ? currentTicketDetails.seat?.seat
                      : "erro"}
                  </p>
                </div>
              </div>
              <div className="div-room-details">
                <div className="sub-div-details">
                  <p className="label">Data</p>
                  <p className="value">
                    {currentTicketDetails
                      ? `${currentTicketDetails.date[1]}`
                      : "erro"}
                  </p>
                </div>
                <div className="sub-div-details">
                  <p className="label">Hora</p>
                  <p className="value">
                    {currentTicketDetails
                      ? `${currentTicketDetails.schedule} ${
                          parseInt(currentTicketDetails.schedule) < 12
                            ? "am"
                            : "pm"
                        }`
                      : "erro"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="div-number-ticket">
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                justifyContent: "center",
                width: "80%",
                textAlign: "center",
              }}
            >
              <p className="label-num">Numero de ingresso</p>
              <p className="value-num">{numTicket}</p>
            </div>
          </div>
        </div>
        <div className="ticket-bottom">
          <div className="data-container">
            <div className="data">
              <div className="data-div">
                <p className="data-label">Nome</p>
                <p className="data-value">NOME AQUI</p>
              </div>
              <div className="data-div">
                <p className="data-label">Preço</p>
                <p className="data-value">$17,99</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
