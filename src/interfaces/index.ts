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

export interface Room{
    idRoom?: string;
    seats?: [];
    time?: string;
}

export interface MovieState {
    movies: [];
    loadingMovie: string; 
    id?: string; 
    title?: string; 
    overview?: string;
    poster_path?: string;
}

export interface SessionDetails{
    day: string;
    currentDate: string; 
    selectedTime?: string;  
    timeSessionOne: string;
    timeSessionTwo: string;
    movieTitle?: string;
}

export interface Session{
    idRoom?: string;
    idMovie?: string;
    title?: string;
    time?: string;
    day?: string;
    date?: Date;
}
 
export interface MovieDetails{
    idMovie?: string;
    title: string;
    poster: string;
    overview: string;
}

export interface Schedules {
    time?: number;
    id?: string;
    avaliable?: boolean;
}