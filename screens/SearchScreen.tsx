import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import {
	ChevronLeftIcon,
	HeartIcon,
	StarIcon,
} from "react-native-heroicons/solid";
import { MovieProps } from "../types";
import { baseImagePath } from "../services/api";
import GenreNames from "../components/GenreNames";
import Loading from "../components/Loading";

const SearchScreen = ({
	navigation,
	route,
}: {
	navigation: any;
	route: any;
}) => {
	const { results } = route.params || [];
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(false);
	}, [results]);

	if (isLoading) {
		return <Loading />;
	}

	const renderNoResults = () => (
		<View className="flex items-center justify-center h-5/6">
			<Text className="text-xl font-bold text-white">
				No results found
			</Text>
		</View>
	);

	const renderSearchData = ({ item }: { item: MovieProps }) => (
		<TouchableOpacity
			onPress={() => navigation.navigate("movieDetails", { data: item })}
			className="mb-6 bg-lightGray rounded-lg flex flex-row"
		>
			<View className="h-40 w-36">
				<Image
					source={{ uri: baseImagePath(item?.poster_path) }}
					resizeMode="cover"
					className="w-full h-full rounded-lg"
				/>
			</View>
			<View className="p-4 flex-1 space-y-3">
				<View className="flex flex-row  items-center justify-between">
					<Text className="font-bold text-lg text-white">
						{item?.title}
					</Text>
					<HeartIcon color={"red"} size={18} />
				</View>
				<View className="flex flex-row items-center justify-between">
					<GenreNames
						genreIds={item?.genre_ids}
						textColor="text-white"
					/>
					<View className="bg-darkGray h-1 w-1 rounded-full"></View>
					<Text className="text-white">
						{new Date(item?.release_date).getFullYear()}
					</Text>
					<View className="bg-darkGray h-1 w-1 rounded-full"></View>
					<View className="flex flex-row space-x-1 items-center">
						<StarIcon color={"yellow"} size={18} />
						<Text className="text-white">
							{item?.vote_average.toFixed(1)}
						</Text>
					</View>
				</View>
				<View>
					<Text className="text-gray-300 text-base">
						{item?.overview && item?.overview.slice(0, 80)} ...
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<View className="flex-1 bg-darkGray py-8 px-4">
			<View className="flex flex-row items-center space-x-12">
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<ChevronLeftIcon color={"white"} />
				</TouchableOpacity>
				<View className="flex-1">
					<SearchBar />
				</View>
			</View>
			<View className="pt-4">
				{results?.length > 0 ? (
					<FlatList data={results} renderItem={renderSearchData} />
				) : (
					renderNoResults()
				)}
			</View>
		</View>
	);
};

export default SearchScreen;
