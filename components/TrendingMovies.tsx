import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { MovieProps } from "../types";
import { baseImagePath } from "../services/api";
import { useWindowDimensions } from "react-native";
import { BookmarkIcon, StarIcon } from "react-native-heroicons/solid";
import {
	useNavigation,
	NavigationProp,
	ParamListBase,
} from "@react-navigation/native";

const TrendingMovies = ({ item }: { item: MovieProps }) => {
	const { height, width } = useWindowDimensions();
	const navigation = useNavigation<NavigationProp<ParamListBase>>();

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("movieDetails", { data: item })}
		>
			<Image
				source={{ uri: baseImagePath(item?.poster_path) }}
				resizeMode="cover"
				className="rounded-lg"
				style={{ height: height * 0.35, width: width * 0.8 }}
			/>
			<View className="absolute bottom-0 p-4">
				<Text className="text-white font-bold text-lg">
					{item?.title || item?.original_title}
				</Text>
				<View className="mt-2 flex flex-row space-x-4">
					<Text className="text-gray-300">
						{item?.release_date &&
							new Date(item?.release_date).getFullYear()}
					</Text>
					<Text className="text-gray-300">
						{item?.adult ? "17+" : ""}
					</Text>
				</View>
			</View>
			<TouchableOpacity className="absolute right-0 bg-lightGray rounded-full p-2 m-2">
				<BookmarkIcon size={18} color={"red"} />
			</TouchableOpacity>
			<View className="absolute right-2 bottom-2 p-2">
				<View className="flex flex-row items-center space-x-2">
					<StarIcon size={18} color={"red"} />
					<Text className="text-brightRed font-black text-xl">
						{item?.vote_average.toFixed(1)}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default TrendingMovies;
