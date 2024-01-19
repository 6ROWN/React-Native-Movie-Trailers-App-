import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
	useNavigation,
	NavigationProp,
	ParamListBase,
} from "@react-navigation/native";

export default function Error() {
	const navigation = useNavigation<NavigationProp<ParamListBase>>();

	return (
		<View className="flex justify-center items-center flex-1">
			<Image
				source={require("../assets/errorImage.jpg")}
				resizeMode="cover"
				className="absolute w-full h-full"
			/>
			<View className="absolute flex-1 bg-black opacity-60 w-full h-full"></View>
			<View className="flex-1 justify-between py-24 items-center px-8 w-full">
				<View className="items-center flex space-y-8">
					<Text className="text-gray-300 font-bold text-2xl">
						Connection Error
					</Text>
					<Text className="text-gray-400 text-center leading-7 text-lg">
						It seems like you have been disconnected from the rest
						of the world. Please check your internet connection and
						try again
					</Text>
					<Text className="font-black text-gray-400 text-xl">
						Nobody wants to be alone
					</Text>
				</View>

				<TouchableOpacity
					onPress={() => navigation.goBack()}
					className=" bg-brightRed w-2/3 p-4 rounded-lg shadow-md"
				>
					<Text className="text-white text-center font-black text-lg">
						RETRY
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
