import { Image, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { navProps } from "../types";
import * as Animatable from "react-native-animatable";
import useAuth from "../hooks/useAuth";

const Onboarding: React.FC<navProps> = ({ navigation }) => {
	const { user } = useAuth();
	return (
		<View className="flex-1">
			<StatusBar hidden />
			<Image
				source={require("../assets/cinema.jpg")}
				resizeMode="cover"
				className="absolute w-full h-full"
			/>
			<View className="absolute w-full h-full bg-black opacity-40" />
			<View className="flex-1 justify-center items-center py-20">
				<View className="flex-1 justify-center space-y-8">
					<Animatable.Text
						animation="zoomInUp"
						className="text-white text-center font-bold text-3xl"
					>
						Welcome to Screen Seat!
					</Animatable.Text>
					<Animatable.Text
						animation="zoomInUp"
						className="text-gray-200 font-medium text-center text-lg"
					>
						Your Gateway to the Latest Movie Trailers
					</Animatable.Text>
				</View>

				<TouchableOpacity
					onPress={() =>
						user
							? navigation.navigate("homescreen")
							: navigation.navigate("login")
					}
					className="self-center bg-brightRed w-10/12 p-4 rounded-md shadow-md"
				>
					<Animatable.Text
						animation={"slideInUp"}
						duration={2000}
						className="text-white text-center font-black text-lg"
					>
						GET STARTED
					</Animatable.Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Onboarding;
