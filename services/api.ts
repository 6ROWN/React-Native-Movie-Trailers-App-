const apiKey = "5e89e874fc271db15c4f4604c8f05594";
const baseUrl = "https://api.themoviedb.org/3";

const createUrl = (endpoint: string, queryParams?: string): string => {
	const fullUrl = queryParams
		? `${baseUrl}/${endpoint}?api_key=${apiKey}&${queryParams}`
		: `${baseUrl}/${endpoint}?api_key=${apiKey}`;
	return fullUrl;
};

const fetchFromApi = async (url: string): Promise<any> => {
	try {
		const response = await fetch(url);
		const data = await response.json();
		return data;
	} catch (error) {
		console.error(`Error fetching data from ${url}:`, error);
		return [];
	}
};

export const baseImagePath = (path: string): string =>
	`https://image.tmdb.org/t/p/w500${path}`;

const requests = {
	fetchUpcoming: createUrl("movie/upcoming", "language=en-US"),
	fetchTrending: createUrl("trending/all/week", "language=en-US"),
	fetchNetflixOriginals: createUrl("discover/movie", "with_networks=213"),
	fetchTopRated: createUrl("movie/top_rated", "language=en-US"),
	fetchActionMovies: createUrl(
		"discover/movie",
		"with_genres=28&language=en-US"
	),
	fetchComedyMovies: createUrl(
		"discover/movie",
		"with_genres=35&language=en-US"
	),
	fetchHorrorMovies: createUrl(
		"discover/movie",
		"with_genres=27&language=en-US"
	),
	fetchRomanceMovies: createUrl(
		"discover/movie",
		"with_genres=10749&language=en-US"
	),
	fetchDocumentaries: createUrl(
		"discover/movie",
		"with_genres=99&language=en-US"
	),
};

export default requests;

export const getMovieCasts = async (movieId: number) => {
	const url = createUrl(`movie/${movieId}/credits`);
	return fetchFromApi(url).then((data) => data.cast);
};

export const getGenres = async () => {
	const url = createUrl("genre/movie/list", "language=en_US");
	return fetchFromApi(url);
};

export const getsearchedMovie = async (movieTitle: string) => {
	const url = createUrl(`search/movie`, `query=${movieTitle}`);
	return fetchFromApi(url);
};

export const getMovieTrailer = async (movieId: number) => {
	const url = createUrl(`movie/${movieId}/videos`);
	return fetchFromApi(url);
};

export const getActorDetails = async (id: number) => {
	const url = createUrl(`person/${id}`);
	return fetchFromApi(url);
};

export const getActorMovieByCastId = async (id: number) => {
	const url = createUrl(`person/${id}/movie_credits`);
	return fetchFromApi(url);
};

export const getSimilarMovies = async (id: number) => {
	const url = createUrl(`movie/${id}/similar`);
	return fetchFromApi(url);
};

export const getRecommendedMovies = async (id: number) => {
	const url = createUrl(`movie/${id}/recommendations`);
	return fetchFromApi(url);
};

export const getTvSeries = async () => {
	const nowPlaying = createUrl("movie/now_playing");
	const airingTodayUrl = createUrl("tv/popular");
	const onAir = createUrl("tv/on_the_air");
	const popular = createUrl("tv/popular");
	const topRated = createUrl("tv/top_rated");

	const [
		nowPlayingData,
		airingTodayData,
		onAirData,
		popularData,
		topRatedData,
	] = await Promise.all([
		fetchFromApi(nowPlaying),
		fetchFromApi(airingTodayUrl),
		fetchFromApi(onAir),
		fetchFromApi(popular),
		fetchFromApi(topRated),
	]);

	return {
		nowPlaying: nowPlayingData,
		airingToday: airingTodayData,
		onAir: onAirData,
		popular: popularData,
		topRated: topRatedData,
	};
};

export const fetchMoviesByGenre = async (genreId: number) => {
	const url = createUrl("discover/movie", `with_genres=${genreId}`);
	return fetchFromApi(url);
};
