import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

const useAuth = () => {
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const unsubscribeFromAuthStateChanged = onAuthStateChanged(
			auth,
			(user) => {
				if (user) {
					setUser(user);
				} else {
					setUser(null);
				}
			}
		);

		return unsubscribeFromAuthStateChanged;
	}, []);

	return { user };
};

export default useAuth;
