import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import {
	ArrowDownTrayIcon,
	HomeIcon,
	MagnifyingGlassIcon,
	UserIcon,
	TvIcon,
} from "react-native-heroicons/solid";
import SearchScreen from "../screens/SearchScreen";
import Profile from "../screens/Profile";
import Download from "../screens/Download";
import TvSeries from "../screens/TvSeries";
import { Route } from "@react-navigation/native";

const Tabs = createBottomTabNavigator();

const BottomTabsNavigator = () => {
	const menuIcons = (route: Route<string>, focused: boolean) => {
		let icon;

		switch (route.name) {
			case "Home":
				icon = <HomeIcon color={focused ? "red" : "gray"} />;
				break;
			case "Search":
				icon = <MagnifyingGlassIcon color={focused ? "red" : "gray"} />;
				break;
			case "TvSeries":
				icon = <TvIcon color={focused ? "red" : "gray"} />;
				break;
			case "Download":
				icon = <ArrowDownTrayIcon color={focused ? "red" : "gray"} />;
				break;
			case "Profile":
				icon = <UserIcon color={focused ? "red" : "gray"} />;
				break;

			default:
				icon = null;
				break;
		}

		return icon;
	};

	return (
		<Tabs.Navigator
			screenOptions={({ route }) => ({
				tabBarShowLabel: false,
				headerShown: false,
				tabBarIcon: ({ focused }) => menuIcons(route, focused),
			})}
		>
			<Tabs.Screen name="Home" component={HomeScreen} />
			<Tabs.Screen name="Search" component={SearchScreen} />
			<Tabs.Screen name="TvSeries" component={TvSeries} />
			<Tabs.Screen name="Download" component={Download} />
			<Tabs.Screen name="Profile" component={Profile} />
		</Tabs.Navigator>
	);
};

export default BottomTabsNavigator;
