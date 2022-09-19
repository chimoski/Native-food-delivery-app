import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import client from "../sanityClient";
import ResturantCard from "./ResturantCard";

const FeaturedRow = ({ desc, title, id }) => {
	const [restaurants, setRestaurants] = useState([]);

	useEffect(() => {
		client
			.fetch(
				`*[_type == "featured" && _id == $id]{
					...,
					restaurants[]->{
						...,
						dishes[]->,
						type->{
						name
						}
					}
					}[0]`,
				{ id }
			)
			.then((data) => setRestaurants(data?.restaurants));
	}, [id]);

	return (
		<View className=''>
			<View className='flex-row items-center justify-between mt-4 px-4'>
				<Text className='font-bold text-lg'>{title}</Text>
				<ArrowRightIcon className='h-7 w-7' color='green' />
			</View>
			<Text className='text-sm px-4'>{desc}</Text>
			<ScrollView
				horizontal
				contentContainerStyle={{
					paddingHorizontal: 15,
					paddingTop: 10,
				}}
				showsHorizontalScrollIndicator={false}>
				{restaurants?.map((restaurant) => {
					const {
						id: _id,
						address,
						lat,
						long,
						name,
						rating,
						short_desc,
					} = restaurant;
					return (
						<ResturantCard
							key={id}
							id={id}
							imgUrl={restaurant.image}
							title={name}
							rating={rating}
							genre={restaurant.type?.name}
							address={address}
							short_desc={short_desc}
							dishes={restaurant.dishes}
							long={long}
							lat={lat}
						/>
					);
				})}
			</ScrollView>
		</View>
	);
};

export default FeaturedRow;
