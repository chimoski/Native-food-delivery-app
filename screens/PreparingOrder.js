import { View, Text } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrder = () => {
	const navigation = useNavigation();

	useEffect(() => {
		setTimeout(() => {
			navigation.navigate("Delivery");
		}, 4000);
	});
	return (
		<View className=' flex-1 items-center justify-center bg-[#00CCBB]'>
			<Animatable.Image
				source={require("../assets/gift.png")}
				animation='slideInUp'
				iterationCount='1'
				className='h-96 w-96'
			/>
			<Animatable.Text
				animation='slideInUp'
				iterationCount='1'
				className='text-lg my-10 text-white font-bold text-center'>
				Waiting for restaurant to accept your order
			</Animatable.Text>
			<Progress.Circle size={30} indeterminate={true} color='white' />
		</View>
	);
};

export default PreparingOrder;
