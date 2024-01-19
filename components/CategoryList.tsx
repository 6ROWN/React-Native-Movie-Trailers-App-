import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { movieGenres } from "../utils/constants";
import { movieGenresProps } from "../types";
import {
	useNavigation,
	NavigationProp,
	ParamListBase,
} from "@react-navigation/native";

const CategoryList = ({
	onSelectCategory,
	activeCategory,
}: {
	onSelectCategory: (category: number) => void;
	activeCategory?: number | undefined;
}) => {
	const [isActive, setIsActive] = useState<number>(
		activeCategory || movieGenres[0]?.id
	);
	const navigation = useNavigation<NavigationProp<ParamListBase>>();

	useEffect(() => {
		// Update isActive when activeCategory prop changes
		setIsActive(activeCategory || movieGenres[0]?.id);
	}, [activeCategory]);

	const renderCategoryItem = ({ item }: { item: movieGenresProps }) => (
		<TouchableOpacity
			onPress={() => {
				setIsActive(item.id);
				onSelectCategory(item.id);
				navigation.navigate("genreScreen", { genreId: item.id });
			}}
			className={`mr-3 p-2  rounded-md ${
				isActive === item.id ? "bg-brightRed " : "bg-[#555555]"
			}`}
		>
			<Text
				className={`text-white text-base ${
					isActive === item.id ? "font-bold" : ""
				}`}
			>
				{item.name}
			</Text>
		</TouchableOpacity>
	);

	return (
		<View>
			<FlatList
				data={movieGenres}
				renderItem={renderCategoryItem}
				keyExtractor={(item) => item.id.toString()}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

export default CategoryList;
