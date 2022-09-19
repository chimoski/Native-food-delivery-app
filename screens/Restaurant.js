import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import {
	ArrowLeftIcon,
	QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import { urlFor } from "../sanityClient";
import { MapPinIcon } from "react-native-heroicons/outline";
import { ChevronRightIcon, StarIcon } from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import CartIcon from "../components/CartIcon";
import { useDispatch, useSelector } from "react-redux";
import { selectedBucketItems } from "../store/bucketSlice";
import { setRestaurant } from "../store/restauantSlice";
import { MountContext } from "../store/context";
const Restaurant = () => {
	const {
		params: {
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
		},
	} = useRoute();
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const items = useSelector(selectedBucketItems);
	const { isMount } = useContext(MountContext);

	useEffect(() => {
		dispatch(
			setRestaurant({
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
			})
		);
	}, []);
	useEffect(() => {
		navigation.setOptions({
			unmountOnBlur: true,
		});
	}, []);
	return (
		<>
			{items?.length > 0 ? <CartIcon /> : ""}
			<View className='relative'>
				<Image source={{ uri: urlFor(imgUrl).url() }} className='h-56 w-full' />

				<TouchableOpacity
					onPress={() => {
						navigation.goBack();
					}}
					className='absolute top-10 left-3 bg-white rounded-full p-3'>
					<ArrowLeftIcon size={30} color='#00CCBB' className='font-bold' />
				</TouchableOpacity>
			</View>
			<ScrollView>
				<View className='px-4 py-4 bg-white '>
					<Text className='font-bold text-lg '>{title}</Text>
					<View className='flex-row items-center space-x-2 mt-3'>
						<View className='flex-row items-center space-x-1'>
							<StarIcon className='' color='green' size={22} opacity={0.5} />
							<Text className='text-gray-500 text-xs'>
								<Text className='text-green-500'>{rating}</Text>. {genre}
							</Text>
						</View>
						<View className='flex-row items-center space-x-1'>
							<MapPinIcon color='gray' size={22} opacity={0.4} />
							<Text className='text-xs text-gray-500'>Nearby. {address}</Text>
						</View>
					</View>
					<View>
						<Text>{short_desc}</Text>
					</View>
					<TouchableOpacity className='flex-row items-center space-x-2 border-y p-4 border-gray-300 mt-2'>
						<QuestionMarkCircleIcon color='gray' opacity={0.6} size={20} />
						<Text className='pl-2 flex-1 text-md font-bold'>
							Have a food alergy?
						</Text>
						<ChevronRightIcon color='#00CCBB' />
					</TouchableOpacity>

					<View className='pb-36'>
						<Text className='px-4 pt-6 mb-3 font-bold text-xl'>Menu</Text>

						{dishes.map((dish) => (
							<DishRow
								key={dish._id}
								id={dish._id}
								name={dish.name}
								desc={dish.short_desc}
								price={dish.price}
								image={dish.image}
							/>
						))}
					</View>
				</View>
			</ScrollView>
		</>
	);
};

export default Restaurant;
