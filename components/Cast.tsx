import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import React from "react";
import { CastMember } from "../types";
import { baseImagePath } from "../services/api";
import { PhotoIcon } from "react-native-heroicons/solid";
import {
	useNavigation,
	ParamListBase,
	NavigationProp,
} from "@react-navigation/native";

const Cast = ({ data }: { data: CastMember[] }) => {
	const navigation = useNavigation<NavigationProp<ParamListBase>>();

	const renderCast = ({ item }: { item: CastMember }) => (
		<TouchableOpacity
			onPress={() =>
				navigation.navigate("actor", { castId: item?.cast_id })
			}
			className=" mr-6"
		>
			<View className="w-20 h-20 mb-3 items-center justify-center">
				{item?.profile_path ? (
					<Image
						source={{ uri: baseImagePath(item?.profile_path) }}
						resizeMode="cover"
						className="w-full h-full rounded-full"
					/>
				) : (
					<PhotoIcon size={40} color={"gray"} />
				)}
			</View>
			<Text className="text-gray-300 font-semibold">
				{item?.original_name.length > 10
					? item?.original_name.slice(0, 10) + " ..."
					: item?.original_name}
			</Text>
		</TouchableOpacity>
	);

	return (
		<View>
			{data && (
				<Text className="font-bold text-white mb-4 text-xl">
					Top Casts
				</Text>
			)}

			<FlatList
				data={data}
				renderItem={renderCast}
				keyExtractor={(item) => item.id.toString()}
				horizontal
				showsHorizontalScrollIndicator={false}
			/>
		</View>
	);
};

export default Cast;
