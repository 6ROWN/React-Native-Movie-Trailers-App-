import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { getTvSeries } from "../services/api";
import MovieCard from "../components/MovieCard";
import { MovieProps } from "../types";
import MovieCategory from "../components/MovieCategory";
import Error from "../components/Error";
import Loading from "../components/Loading";

const TvSeries = () => {
	const [tvSeriesData, setTvSeriesData] = useState({
		nowPlaying: [],
		airingToday: [],
		onAir: [],
		popular: [],
		topRated: [],
	});
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const data = await getTvSeries();
				setTvSeriesData({
					nowPlaying: data?.nowPlaying?.results || [],
					airingToday: data?.airingToday?.results || [],
					onAir: data?.onAir?.results || [],
					popular: data?.popular?.results || [],
					topRated: data?.topRated?.results || [],
				});
			} catch (error) {
				console.error("Error fetching TV series data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchData();
	}, []);

	if (error) {
		return <Error />;
	}

	if (isLoading) {
		return <Loading />;
	}

	return (
		<ScrollView
			showsVerticalScrollIndicator={false}
			className="flex-1 bg-darkGray pt-10 pb-30 px-4 "
		>
			<Text className="text-center text-lg font-black text-white">
				Exciting TV Shows
			</Text>
			<MovieCategory title="Now Showing" data={tvSeriesData.nowPlaying} />
			<MovieCategory
				title="Airing Today"
				data={tvSeriesData.airingToday}
			/>
			<MovieCategory title="On Air" data={tvSeriesData.onAir} />
			<MovieCategory title="Top Rated" data={tvSeriesData.topRated} />
			<MovieCategory title="Popular" data={tvSeriesData.popular} />
		</ScrollView>
	);
};

export default TvSeries;
