import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { cartTotalPrice, selectedBucketItems } from "../store/bucketSlice";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { currencyFormatter } from "../utility/currencyFormatter";

export default function CartIcon() {
	const items = useSelector(selectedBucketItems);
	const navigation = useNavigation();
	const total = useSelector(cartTotalPrice);
	return (
		<View className='absolute bottom-10 w-full z-50'>
			<TouchableOpacity
				className='mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center'
				onPress={() => navigation.navigate("Cart")}>
				<Text className='text-white font-extrabold text-lg bg-[#01A296] py-1 px-2'>
					{items.length}
				</Text>
				<Text className='flex-1 text-white font-extrabold text-lg text-center'>
					View Cart
				</Text>
				<Text className='text-white bg-[gray] rounded-lg p-3 shadow-sm'>
					{currencyFormatter(total)}
				</Text>
			</TouchableOpacity>
		</View>
	);
}
