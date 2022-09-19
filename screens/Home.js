import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useEffect, useState } from "react";
import {
	View,
	Text,
	SafeAreaView,
	Image,
	TextInput,
	ScrollView,
	BackHandler,
	Alert,
} from "react-native";
import {
	ChevronDownIcon,
	UserIcon,
	MagnifyingGlassIcon,
	AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import Categories from "../components/Categories";
import FeaturedRow from "../components/FeaturedRow";
import client from "../sanityClient";
import { useIsFocused } from "@react-navigation/native";

const Home = () => {
	const [featuredCategories, setFeaturedCategories] = useState([]);
	const isFocussed = useIsFocused();

	useEffect(() => {
		client
			.fetch(
				`*[_type == "featured"]{
				...,
				restaurants[]->{
					...,
					dishes[]->,
					type->{
					name
					}
				}
			}`
			)
			.then((data) => setFeaturedCategories(data));
	}, []);

	useEffect(() => {
		const backAction = () => {
			if (isFocussed) {
				Alert.alert("Hold on!", "Are you sure you want to Exit app?", [
					{
						text: "Cancel",
						onPress: () => null,
						style: "cancel",
					},
					{ text: "YES", onPress: () => BackHandler.exitApp() },
				]);
			}
			return true;
		};

		const handleBack = BackHandler.addEventListener(
			"hardwareBackPress",
			backAction
		);
		return () => handleBack.remove();
	}, []);

	return (
		<SafeAreaView className='bg-white py-4 pb-20'>
			<View className='flex-row mt-[40px] items-center space-x-2 mx-4  pb-2'>
				<Image
					source={{
						uri: "https://links.papareact.com/wru",
					}}
					className='h-7 w-7 bg-gray-300 p-4 rounded-full'
				/>

				<View className='flex-1'>
					<Text className='font-bold font-gray-400 text-xs'>Deliver Now!</Text>
					<Text className='text-xl font-bold'>
						Current Location
						<ChevronDownIcon size={20} color='#00CCBB' className='mt-5' />
					</Text>
				</View>
				<UserIcon size={35} color='#00CCBB' />
			</View>

			{/* seacrh bar */}
			<View className='flex-row items-center mx-4 pb-2'>
				<View className='flex-row flex-1  bg-gray-200 p-2 space-x-2'>
					<MagnifyingGlassIcon color='#00CCBB' />
					<TextInput placeholder='Resturants and Cuisines' />
				</View>
				<AdjustmentsVerticalIcon color='#00CCBB' />
			</View>
			{/* Body */}
			<ScrollView
				className='bg-gray-100'
				contentContainerStyle={{ paddingBottom: 100 }}>
				{/* categories */}
				<Categories />

				{/* featured rows */}
				{featuredCategories?.map((cat) => (
					<FeaturedRow
						key={cat._id}
						id={cat._id}
						title={cat.name}
						desc={cat.short_desc}
					/>
				))}
			</ScrollView>
		</SafeAreaView>
	);
};

export default Home;
