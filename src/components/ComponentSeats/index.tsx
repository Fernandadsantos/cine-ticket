import { SeatsInterface } from "../../interfaces";
import Seat from "../seat";
import "./componentSeats.css";

export default function ComponentSeats({
  seats,
  letters,
  chairs,
  setChairs,
}: {
  seats: SeatsInterface[];
  letters: string;
  chairs: SeatsInterface[];
  setChairs: React.Dispatch<React.SetStateAction<SeatsInterface[]>>;
}) {
  const listOfChairs: [SeatsInterface][] = [];

  if (letters) {
    for (let i = 0; i < letters.length; i++) {
      let currentQueue = seats.filter((seat) => seat.line === letters[i]);
      if (currentQueue.length !== 0) {
        listOfChairs.push(currentQueue as [SeatsInterface]);
      }
      currentQueue = [];
    }
  }

  const handleChange = (row: SeatsInterface) => {
    const selectedChairs = chairs.some((chair) => chair.seat === row.seat);

    if (selectedChairs) {
      const filteredChairs = chairs.filter((chair) => chair !== row);

      setChairs(filteredChairs);
    } else {
      const chairAdded = [...chairs, row];
      setChairs(chairAdded);
    }
  };

  return (
    <div className="seat-container">
      {listOfChairs &&
        listOfChairs.map((list: [SeatsInterface]) => {
          return (
            <div className="row">
              {list.map((row) => {
                if (row.status === "available") {
                  return <Seat handleChange={handleChange} row={row} />;
                }
                return (
                  <div
                    className={`seat ${row.status}`}
                    onClick={() => handleChange(row)}
                  >
                    <div className="div1"></div>
                    <div className="div2"></div>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}
