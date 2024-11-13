import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { QuizResponse } from "../../api/home.interface";

interface State {
	value: QuizResponse | null;
	attempted: number;
}
const initialState: State = {
	value: null,
	attempted: 0,
};

const calculateAttemptedQuiz = (questionList: QuizResponse["questions"]) => {
	let count = 0;
	for (let i = 0; i <= questionList.length - 1; i++) {
		if (questionList[i].user_answer.length > 0) count++;
	}
	return count;
};
export const quizSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		setQuiz: (state, action: PayloadAction<QuizResponse>) => {
			state.value = action.payload;
			state.attempted = calculateAttemptedQuiz(action.payload.questions);
		},

		updateQuizStatus: (
			state,
			action: PayloadAction<QuizResponse["status"]>,
		) => {
			if (state.value) {
				state.value.status = action.payload;
			}
		},
		setSingleChoiceOption: (
			state,
			action: PayloadAction<{
				questionIndex: number;
				optionClickedIndex: number;
			}>,
		) => {
			const { optionClickedIndex, questionIndex } = action.payload;
			if (!state.value) return;

			if (
				state.value.questions[questionIndex].user_answer.includes(
					optionClickedIndex,
				)
			) {
				state.value.questions[questionIndex].user_answer = [];
			} else {
				state.value.questions[questionIndex].user_answer = [optionClickedIndex];
			}

			let attempted = 0;

			for (let i = 0; i < state.value.questions.length; i++) {
				if (state.value.questions[i].user_answer.length > 0) attempted++;
			}
			state.attempted = attempted;
		},
		setMultipleChoiceOption: (
			state,
			action: PayloadAction<{
				questionIndex: number;
				optionClickedIndex: number;
			}>,
		) => {
			const { optionClickedIndex, questionIndex } = action.payload;
			if (!state.value) return;

			if (
				state.value.questions[questionIndex].user_answer.includes(
					optionClickedIndex,
				)
			) {
				const index =
					state.value.questions[questionIndex].user_answer.indexOf(
						optionClickedIndex,
					);
				state.value.questions[questionIndex].user_answer.splice(index, 1);
			} else {
				console.log(state.value.questions[questionIndex].user_answer);
				state.value.questions[questionIndex].user_answer.push(
					optionClickedIndex,
				);
			}

			let attempted = 0;

			for (let i = 0; i < state.value.questions.length; i++) {
				if (state.value.questions[i].user_answer.length > 0) attempted++;
			}
			console.log(attempted);
			state.attempted = attempted;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setQuiz,
	setSingleChoiceOption,
	setMultipleChoiceOption,
	updateQuizStatus,
} = quizSlice.actions;

export default quizSlice.reducer;
