import { StatusBar } from "expo-status-bar";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Restaurant from "./screens/Restaurant";
import { store } from "./store/store";
import { Provider, useSelector } from "react-redux";
import Cart from "./screens/Cart";
import PreparingOrder from "./screens/PreparingOrder";
import Delivery from "./screens/Delivery";
import MountProvider from "./store/context";
const Stack = createNativeStackNavigator();
export default function App() {
	return (
		<NavigationContainer>
			<Provider store={store}>
				<MountProvider>
					<TailwindProvider>
						<Stack.Navigator>
							<Stack.Screen
								name='Home'
								component={Home}
								options={{
									headerShown: false,
								}}
							/>
							<Stack.Screen
								name='Restaurant'
								component={Restaurant}
								options={{
									headerShown: false,
									unmountOnBlur: true,
								}}
							/>
							<Stack.Screen
								name='Cart'
								component={Cart}
								options={{
									headerShown: false,
									presentation: "modal",
								}}
							/>
							<Stack.Screen
								name='PreparingOrder'
								component={PreparingOrder}
								options={{
									headerShown: false,
									presentation: "fullScreenModal",
								}}
							/>
							<Stack.Screen
								name='Delivery'
								component={Delivery}
								options={{
									headerShown: false,
									presentation: "modal",
								}}
							/>
						</Stack.Navigator>
					</TailwindProvider>
				</MountProvider>
			</Provider>
		</NavigationContainer>
	);
}
