import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { getRecommendedMovies } from "../services/api";
import { MovieProps } from "../types";
import MovieCard from "./MovieCard";

const RecommendedMovies = ({ movieId }: { movieId: number }) => {
	const [movies, setMovies] = useState<MovieProps[]>();

	useEffect(() => {
		const fetchRecommendedMovies = async () => {
			try {
				const data = await getRecommendedMovies(movieId);
				setMovies(data.results);
			} catch (error) {
				console.log("error");
			}
		};
		fetchRecommendedMovies();
	}, [movieId]);

	if (movies?.length && movies.length < 1) {
		// No movies, don't render anything
		return (
			<View>
				<Text className="text-white">No movies here</Text>
			</View>
		);
	}

	return (
		<View className="p-4">
			<Text className="text-xl text-white font-bold mt-4">
				Recommended Movies
			</Text>
			{movies ? (
				<FlatList
					data={movies}
					horizontal
					renderItem={({ item }) => (
						<MovieCard item={item} isHorizontal={true} />
					)}
					keyExtractor={(item) => item.id.toString()}
					showsHorizontalScrollIndicator={false}
				/>
			) : (
				<Text>Loading...</Text>
			)}
		</View>
	);
};

export default RecommendedMovies;
