import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, SerializedError } from "@reduxjs/toolkit";
import flashCard from "../../api/flashCard.api";

export interface FlashCardState {
	data: { question: string; answer: string; _id: string }[];
	isLoading: boolean;
	isError: SerializedError | null;
}

const initialState: FlashCardState = {
	data: [],
	isLoading: false,
	isError: null,
};

export const flashCardSlice = createSlice({
	name: "flashCard",
	initialState,
	reducers: {
		updateCard: (
			state,
			action: PayloadAction<{
				question: string;
				answer: string;
				index: number;
			}>,
		) => {
			const { answer, index, question } = action.payload;
			state.data[index] = {
				_id: state.data[index]._id,
				answer: answer,
				question: question,
			};
		},
		emptyData: (state) => {
			state.data = initialState.data;
			state.isLoading = initialState.isLoading;
			state.isError = initialState.isError;
		},
	},
	extraReducers: (builder) => {
		builder
			.addMatcher(flashCard.endpoints.getCards.matchPending, (state) => {
				state.isLoading = true;
				console.log("running", state.isLoading);
				state.isError = null;
			})
			.addMatcher(
				flashCard.endpoints.getCards.matchFulfilled,
				(state, action) => {
					state.isLoading = false;
					state.data = action.payload.result.cards;
				},
			)
			.addMatcher(
				flashCard.endpoints.getCards.matchRejected,
				(state, action) => {
					state.isLoading = false;
					state.isError = action.error;
				},
			);
	},
});

// Action creators are generated for each case reducer function
export const { updateCard, emptyData } = flashCardSlice.actions;

export default flashCardSlice.reducer;
