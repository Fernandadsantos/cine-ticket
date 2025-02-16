import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface Movie {
  poster: string;
  posters: [];
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieState {
  movies: Movie[];
  loadingMovie: string;
  id?: string;
  title?: string;
  overview?: string;
  poster_path?: string;
}

export interface SessionDetails {
  rooms?: Room[];
  movieTitle?: string;
  idMovie?: string;
  idRoom?: string;
  schedules?: string;
}

export interface Session {
  idRoom?: string;
  idMovie?: string;
  title?: string;
  time?: string;
  day?: string;
  date?: Date;
}

export interface MovieDetails {
  idMovie?: string;
  title?: string;
  poster?: string;
  overview?: string;
}

export interface Schedules {
  schedulesList: number[];
  idMovie?: string;
  seats?: SeatsInterface[];
  schedule?: string;
}

export interface RoomSchedule {
  idMovie?: string;
  schedule?: string;
  seats?: SeatsInterface[];
}

export interface ObjectRoomSchedule {
  object: RoomSchedule;
}

export interface Room {
  idRoom?: string;
  id?: string;
  idMovie?: string;
  schedules?: RoomSchedule[];
  seats?: SeatsInterface;
}

export interface RoomState {
  rooms: Room[];
  loadingRooms: string;
}

export interface FormatDate {
  weekDay?: string;
  day_month?: string;
}

export interface DateState {
  availableDate: FormatDate[];
}

export interface SeatParams {
  idMovie: string;
  title: string;
  date: FormatDate[];
  idRoom: string;
  schedule: string;
  seats?: SeatsInterface[];
  chairs?: SeatsInterface[];
}

export interface TicketParams extends SeatParams {
  chairs: SeatsInterface[];
  seat?: SeatsInterface;
  line?: string;
}

export interface SeatsInterface {
  seat?: number;
  line?: string;
  status?: string;
  id: string;
}

export interface Seats {
  seats?: SeatsInterface[];
}

export interface Chairs {
  chairs?: SeatsInterface[];
}

export interface PosterSettings {
  poster_path: string;
  staticMode: boolean;
}

export interface RoomParams {
  seats: SeatsInterface[];
  movies: Movie[];
}

export interface SeatProps {
  handleChange: Function;
  row: SeatsInterface;
}

export interface StepProps {
  label: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

export interface HeaderProps {
  stepsCompleted?: number;
}
