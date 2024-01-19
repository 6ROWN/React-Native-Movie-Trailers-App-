import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./navigation/AppStack";
import AuthStack from "./navigation/AuthStack";
import useAuth from "./hooks/useAuth";

export default function App() {
	const { user } = useAuth();
	return (
		<NavigationContainer>
			{user ? <AppStack /> : <AuthStack />}
		</NavigationContainer>
	);
}
