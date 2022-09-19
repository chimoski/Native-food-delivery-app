import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	unMount: {
		isUnMount: false,
	},
};

export const unMountSlice = createSlice({
	name: "unMount",
	initialState,
	reducers: {
		mount: (state) => {
			const toggle = { ...state.unMount, isUnMount: false };
			return toggle;
		},
		Unmount: (state) => {
			const toggle = { ...state.unMount, isUnMount: true };
			return toggle;
		},
	},
});
export const { mount, unMount } = unMountSlice.actions;
export const selectUnMount = (state) => state.unMount.unMount;
export default unMountSlice.reducer;
