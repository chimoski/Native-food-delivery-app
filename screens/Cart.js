import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	TouchableOpacity,
	Image,
	ScrollView,
} from "react-native";
import { XCircleIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import { urlFor } from "../sanityClient";
import {
	cartTotalPrice,
	selectedBucketItems,
	removeFromCart,
} from "../store/bucketSlice";
import { selectedRestaurant } from "../store/restauantSlice";
import { currencyFormatter } from "../utility/currencyFormatter";

const Cart = () => {
	const items = useSelector(selectedBucketItems);
	const dispatch = useDispatch();
	const total = useSelector(cartTotalPrice);
	const [groupCartItems, setGroupCartItems] = useState([]);
	const restaurant = useSelector(selectedRestaurant);
	const navigation = useNavigation();

	useEffect(() => {
		const groupItems = items?.reduce((acc, item) => {
			(acc[item.id] = acc[item.id] || []).push(item);
			return acc;
		}, {});
		setGroupCartItems(groupItems);
	}, [items]);
	return (
		<>
			{items.length > 0 && (
				<SafeAreaView className='flex-1 bg-white mt-20'>
					<View className='flex-1 bg-gray-100'>
						<View className='p-5 border-b border-[#00CCBB] bg-white shadow-xs'>
							<View>
								<Text className='text-lg font-bold text-center'>CART</Text>
								<Text className='text-gray-400 text-center'>
									{restaurant.title}
								</Text>
							</View>
							<TouchableOpacity
								onPress={() => navigation.goBack()}
								className='rounded-full bg-gray-100 absolute top-3 right-5'>
								<XCircleIcon color='#00CCBB' height={50} width={50} />
							</TouchableOpacity>
						</View>

						<View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-3'>
							<Image
								source={{ uri: "https://links.papareact.com/wru" }}
								className='h-7 w7 bg-gray-300 p-4 rounded-full'
							/>
							<Text>Deliver in 50 - 75 min</Text>
							<TouchableOpacity>
								<Text className='text-[#00CCBB]'>Change</Text>
							</TouchableOpacity>
						</View>

						<ScrollView className='divide-y divide-gray-200'>
							{Object.entries(groupCartItems).map(([key, value]) => (
								<View
									key={key}
									className='flex-row items-center space-x-3 bg-white py-2 px-5 '>
									<Text className='text-[#00CCBB]'>×{value.length}</Text>
									<Image
										source={{ uri: urlFor(value[0]?.image).url() }}
										className='h-12 w-12'
									/>
									<Text className='flex-1'>{value[0]?.name}</Text>
									<Text>{currencyFormatter(value[0]?.price)}</Text>
									<TouchableOpacity>
										<Text
											className='text-[#00CCBB] text-xs'
											onPress={() => dispatch(removeFromCart({ id: key }))}>
											Remove
										</Text>
									</TouchableOpacity>
								</View>
							))}
						</ScrollView>
						<View className='p-5 bg-white mt-5 space-y-4'>
							<View className='flex-row justify-between'>
								<Text className='text-gray-400'>Subtotal</Text>
								<Text className='text-gray-400'>
									{currencyFormatter(total)}
								</Text>
							</View>
							<View className='flex-row justify-between'>
								<Text className='text-gray-400'>Delivery fee</Text>
								<Text className='text-gray-400'>{currencyFormatter(599)}</Text>
							</View>
							<View className='flex-row justify-between'>
								<Text>Total</Text>
								<Text className='font-extrabold'>
									{currencyFormatter(total + 599)}
								</Text>
							</View>

							<TouchableOpacity
								className='rounded-lg bg-[#00CCBB] p-4'
								onPress={() => navigation.navigate("PreparingOrder")}>
								<Text className='text-center text-white text-xl font-bold'>
									Place Order
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</SafeAreaView>
			)}
		</>
	);
};

export default Cart;
