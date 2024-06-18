import { createSlice } from "@reduxjs/toolkit";
import { DateState } from "../../interfaces";

const initialState: DateState = {
  availableDate: [],
};

export const dateSlice = createSlice({
  name: "availableDate",
  initialState,
  reducers: {
    formatDate: (state) => {
      const days = [
        "Domingo",
        "Segunda-Feira",
        "terça-Feira",
        "Quarta-Feira",
        "Quinta-Feira",
        "Sexta-Feira",
        "Sábado",
      ];
      const months = [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];

      for (let i = 1; i < days.length; i++) {
        const date = new Date();
        date.setDate(date.getDate() + i);

        const currentDay = date.getDay();
        let day = date.getDate().toString();
        const currentMonth = date.getMonth();

        if (day.length === 1) {
          day = day.padStart(2, "0");
        }

        state?.availableDate?.push({
          weekDay: days[currentDay],
          day_month: `${day}/${months[currentMonth]}`,
        });
      }
    },
  },
});

export const { formatDate } = dateSlice.actions;
export default dateSlice.reducer;
