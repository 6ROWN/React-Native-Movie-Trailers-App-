import { View, Text } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

const Loading = () => {
	return (
		<View className="flex flex-1 justify-center items-center h-screen z-10">
			<Progress.Circle
				size={40}
				indeterminate={true}
				color={"red"}
				borderWidth={2}
			/>
		</View>
	);
};

export default Loading;
