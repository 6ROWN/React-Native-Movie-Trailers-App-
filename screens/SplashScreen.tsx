import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";

const SplashScreen = ({ navigation }: { navigation: any }) => {
	useEffect(() => {
		const splashTimeout = setTimeout(() => {
			navigation.replace("onboarding");
		}, 3000);
		return () => clearTimeout(splashTimeout);
	}, []);

	return (
		<View className="flex-1 ">
			<Image
				source={require("../assets/splash.jpg")}
				resizeMode="cover"
				className="absolute w-screen h-screen"
			/>
			<View className="absolute w-full h-full bg-black opacity-90" />
			<View className="flex-1 justify-center items-center py-20">
				<Animatable.Text
					animation="zoomInUp"
					duration={3000}
					className="text-white font-bold text-4xl"
				>
					MOVIE <Text className="text-brightRed">SEAT</Text>
				</Animatable.Text>
			</View>
		</View>
	);
};

export default SplashScreen;
