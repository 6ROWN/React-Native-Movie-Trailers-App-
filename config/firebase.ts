import { initializeApp } from "firebase/app";
import {
	getAuth,
	initializeAuth,
	getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBJ9d3wKRcVl1t84G_0WaTrR4eL7jKcLyA",
	authDomain: "movie-seat-b5e9a.firebaseapp.com",
	projectId: "movie-seat-b5e9a",
	storageBucket: "movie-seat-b5e9a.appspot.com",
	messagingSenderId: "218953344904",
	appId: "1:218953344904:web:30409781534f54f33b7c3d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAuth(app, {
	persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const auth = getAuth();

//IOS: 90390821046-qouarprmu1rdc8me39n11dvhf2nese3g.apps.googleusercontent.com
//Android: 90390821046-5g9odi2eg668ctoc623kasqrutg9lg1e.apps.googleusercontent.com
