import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "../screens/Onboarding";
import HomeScreen from "../screens/HomeScreen";
import { RootStackParamList } from "../types";
import MovieDetails from "../screens/MovieDetails";
import SearchScreen from "../screens/SearchScreen";
import MovieTrailer from "../screens/MovieTrailer";
import ActorScreen from "../screens/ActorScreen";
import BottomTabsNavigator from "./BottomTabsNavigator";
import GenreScreen from "../screens/GenreScreen";
import SplashScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			{/* <Stack.Screen name="splash" component={SplashScreen} /> */}
			<Stack.Screen name="onboarding" component={Onboarding} />
			<Stack.Screen name="homescreen" component={BottomTabsNavigator} />
			<Stack.Screen name="movieDetails" component={MovieDetails} />
			<Stack.Screen name="searchScreen" component={SearchScreen} />
			<Stack.Screen name="movieTrailer" component={MovieTrailer} />
			<Stack.Screen
				name="actor"
				options={{ presentation: "modal" }}
				component={ActorScreen}
			/>
			<Stack.Screen name="genreScreen" component={GenreScreen} />
		</Stack.Navigator>
	);
};

export default AppStack;
