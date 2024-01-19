import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
	baseImagePath,
	getActorDetails,
	getActorMovieByCastId,
} from "../services/api";
import { ActorProps, MovieProps } from "../types";
import { useWindowDimensions } from "react-native";
import MovieCard from "../components/MovieCard";
import { PhoneIcon, XMarkIcon } from "react-native-heroicons/solid";
import Loading from "../components/Loading";

const ActorScreen = ({
	route,
	navigation,
}: {
	route: {
		params: {
			castId: number;
		};
	};
	navigation: any;
}) => {
	const { castId } = route.params;
	const [actor, setActor] = useState<ActorProps>();
	const { width, height } = useWindowDimensions();
	const [showFullBiography, setShowFullBiography] = useState(false);
	const [movies, setMovies] = useState<MovieProps[] | undefined>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string>("");

	const toggleBiography = () => {
		setShowFullBiography(!showFullBiography);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				setIsLoading(true);
				const actorData = await getActorDetails(castId);

				// Check if actorData.status_code is present in the response

				if (actorData.status_code) {
					setError("User Not Found");
				}

				setActor(actorData);
				const movieData = await getActorMovieByCastId(castId);
				setMovies(movieData.cast);
			} catch (error) {
				setError("Error fetching");
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, [castId]);

	const renderBiographyText = () => {
		if (
			showFullBiography ||
			!actor?.biography ||
			actor.biography.length <= 100
		) {
			return actor?.biography;
		}
		return `${actor.biography.substring(0, 150)}...`;
	};

	if (error) {
		return (
			<View className="flex-1 bg-[#181818] py-20">
				<View className="flex-1">
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						className="absolute right-5 -top-16 bg-white rounded-full p-1"
					>
						<XMarkIcon color={"red"} size={20} />
					</TouchableOpacity>
					<View className="justify-center items-center flex-1">
						<Text className="text-white font-bold text-2xl">
							User Not Found
						</Text>
					</View>
				</View>
			</View>
		);
	}

	return (
		<ScrollView className="flex-1 bg-[#181818] py-20">
			{isLoading ? (
				<Loading />
			) : (
				<View>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						className="absolute right-5 -top-16 bg-white rounded-full p-1"
					>
						<XMarkIcon color={"red"} size={20} />
					</TouchableOpacity>
					<View className=" items-center  flex space-y-4 px-4">
						<View
							style={{
								width: width * 0.5,
								height: height * 0.3,
								shadowColor: "#303030",
								shadowOpacity: 1,
								shadowOffset: { width: 0, height: 5 },
								shadowRadius: 50,
							}}
							className="bg-[#303030] rounded-full border-4 p-2 border-[#303030]"
						>
							{actor?.profile_path ? (
								<Image
									source={{
										uri: baseImagePath(actor.profile_path),
									}}
									resizeMode="cover"
									className="w-full h-full rounded-full"
								/>
							) : (
								<PhoneIcon color={"gray"} size={42} />
							)}
						</View>
						<View>
							<Text className="font-bold text-2xl text-white">
								{actor?.name}
							</Text>
						</View>
						<View>
							<Text className="text-[#E0E0E0] text-lg">
								{actor?.place_of_birth} - (
								{actor?.birthday &&
									new Date().getFullYear() -
										new Date(actor.birthday).getFullYear()}
								years old)
							</Text>
						</View>
						<View>
							{actor?.biography && (
								<View>
									<Text className="font-semibold mb-2 text-xl text-[#E0E0E0]">
										BIOGRAPHY
									</Text>
									<Text className="text-[#A0A0A0] text-base text-justify">
										{renderBiographyText()}
									</Text>
									{actor.biography.length > 100 && (
										<TouchableOpacity
											onPress={toggleBiography}
										>
											<Text className="text-[#0D6EFD] mt-2">
												{showFullBiography
													? "Read less"
													: "Read more"}
											</Text>
										</TouchableOpacity>
									)}
									{(movies?.length ?? 0) > 0 && (
										<View className="py-6 mb-12">
											<Text className="font-bold text-xl text-[#E0E0E0]">
												FEATURED MOVIES
											</Text>
											<FlatList
												data={movies ?? []}
												horizontal
												renderItem={({ item }) => (
													<MovieCard
														item={item}
														isHorizontal={true}
													/>
												)}
												keyExtractor={(item) =>
													item.id.toString()
												}
												showsHorizontalScrollIndicator={
													false
												}
											/>
										</View>
									)}
								</View>
							)}
						</View>
					</View>
				</View>
			)}
		</ScrollView>
	);
};

export default ActorScreen;
