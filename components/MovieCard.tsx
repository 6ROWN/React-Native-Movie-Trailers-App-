import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { MovieCardProps, MovieProps } from "../types";
import { baseImagePath } from "../services/api";
import {
	useNavigation,
	NavigationProp,
	ParamListBase,
} from "@react-navigation/native";

const MovieCard = ({ item, isHorizontal }: MovieCardProps) => {
	const navigation = useNavigation<NavigationProp<ParamListBase>>();

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate("movieDetails", { data: item })}
			className={`my-4 ${isHorizontal ? "mr-6" : "mr-0"}`}
		>
			<View className={`${isHorizontal ? "w-40 h-40" : "w-full h-48"}`}>
				<Image
					source={{
						uri: baseImagePath(
							item?.poster_path || item?.backdrop_path
						),
					}}
					resizeMode="cover"
					className={` w-full rounded-lg ${
						isHorizontal ? "h-36" : "h-40"
					} `}
				/>
				<Text
					className={`text-gray-200 py-2 font-semibold ${
						!isHorizontal
							? "text-center font-semibold text-xl"
							: "text-left"
					}`}
				>
					{item?.title
						? item.title.length > 14
							? item.title.slice(0, 20) + "..."
							: item.title
						: item?.original_name}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export default MovieCard;
