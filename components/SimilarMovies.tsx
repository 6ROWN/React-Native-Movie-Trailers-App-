import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { getSimilarMovies } from "../services/api";
import MovieCard from "./MovieCard";
import { MovieProps } from "../types";

const SimilarMovies = ({ movieId }: { movieId: number }) => {
	const [movies, setMovies] = useState<MovieProps[] | undefined>([]);

	useEffect(() => {
		const fetchSimilarMovies = async () => {
			const data = await getSimilarMovies(movieId);
			setMovies(data.results || []);
		};
		fetchSimilarMovies();
	}, [movieId]);

	if (!movies || movies.length < 1) {
		return null;
	}

	return (
		<View>
			<Text className="font-bold text-white mb-4 text-xl">
				Similar Movies
			</Text>
			<FlatList
				data={movies}
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

export default SimilarMovies;
