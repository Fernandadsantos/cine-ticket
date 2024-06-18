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
  seats?: SeatsInterface;
}

export interface RoomSchedule {
  idMovie?: string;
  schedule?: string;
  seats?: SeatsInterface[];
}

export interface Room {
  idRoom?: string;
  id?: string;
  idMovie?: string;
  schedules?: RoomSchedule[];
}

export interface RoomState {
  rooms: Room[];
  loadingMovie: string;
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
}

export interface SeatsInterface {
  seat: number;
  line: string;
  status: string;
}

export interface SeatsState {
  seats: SeatsInterface[];
  loadingSeat: string;
}

export interface PosterSettings {
  poster_path: string;
  staticMode: boolean;
}

export interface RoomParams {
  seats: SeatsInterface[];
  movies: Movie[];
}
