import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { MinusCircleIcon, PlusCircleIcon } from "react-native-heroicons/solid";
import { urlFor } from "../sanityClient";
import { currencyFormatter } from "../utility/currencyFormatter";
import { useSelector, useDispatch } from "react-redux";
import {
	addToCart,
	removeFromCart,
	selectBucketItemsById,
} from "../store/bucketSlice";

const DishRow = ({ id, name, desc, price, image }) => {
	const dispatch = useDispatch();

	const [isPressed, setIsPressed] = useState(false);
	const items = useSelector((state) => selectBucketItemsById(state, id));

	const handleAddToCart = () => {
		dispatch(addToCart({ id, name, desc, price, image }));
	};
	const handleRemoveFromCart = () => {
		if (items.length > 0) dispatch(removeFromCart({ id }));
		else return;
	};
	return (
		<>
			<TouchableOpacity
				className={`bg-white border p-4 border-gray-200 ${
					isPressed && "border-b-0"
				}`}
				onPress={() => setIsPressed((prev) => !prev)}>
				<View className='flex-row'>
					<View className='flex-1 pr-2 '>
						<Text className='text-lg mb-1'>{name}</Text>
						<Text className='text-gray-400'>{desc}</Text>
						<Text className='text-gray-400 mb-2'>
							{currencyFormatter(price)}
						</Text>
					</View>

					<View>
						<Image
							style={{ borderWidth: 1, borderColor: "#F3F3F4" }}
							source={{ uri: urlFor(image).url() }}
							className='h-20 w-20 bg-gray-300 p-4'
						/>
					</View>
				</View>
			</TouchableOpacity>
			{isPressed && (
				<View className='bg-white px-4'>
					<View className='flex-row items-center space-x-2 pb-3'>
						<TouchableOpacity
							onPress={handleRemoveFromCart}
							disabled={items.length === 0}>
							<MinusCircleIcon
								size={40}
								color={`${items.length === 0 ? "blue" : "#00CCBB"}`}
							/>
						</TouchableOpacity>
						<Text>{items.length}</Text>
						<TouchableOpacity onPress={handleAddToCart}>
							<PlusCircleIcon size={40} color='#00CCBB' />
						</TouchableOpacity>
					</View>
				</View>
			)}
		</>
	);
};

export default DishRow;
