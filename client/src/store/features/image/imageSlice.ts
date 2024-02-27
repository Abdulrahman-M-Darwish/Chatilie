import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
	cover: string;
	avatar: string;
	type: "cover" | "avatar";
	isModalOpen: boolean;
};

const initialState: InitialState = {
	avatar: "",
	cover: "",
	type: "cover",
	isModalOpen: false,
};

export const imageSlice = createSlice({
	name: "image",
	initialState,
	reducers: {
		setImage(
			state,
			{ payload }: PayloadAction<{ image: string; type: "cover" | "avatar" }>
		) {
			if (payload.type === "cover") {
				state.cover = payload.image;
			} else {
				state.avatar = payload.image;
			}
			state.type = payload.type || "cover";
		},
		openImage(
			state,
			{ payload }: PayloadAction<{ image: string; type: "cover" | "avatar" }>
		) {
			if (payload.type === "cover") {
				state.cover = payload.image;
			} else {
				state.avatar = payload.image;
			}
			state.type = payload.type || "cover";
			state.isModalOpen = true;
		},
		closeImage(state) {
			state.isModalOpen = false;
		},
		reset: () => initialState,
	},
});

export const { setImage, closeImage, openImage, reset } = imageSlice.actions;
