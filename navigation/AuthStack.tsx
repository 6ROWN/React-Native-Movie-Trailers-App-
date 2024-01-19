import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Authentication/Login";
import SignUp from "../screens/Authentication/SignUp";
import ForgotPassword from "../screens/Authentication/ForgotPassword";
import Onboarding from "../screens/Onboarding";
import SplashScreen from "../screens/SplashScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="splash" component={SplashScreen} />
			<Stack.Screen name="onboarding" component={Onboarding} />
			<Stack.Screen name="login" component={Login} />
			<Stack.Screen name="register" component={SignUp} />
			<Stack.Screen name="forgotPassword" component={ForgotPassword} />
		</Stack.Navigator>
	);
};

export default AuthStack;
