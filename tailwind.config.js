/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./App.{js,jsx,ts,tsx}",
		"./screens/**/*.{js,jsx,ts,tsx}",
		"./components/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {
			colors: {
				white: "#ffffff", // Pure White
				brightRed: "#db222a", // Crimson/Bright Red
				black: "#000000", // Pure Black
				darkGray: "#1d1d1d", // Very Dark Gray (almost Black)
				lightGray: "#555555", // Light Gray
				// You can add more custom colors here
			},
		},
	},
	plugins: [],
};
