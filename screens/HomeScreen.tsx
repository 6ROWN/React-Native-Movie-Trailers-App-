import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { StatusBar } from "react-native";
import SearchBar from "../components/SearchBar";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoryList from "../components/CategoryList";
import Movie from "../components/Movie";
import Loading from "../components/Loading";
import Error from "../components/Error";

const HomeScreen = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 3000);

		return () => clearTimeout(timer);
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return <Error />;
	}
	const handleError = () => {
		setError(true);
	};

	return (
		<SafeAreaView className="flex-1 bg-darkGray">
			<View className="px-4">
				<StatusBar barStyle={"light-content"} hidden={false} />
				<SearchBar />
				<CategoryList onSelectCategory={() => {}} activeCategory={28} />
				<Movie onError={handleError} />
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;
