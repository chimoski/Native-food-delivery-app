import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanityClient";
import { useNavigation } from "@react-navigation/native";

const ResturantCard = ({
	id,
	imgUrl,
	title,
	rating,
	genre,
	address,
	short_desc,
	dishes,
	long,
	lat,
}) => {
	const navigation = useNavigation();
	return (
		<TouchableOpacity
			className=' bg-white shadow-sm mr-3'
			onPress={() => {
				navigation.navigate("Restaurant", {
					id,
					imgUrl,
					title,
					rating,
					genre,
					address,
					short_desc,
					dishes,
					long,
					lat,
				});
			}}>
			<Image
				source={{
					uri: urlFor(imgUrl).url(),
				}}
				className='w-[250px] h-[150px] rounded-sm'
			/>
			<View className='px-3 pb-4'>
				<Text className='text-lg font-bold pt-2'>{title}</Text>
				<View className='flex-row items-center space-x-1'>
					<StarIcon className='' color='green' size={22} opacity={0.5} />
					<Text className='text-gray-500 text-xs'>
						<Text className='text-green-500'>{rating}</Text>. {genre}
					</Text>
				</View>
				<View className='flex-row items-center space-x-4'>
					<MapPinIcon color='gray' size={22} opacity={0.4} />
					<Text className='text-xs text-gray-500'>Nearby. {address}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default ResturantCard;
