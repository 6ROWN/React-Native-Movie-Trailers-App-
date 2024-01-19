import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import { getGenres } from "../services/api";
import { movieGenresProps } from "../types";

const GenreNames = ({
	genreIds,
	textColor,
}: {
	genreIds: any;
	textColor: string;
}) => {
	const [genreNames, setGenreNames] = useState([]);

	useEffect(() => {
		const fetchGenreNames = async () => {
			try {
				const allGenres = await getGenres();
				const matchedGenres = genreIds
					.map(
						(id: number) =>
							allGenres.genres.find(
								(g: movieGenresProps) => g.id === id
							)?.name
					)
					.filter(Boolean);

				setGenreNames(matchedGenres);
			} catch (error) {
				console.error("Error fetching genre names:", error);
			}
		};

		fetchGenreNames();
	}, [genreIds]);

	return <Text className={`${textColor}`}>{genreNames.join(", ")}</Text>;
};

export default GenreNames;
