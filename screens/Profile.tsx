import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
	ArrowLeftStartOnRectangleIcon,
	BellAlertIcon,
	ChevronRightIcon,
	Cog6ToothIcon,
	CreditCardIcon,
	LockClosedIcon,
	UserIcon,
} from "react-native-heroicons/solid";
import useAuth from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";

const profileItem = [
	{
		name: "My Account",
		icon: UserIcon,
	},
	{
		name: "Notification",
		icon: BellAlertIcon,
	},
	{
		name: "Subscription",
		icon: CreditCardIcon,
	},
	{
		name: "Security & Privacy",
		icon: LockClosedIcon,
	},
	{
		name: "Settings",
		icon: Cog6ToothIcon,
	},
	{
		name: "Log Out",
		icon: ArrowLeftStartOnRectangleIcon,
		onPress: () => signOut(auth),
	},
];

const Profile = () => {
	const { user } = useAuth();

	return (
		<View className="flex-1 bg-darkGray">
			<View className="bg-brightRed justify-center items-center py-10 rounded-bl-[40px]">
				<View className="rounded-full p-4 border border-white">
					<UserIcon color={"white"} size={40} />
				</View>
				<Text className="text-white mt-4 font-bold text-lg">
					{user ? user.email : "Username"}
				</Text>
			</View>
			<View className="px-8 py-10">
				{profileItem.map((item, index) => (
					<TouchableOpacity
						onPress={item.onPress}
						key={index}
						className="flex flex-row justify-between items-center mb-4 bg-lightGray p-4 rounded-md"
					>
						<View className="flex flex-row items-center space-x-4">
							<item.icon color={"white"} size={18} />
							<Text className="text-white text-lg font-semibold">
								{item.name}
							</Text>
						</View>
						<View>
							<ChevronRightIcon color={"white"} />
						</View>
					</TouchableOpacity>
				))}
			</View>
		</View>
	);
};

export default Profile;
