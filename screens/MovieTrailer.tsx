import { View, Text, StatusBar, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getMovieTrailer, getRecommendedMovies } from "../services/api";
import { WebView } from "react-native-webview";
import { ChevronLeftIcon, XMarkIcon } from "react-native-heroicons/solid";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { MovieProps } from "../types";
import RecommendedMovies from "../components/RecommendedMovies";

const MovieTrailer = ({
	route,
	navigation,
}: {
	route: {
		params: {
			movieId: number;
		};
	};
	navigation: any;
}) => {
	const { movieId } = route.params;
	const [trailerKey, setTrailerKey] = useState<string | null>(null);
	const [error, setError] = useState<string>("");

	useEffect(() => {
		//FETCHING TRAILER
		const fetchTrailer = async () => {
			try {
				const trailerData = await getMovieTrailer(movieId);
				const youtubeTrailer = trailerData.results.find(
					(video: any) =>
						video.type === "Trailer" && video.site === "YouTube"
				);
				if (youtubeTrailer) {
					setTrailerKey(youtubeTrailer.key);
				}
			} catch (err) {
				setError("Failed to fetch trailer");
			}
		};

		fetchTrailer();
	}, [movieId]);

	if (error) {
		return <Error />;
	}

	return (
		<View className="flex-1 py-10 bg-darkGray">
			<StatusBar barStyle={"light-content"} />

			{trailerKey ? (
				<View className="flex-1">
					<View className="flex flex-row px-4 mb-6 items-center justify-between">
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							className="bg-lightGray rounded-xl p-1"
						>
							<ChevronLeftIcon color={"white"} />
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => navigation.goBack()}
							className="bg-brightRed rounded-xl p-1"
						>
							<XMarkIcon color={"white"} />
						</TouchableOpacity>
					</View>

					<WebView
						className="w-full h-full"
						source={{
							uri: `https://www.youtube.com/embed/${trailerKey}`,
						}}
					/>
					<View className="flex-1">
						<RecommendedMovies movieId={movieId} />
					</View>
				</View>
			) : (
				<Loading />
			)}
		</View>
	);
};

export default MovieTrailer;
