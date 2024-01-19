import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { MegaphoneIcon, ArrowLeftIcon } from "react-native-heroicons/solid";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

const Download = ({ navigation }: { navigation: any }) => {
	return (
		<View className="flex-1 items-center justify-center bg-darkGray">
			<View className="absolute top-8 left-5">
				<TouchableOpacity
					className="p-2"
					onPress={() => navigation.goBack()}
				>
					<ArrowLeftIcon color={"white"} size={24} />
				</TouchableOpacity>
			</View>
			<MegaphoneIcon color={"#eab308"} size={42} />
			<Text className="text-white font-black mt-4 text-2xl">
				Coming Soon
			</Text>
		</View>
	);
};

export default Download;

const styles = StyleSheet.create({});
