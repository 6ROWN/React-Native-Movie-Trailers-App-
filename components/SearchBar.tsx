import { Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import {
	MagnifyingGlassIcon,
	AdjustmentsHorizontalIcon,
} from "react-native-heroicons/outline";
import {
	useNavigation,
	ParamListBase,
	NavigationProp,
} from "@react-navigation/native";
import { getsearchedMovie } from "../services/api";

const SearchBar = () => {
	const [query, setQuery] = useState("");
	const navigation = useNavigation<NavigationProp<ParamListBase>>();
	const [isLoading, setIsLoading] = useState(false);

	const handleSearch = async () => {
		if (query !== "" && query.length > 2) {
			try {
				const searchData = await getsearchedMovie(query);
				navigation.navigate("searchScreen", {
					results: searchData.results,
				});
			} catch (error) {
				console.error("Error fetching search results:", error);
			}
		}
	};

	return (
		<View className="my-4 flex flex-row items-center space-x-4">
			<View className="relative flex-1">
				<View className="absolute left-2 inset-y-0 z-10 flex justify-center">
					<MagnifyingGlassIcon size={24} color={"gray"} />
				</View>

				<TextInput
					className="bg-white rounded-md pl-12 py-3 pr-3"
					placeholder="Search..."
					value={query}
					onChangeText={setQuery}
					clearButtonMode="always"
					onSubmitEditing={handleSearch}
				/>
			</View>
			<View>
				<AdjustmentsHorizontalIcon size={24} color={"#fefefe"} />
			</View>
		</View>
	);
};

export default SearchBar;
