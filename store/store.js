import { configureStore } from "@reduxjs/toolkit";
import bucketReducer from "./bucketSlice";
import restaurantReducer from "./restauantSlice";
import unMountReducer from "./unMountSlice";

export const store = configureStore({
	reducer: {
		cart: bucketReducer,
		restaurant: restaurantReducer,
		unMount: unMountReducer,
	},
});
