import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	Alert,
} from "react-native";
import React, { useState } from "react";
import {
	EyeSlashIcon,
	EyeIcon,
	ChevronLeftIcon,
} from "react-native-heroicons/solid";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { passwordRegExp } from "../../utils/passwordRegex";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../config/firebase";

const Login = ({ navigation }: any) => {
	const [isVisible, setIsVisible] = useState(false);

	const toggleVisibility = () => {
		setIsVisible(!isVisible);
	};

	const displayErrorAlert = () => {
		Alert.alert(
			"Authentication Error",
			"Google login failed. Use email and password to retry",
			[{ text: "OK", onPress: () => console.log("OK Pressed") }],
			{ cancelable: false }
		);
	};

	const schema = yup.object({
		email: yup
			.string()
			.email("Invalid email")
			.required("Email is required"),
		password: yup
			.string()
			.required("Password is required")
			.min(8, "Password must be at least 8 characters")
			.matches(
				passwordRegExp,
				"Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
			),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: any) => {
		// Handle login logic here

		try {
			await signInWithEmailAndPassword(auth, data.email, data.password);
			navigation.navigate("homescreen");
		} catch (error: any) {
			Alert.alert(" Error", error.message, [{ text: "OK" }], {
				cancelable: false,
			});
		}
	};

	return (
		<View className="flex-1 bg-darkGray">
			<TouchableOpacity
				onPress={() => navigation.goBack()}
				className="absolute top-10 left-2.5 z-10"
			>
				<ChevronLeftIcon color={"white"} />
			</TouchableOpacity>
			<View className="h-40 bg-red-300 justify-center items-center rounded-bl-[30px]">
				<Text className="font-black text-2xl text-white text-center">
					MOVIE<Text className="text-brightRed">SEAT</Text>{" "}
				</Text>
				<Text className="text-lg mt-2 text-lightGray font-medium tracking-widest ">
					Login to continue
				</Text>
			</View>
			<View className="px-4 flex-1 justify-center">
				<View className="flex flex-1 justify-evenly">
					<View className="flex space-y-6">
						<View>
							<TextInput
								className="bg-white h-12 rounded-md pl-4"
								placeholder="Email"
								placeholderTextColor={"#777"}
								keyboardType="email-address"
								onChangeText={(text) => setValue("email", text)}
								{...register("email")}
							/>
							{errors.email && (
								<Text className="text-red-500 mt-2">
									{errors.email.message}
								</Text>
							)}
						</View>
						<View>
							<TextInput
								className="bg-white h-12 rounded-md pl-4"
								placeholder="Password"
								placeholderTextColor={"#777"}
								secureTextEntry={isVisible ? true : false}
								onChangeText={(text) =>
									setValue("password", text)
								}
								{...register("password")}
							/>

							{errors.password && (
								<Text className="text-red-500 mt-2">
									{errors.password.message}
								</Text>
							)}
							<TouchableOpacity
								onPress={() =>
									navigation.navigate("forgotPassword")
								}
							>
								<Text className="text-blue-500 mt-3 text-right">
									Forgot Password?
								</Text>
							</TouchableOpacity>

							<TouchableOpacity
								onPress={toggleVisibility}
								className="absolute right-4 top-3"
							>
								{isVisible ? (
									<EyeIcon color={"gray"} />
								) : (
									<EyeSlashIcon color={"gray"} />
								)}
							</TouchableOpacity>
						</View>
						<TouchableOpacity
							onPress={handleSubmit(onSubmit)}
							className="bg-brightRed py-3 rounded-md"
						>
							<Text className="text-center text-xl text-white font-bold">
								Login
							</Text>
						</TouchableOpacity>
					</View>
					<View className="flex flex-row items-center">
						<View className="border-t border-gray-300 flex-grow"></View>
						<Text className="mx-4 text-white text-xl">OR</Text>
						<View className="border-t border-gray-300 flex-grow"></View>
					</View>
					<View>
						<TouchableOpacity
							onPress={() => displayErrorAlert()}
							className="bg-gray-200 py-4 rounded-md flex flex-row space-x-4 items-center justify-center"
						>
							<Image
								source={require("../../assets/google-icon.png")}
								resizeMode="contain"
								className="h-6 w-6"
							/>
							<Text className="text-center font-semibold text-lg text-lightGray">
								Continue with Google
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => navigation.navigate("register")}
							className="mt-8"
						>
							<Text className="text-gray-200 text-center text-base">
								Don't have an account. Sign Up
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
};

export default Login;
