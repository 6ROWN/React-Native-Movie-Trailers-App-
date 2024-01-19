import {
	View,
	StatusBar,
	ImageBackground,
	TouchableOpacity,
	Text,
	ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { baseImagePath } from "../services/api";
import {
	ArrowLeftIcon,
	PlayIcon,
	StarIcon,
} from "react-native-heroicons/solid";
import {
	ArrowDownTrayIcon,
	BookmarkIcon,
	HeartIcon,
} from "react-native-heroicons/outline";
import { getMovieCasts } from "../services/api";
import Cast from "../components/Cast";
import { CastMember } from "../types";
import GenreNames from "../components/GenreNames";
import SimilarMovies from "../components/SimilarMovies";
import Loading from "../components/Loading";
import Error from "../components/Error";

const MovieDetails = ({
	route,
	navigation,
}: {
	route: any;
	navigation: any;
}) => {
	const { data } = route.params;

	const [showFullOverview, setShowFullOverview] = useState(false);
	const [casts, setCasts] = useState<CastMember[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState<string>("");

	const toggleOverview = () => {
		setShowFullOverview(!showFullOverview);
	};

	useEffect(() => {
		//Fetch Cast
		const fetchCasts = async () => {
			setIsLoading(true);
			try {
				const casts = await getMovieCasts(data.id);
				setCasts(casts);
			} catch (error) {
				setIsError("Failed to fetch movie details");
			} finally {
				setIsLoading(false);
			}
		};
		fetchCasts();
	}, [data.id]);

	if (isLoading) {
		return <Loading />;
	}

	if (isError) {
		return <Error />;
	}

	return (
		<ScrollView className="flex-1 bg-darkGray pb-20 h-full">
			<StatusBar barStyle={"dark-content"} />

			<View className="w-full h-80 flex-1">
				<ImageBackground
					source={{
						uri: baseImagePath(
							data?.poster_path || data?.backdrop_path
						),
					}}
					resizeMode="cover"
					className="w-full h-full rounded-lg"
				>
					<View className="flex flex-row justify-between px-4 py-8 items-center">
						<TouchableOpacity
							style={{
								shadowColor: "white",
								shadowOpacity: 20,
								shadowRadius: 30,
								shadowOffset: { width: 1, height: 4 },
								backgroundColor: "rgba(255, 255, 255, 0.7)",
							}}
							className="
							 rounded-full  p-2"
							onPress={() => navigation.goBack()}
						>
							<ArrowLeftIcon color={"black"} size={20} />
						</TouchableOpacity>
						<View className="flex flex-row space-x-2">
							<TouchableOpacity className="p-2 rounded-full bg-lightGray">
								<BookmarkIcon color={"white"} size={18} />
							</TouchableOpacity>
							<TouchableOpacity className="p-2 rounded-full bg-lightGray">
								<HeartIcon color={"white"} size={18} />
							</TouchableOpacity>
						</View>
					</View>
				</ImageBackground>
			</View>
			<View className="px-4 py-4 flex space-y-6">
				<Text className="text-white text-center font-bold text-2xl">
					{data?.title || data?.original_name}
				</Text>
				<View className="flex flex-row items-center justify-between">
					<View className="flex flex-row items-center space-x-2">
						<StarIcon color={"red"} size={18} />
						<Text className="font-bold text-base text-brightRed">
							{data?.vote_average.toFixed(1)}
						</Text>
					</View>
					<View>
						<GenreNames
							genreIds={data.genre_ids}
							textColor="text-gray-400"
						/>
					</View>
				</View>
				<View className="">
					{data?.overview &&
						(data.overview.length > 100 && !showFullOverview ? (
							<View>
								<Text className="text-lightGray text-base">
									{`${data.overview.substring(0, 100)}... `}
								</Text>
								<Text
									onPress={toggleOverview}
									className="text-blue-500"
								>
									More
								</Text>
							</View>
						) : (
							<View>
								<Text className=" text-lightGray text-base">
									{data.overview}
								</Text>
								<Text
									onPress={toggleOverview}
									className="text-blue-500"
								>
									Less
								</Text>
							</View>
						))}
				</View>
				<View className="flex flex-row space-x-4">
					<TouchableOpacity
						onPress={() => navigation.navigate("Download")}
						className="flex-1 flex  flex-row  items-center space-x-4 p-2 border border-white rounded-lg justify-center"
					>
						<ArrowDownTrayIcon color={"white"} />
						<Text className="text-white font-bold">Download</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("movieTrailer", {
								movieId: data.id,
							})
						}
						className="flex-1 flex  flex-row  items-center space-x-4 p-2 bg-brightRed rounded-lg justify-center"
					>
						<PlayIcon color={"white"} />
						<Text className="text-white font-bold">Play</Text>
					</TouchableOpacity>
				</View>
				<View>
					<Cast data={casts} />
				</View>
				<View>
					<SimilarMovies movieId={data.id} />
				</View>
			</View>
		</ScrollView>
	);
};

export default MovieDetails;
