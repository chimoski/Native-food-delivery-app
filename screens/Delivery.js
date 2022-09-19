import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	StyleSheet,
	Dimensions,
	Pressable,
	BackHandler,
} from "react-native";
import { XMarkIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { selectedRestaurant } from "../store/restauantSlice";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";
import { PhoneIcon } from "react-native-heroicons/solid";
import { MountContext } from "../store/context";
import { resetCart } from "../store/bucketSlice";

const Delivery = () => {
	const restaurant = useSelector(selectedRestaurant);
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const { setIsMount } = useContext(MountContext);

	useEffect(() => {
		const backHandler = BackHandler.addEventListener(
			"hardwareBackPress",
			() => {
				navigation.navigate("Home");
				dispatch(resetCart());
			}
		);

		return () => backHandler.remove();
	}, []);

	return (
		<View className='bg-[#00CCBB] flex-1'>
			<SafeAreaView className='mt-10 px-5 flex-row items-center justify-between'>
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("Home");
						setIsMount(true);
						dispatch(resetCart());
					}}>
					<XMarkIcon color='white' size={30} />
				</TouchableOpacity>
				<TouchableOpacity>
					<Text className='text-white text-sm'>Order Help</Text>
				</TouchableOpacity>
			</SafeAreaView>
			<View className=' p-5 m-4 bg-white shadow-md z-50'>
				<View className='flex-row items-center justify-between'>
					<View>
						<Text className='text-[#8c8a8a] font-bold text-lg'>
							Estimated Arrival
						</Text>
						<Text className='text-gray-400 text-3xl'>45-55 Minuites</Text>
					</View>
					<Image
						source={{ uri: "https://links.papareact.com/fls" }}
						className='w-[100px] h-[100px]'
					/>
				</View>
				<Progress.Bar size={30} color='#00CCBB' indeterminate={true} />
				<Text className='text-gray-400 mt-3 text-center w-full'>
					Your order at{" "}
					<Text className='font-bold text-[#8c8a8a]'>{restaurant.title}</Text>{" "}
					is being prepared
				</Text>
			</View>
			<View>
				<MapView
					initialRegion={{
						latitude: restaurant.lat,
						longitude: restaurant.long,
						latitudeDelta: 0.005,
						longitudeDelta: 0.005,
					}}
					className='flex-1 -mt-10 z-0'
					style={styles.map}
					mapType='mutedStandard'>
					<Marker
						coordinate={{
							latitude: restaurant.lat,
							longitude: restaurant.long,
						}}
						title={restaurant.title}
						description={restaurant.short_desc}
						identifier='origin'
						pinColor='#00CCBB'
					/>
				</MapView>
			</View>
			<View className='z-50 bg-white p-5 absolute bottom-0 w-full flex-row  items-center justify-between'>
				<Image
					source={{
						uri: "https://res.cloudinary.com/chimoskient/image/upload/v1657977689/port2_phyinp.jpg",
					}}
					className='h-[50px] w-[50px] rounded-full'
				/>
				<View>
					<Text className='text-gray-400'>Mr Prince Olumide</Text>
					<Text className='font-bold'>Your Rider</Text>
				</View>
				<Pressable className='flex-row items-center space-x-2'>
					<PhoneIcon className=' h-6 w-6' color='#00CCBB' />
					<Text className='text-gray-400 text-[12px]'>Call</Text>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	map: {
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
});
export default Delivery;
