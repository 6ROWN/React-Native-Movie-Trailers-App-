import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { fetchMoviesByGenre } from "../services/api";
import MovieCard from "../components/MovieCard";
import CategoryList from "../components/CategoryList";
import Loading from "../components/Loading";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import Error from "../components/Error";

const GenreScreen = ({
	route,
	navigation,
}: {
	navigation: any;
	route: { params: { genreId: number } };
}) => {
	const [movies, setMovies] = useState();
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<boolean>(false);
	const [activeCategory, setActiveCategory] = useState<number | undefined>(
		undefined
	);
	const { genreId } = route.params || [];

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const data = await fetchMoviesByGenre(genreId);
				setMovies(data.results);
			} catch (error) {
				setError(true);
			} finally {
				setIsLoading(false);
			}
		};
		fetchData();
	}, [genreId]);

	const handleCategorySelect = (category: number) => {
		setActiveCategory(category);
	};

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return <Error />;
	}

	return (
		<View className="flex-1 bg-darkGray py-10 px-4">
			<View className="flex flex-row items-center mb-2">
				<TouchableOpacity
					onPress={() => navigation.goBack()}
					className="py-2 mr-4"
				>
					<ChevronLeftIcon color={"white"} />
				</TouchableOpacity>
				<CategoryList
					onSelectCategory={handleCategorySelect}
					activeCategory={activeCategory}
				/>
			</View>

			<View className="flex-1">
				<FlatList
					data={movies}
					renderItem={({ item }) => (
						<MovieCard item={item} isHorizontal={false} />
					)}
					keyExtractor={(item) => item.id.toString()}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</View>
	);
};

export default GenreScreen;
