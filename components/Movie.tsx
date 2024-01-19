import { View, ScrollView, Text, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import requests from "../services/api";
import Carousel from "react-native-snap-carousel";
import TrendingMovies from "./TrendingMovies";
import { useWindowDimensions } from "react-native";
import MovieCategory from "./MovieCategory";
import * as Progress from "react-native-progress";

// const fetchData = async (url: string) => {
// 	try {
// 		const response = await fetch(url);
// 		return await response.json();
// 	} catch (error) {
// 		console.error("Error fetching data:", error);
// 		return null;
// 	}
// };

const Movie = ({
	onError,
}: {
	onError: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const { width } = useWindowDimensions();
	const [loading, setLoading] = useState(true);

	const fetchData = async (url: string) => {
		try {
			const response = await fetch(url);
			return await response.json();
		} catch (error) {
			console.error("Error fetching data:", error);
			onError(true);
		}
	};

	const [movieData, setMovieData] = useState({
		upcoming: [],
		trending: [],
		netflixOriginals: [],
		topRated: [],
		actionMovies: [],
		comedyMovies: [],
		horrorMovies: [],
		romanceMovies: [],
		documentaries: [],
	});

	useEffect(() => {
		const loadData = async () => {
			try {
				const [
					upcoming,
					trending,
					netflixOriginals,
					topRated,
					actionMovies,
					comedyMovies,
					horrorMovies,
					romanceMovies,
					documentaries,
				] = await Promise.all([
					fetchData(requests.fetchUpcoming),
					fetchData(requests.fetchTrending),
					fetchData(requests.fetchNetflixOriginals),
					fetchData(requests.fetchTopRated),
					fetchData(requests.fetchActionMovies),
					fetchData(requests.fetchComedyMovies),
					fetchData(requests.fetchHorrorMovies),
					fetchData(requests.fetchRomanceMovies),
					fetchData(requests.fetchDocumentaries),
				]);

				setMovieData({
					upcoming: upcoming?.results,
					trending: trending?.results,
					netflixOriginals: netflixOriginals?.results,
					topRated: topRated?.results,
					actionMovies: actionMovies?.results,
					comedyMovies: comedyMovies?.results,
					horrorMovies: horrorMovies?.results,
					romanceMovies: romanceMovies?.results,
					documentaries: documentaries?.results,
				});
				setLoading(false);
			} catch (e) {
				onError(true);
				setLoading(false);
			}
		};

		loadData();
	}, []);

	if (loading) {
		return (
			<View className="justify-center items-center h-4/5">
				<Progress.Circle
					size={40}
					indeterminate={true}
					color={"red"}
					borderWidth={2}
				/>
			</View>
		);
	}

	return (
		<ScrollView showsVerticalScrollIndicator={false} className="py-4">
			<View>
				<Carousel
					data={movieData.trending}
					renderItem={({ item }) => <TrendingMovies item={item} />}
					slideStyle={{ display: "flex", alignItems: "center" }}
					itemWidth={width * 0.8}
					sliderWidth={width}
					inactiveSlideOpacity={0.6}
					firstItem={2}
				/>
			</View>

			<View className="my-4">
				<MovieCategory title="Upcoming" data={movieData.upcoming} />
				<MovieCategory
					title="Popular"
					data={movieData.netflixOriginals}
				/>
				<MovieCategory title="Top Rated" data={movieData.topRated} />
				<MovieCategory title="Action" data={movieData.actionMovies} />
				<MovieCategory title="Comedy" data={movieData.comedyMovies} />
				<MovieCategory title="Horror" data={movieData.horrorMovies} />
				<MovieCategory title="Romance" data={movieData.romanceMovies} />
				<MovieCategory
					title="Documentaries"
					data={movieData.documentaries}
				/>
			</View>
		</ScrollView>
	);
};

export default Movie;
