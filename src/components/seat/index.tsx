import React, { useState } from "react";
import { SeatProps } from "../../interfaces";
import "./seat.css";

export default function Seat({ handleChange, row }: SeatProps) {
  const [selected, setSelected] = useState(false);

  const toggleBtn = () => {
    setSelected(!selected);
    handleChange(row);
  };

  const currentSeatStatus = () => {
    if (row.status === "available" && selected) {
      return "selected";
    }

    if (row.status === "available" && !selected) {
      return "";
    }

    return "unavailable";
  };

  return (
    <div>
      <button
        className={`seat  ${currentSeatStatus()}`}
        id={`${row.line}/${row.seat}`}
        onClick={toggleBtn}
      >
        {row.seat}
      </button>
    </div>
  );
}
