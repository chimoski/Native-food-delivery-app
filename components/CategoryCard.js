import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const CategoryCard = ({ imgUrl, title }) => {
	return (
		<TouchableOpacity className='relative mr-2'>
			{/* <Image source={{ uri: imgUrl }} className='h-20 w-20 rounded' /> */}
			<Image
				source={{
					uri: imgUrl,
				}}
				className='h-20 w-20 '
			/>
			<View className='absolute h-20 w-20 bg-black opacity-[0.4]'></View>
			<Text className='absolute bottom-1 left-1 text-white font-bold'>
				{title}
			</Text>
		</TouchableOpacity>
	);
};

export default CategoryCard;
