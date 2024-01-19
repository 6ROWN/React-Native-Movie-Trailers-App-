import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase";

const ForgotPassword = ({ navigation }: any) => {
	const [showSuccessAlert, setShowSuccessAlert] = useState(false);

	useEffect(() => {
		if (showSuccessAlert) {
			const timer = setTimeout(() => {
				setShowSuccessAlert(false);
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [showSuccessAlert]);

	const schema = yup.object({
		email: yup
			.string()
			.email("Invalid email")
			.required("Email is required"),
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
		},
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data: any) => {
		if (data.email && data.email !== "") {
			try {
				await sendPasswordResetEmail(auth, data.email);
				setShowSuccessAlert(true);
				reset(); // Clear the form after successful submission
			} catch (error: any) {
				console.error(
					"Error sending password reset email:",
					error.message
				);
				// Handle error gracefully, e.g., display an error message to the user
				Alert.alert("Error", "Failed to send password reset email");
			}
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
			<View className="flex-1 px-4 bg-red-300 justify-center items-center rounded-br-[35px]">
				<Text className="text-2xl font-semibold">Forgot Password</Text>
				<Text className="text-lg mt-4 text-lightGray font-medium text-center">
					Enter your email, follow the link in your inbox, and reset
					your password.
				</Text>
				<Image
					source={require("../../assets/forgot-password-img.png")}
					resizeMode="center"
					className="w-full h-2/4"
				/>
			</View>
			<View className="px-6 flex-1 justify-center">
				{showSuccessAlert ? (
					<View>
						<Text className="text-white text-center text-lg">
							An email with a reset password link has been sent to
							your inbox.
						</Text>
					</View>
				) : (
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

						<TouchableOpacity
							onPress={handleSubmit(onSubmit)}
							className="bg-brightRed py-3 rounded-md"
						>
							<Text className="text-center text-xl text-white font-bold">
								Continue
							</Text>
						</TouchableOpacity>
					</View>
				)}
			</View>
		</View>
	);
};

export default ForgotPassword;
