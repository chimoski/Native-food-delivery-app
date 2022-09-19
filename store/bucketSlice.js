import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	items: [],
};

export const bucketSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			state.items = [...state.items, action.payload];
		},
		removeFromCart: (state, action) => {
			const index = state.items.findIndex(
				(items) => items.id === action.payload.id
			);
			const newItems = state.items.filter((el, i) => i !== index);
			state.items = newItems;
		},

		resetCart: (state) => {
			state.items = [];
		},
	},
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart, resetCart } = bucketSlice.actions;
export const selectedBucketItems = (state) => state.cart.items;
export const selectBucketItemsById = (state, id) =>
	state.cart.items.filter((item) => item.id === id);
export const cartTotalPrice = (state) =>
	state.cart.items.reduce((acc, el) => acc + el.price, 0);
export default bucketSlice.reducer;
