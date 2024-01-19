import { NavigationProp } from "@react-navigation/native";

// Define the type for the navigation stack
export type RootStackParamList = {
	splash: undefined;
	onboarding: undefined;
	homescreen: undefined;
	movieDetails: { data: any };
	searchScreen: undefined;
	movieTrailer: { movieId: number };
	actor: { castId: number };
	profileScreen: undefined;
	downloadScreen: undefined;
	tvSeriesScreen: undefined;
	genreScreen: { genreId: number };
	login: undefined;
	register: undefined;
	forgotPassword: undefined;
};

//Define the type for navigation props to be used in components.
export type navProps = {
	navigation: NavigationProp<RootStackParamList>;
};

export type movieGenresProps = {
	id: number;
	name: string;
};

export type genreIdProps = {
	genre_ids: number[];
};

export type MovieProps = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	media_type: string;
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
	//TV Props
	origin_country?: string[];
	first_air_date?: string;
	original_name?: string;
	name?: string;
};

export type MovieCardProps = {
	item: MovieProps;
	isHorizontal?: boolean;
};

export type CastMember = {
	adult: boolean;
	cast_id: number;
	character: string;
	credit_id: string;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	order: number;
	original_name: string;
	popularity: number;
	profile_path: string;
};

export type ActorProps = {
	adult: boolean;
	also_known_as: string[];
	biography: string;
	birthday: string;
	deathday: string | null;
	gender: number;
	homepage: string | null;
	id: number;
	imdb_id: string;
	known_for_department: string;
	name: string;
	place_of_birth: string;
	popularity: number;
	profile_path: string | null;
};
