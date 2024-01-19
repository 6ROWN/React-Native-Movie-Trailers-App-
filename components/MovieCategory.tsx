import { View, Text, FlatList } from "react-native";
import React from "react";
import { MovieProps } from "../types";
import MovieCard from "./MovieCard";

const MovieCategory = ({
	title,
	data,
}: {
	title: string;
	data: MovieProps[];
}) => {
	return (
		<View className="my-3 px-2">
			<View className="flex flex-row justify-between items-center">
				<Text className="text-white font-bold text-lg">{title}</Text>
				<Text className="text-brightRed">see more</Text>
			</View>
			<FlatList
				data={data}
				horizontal
				renderItem={({ item }) => (
					<MovieCard item={item} isHorizontal={true} />
				)}
				keyExtractor={(item) => item.id.toString()}
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

export default MovieCategory;
