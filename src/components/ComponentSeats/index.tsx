import { useSelector } from "react-redux";
import { SeatsInterface } from "../../interfaces";
import {
  addChairs,
  removeChairs,
} from "../../redux/slicesReducers/chairsSlice";
import { RootState } from "../../redux/store";
import "./componentSeats.css";

export default function ComponentSeats({
  seats,
  letters,
}: {
  seats: SeatsInterface[];
  letters: string;
}) {
  const listOfChairs: [SeatsInterface][] = [];
  const { chairs = [] } = useSelector((state: RootState) => state.chairsSlice);

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
    const btnSeat = document.querySelector(`[id='${row.line}/${row.seat}']`);
    const btnBuy = document.querySelector(".btn-continue");

    if (btnSeat?.classList.contains("selected")) {
      btnSeat?.classList.remove("selected");
      btnBuy?.classList.add("btn-continue-active");
    } else {
      btnSeat?.classList.add("selected");
    }

    const selectedChairs = chairs.find((chair) => chair === row);
    console.log("selectedChairs", selectedChairs);
    if (selectedChairs) {
      removeChairs(row);
    } else {
      addChairs(row);
    }

    console.log("chairs", chairs);
  };

  return (
    <div className="seat-container">
      {listOfChairs &&
        listOfChairs.map((list: [SeatsInterface]) => {
          return (
            <div className="row">
              {list.map((row) => {
                if (row.status === "available") {
                  return (
                    <div>
                      <button
                        className={`seat ${row.status}`}
                        id={`${row.line}/${row.seat}`}
                        onClick={() => handleChange(row)}
                      >
                        {row.seat}
                      </button>
                    </div>
                  );
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
