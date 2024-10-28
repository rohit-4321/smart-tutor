import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { QuizResponse } from "../../api/home.interface";

interface State {
	value: QuizResponse | null;
	attempted?: number;
	remaining?: number;
}
const initialState: State = {
	value: null,
};
// const initialState: State = {
// 	value: {
// 		_id: "asdsa",
// 		questions: [
// 			{
// 				correct_answer: [0],
// 				description:
// 					"Temporary files can build up on a computer over time, taking up space and slowing down performance.",
// 				options: [
// 					"Accumulation of temporary files",
// 					"Good internet connection",
// 					"Regular software updates",
// 					"High disk space",
// 				],
// 				question:
// 					"What is a common reason for a computer to slow down over time?",
// 				question_type: "single_choice",
// 				user_answer: [],
// 			},
// 			{
// 				correct_answer: [0, 2, 3],
// 				description:
// 					"Adding RAM, removing unused applications, and using an SSD are effective ways to improve performance.",
// 				options: [
// 					"Adding more RAM",
// 					"Decreasing screen brightness",
// 					"Uninstalling unused applications",
// 					"Upgrading to an SSD",
// 				],
// 				question: "Which of these can help improve a computer's speed?",
// 				question_type: "multiple_choice",
// 				user_answer: [],
// 			},
// 			{
// 				correct_answer: [1],
// 				description:
// 					"RAM is a key component for multitasking. Low RAM can cause lag when multiple applications are open.",
// 				options: ["Graphics card", "RAM", "Monitor", "Keyboard"],
// 				question:
// 					"Which component is most likely to cause lag when running multiple applications?",
// 				question_type: "single_choice",
// 				user_answer: [],
// 			},
// 			{
// 				correct_answer: [0, 1],
// 				description:
// 					"Antivirus software and safe browsing habits help prevent malware that can slow down a computer.",
// 				options: [
// 					"Install antivirus software",
// 					"Avoid clicking on suspicious links",
// 					"Use an external keyboard",
// 					"Increase screen resolution",
// 				],
// 				question:
// 					"What should be done to prevent malware from slowing down your computer?",
// 				question_type: "multiple_choice",
// 				user_answer: [],
// 			},
// 			{
// 				correct_answer: [2],
// 				description:
// 					"Switching from a hard drive to an SSD generally offers significant speed improvements for daily tasks.",
// 				options: ["CPU", "Graphics card", "SSD", "Power supply"],
// 				question:
// 					"Which part upgrade typically gives the biggest boost to computer speed for everyday tasks?",
// 				question_type: "single_choice",
// 				user_answer: [],
// 			},
// 			{
// 				correct_answer: [0, 2],
// 				description:
// 					"Disabling unnecessary startup applications and using an SSD can significantly reduce startup time.",
// 				options: [
// 					"Disabling startup applications",
// 					"Increasing screen size",
// 					"Using a faster hard drive or SSD",
// 					"Changing desktop background",
// 				],
// 				question: "Which of these actions can help reduce startup time?",
// 				question_type: "multiple_choice",
// 				user_answer: [],
// 			},
// 			{
// 				correct_answer: [1],
// 				description:
// 					"Defragmenting a hard drive organizes data, making it quicker for the system to access files.",
// 				options: [
// 					"Increases storage capacity",
// 					"Organizes data for faster access",
// 					"Improves internet speed",
// 					"Removes all files",
// 				],
// 				question: "What does defragmenting a hard drive do?",
// 				question_type: "single_choice",
// 				user_answer: [],
// 			},
// 			{
// 				correct_answer: [0, 2, 3],
// 				description:
// 					"Deleting temporary files, uninstalling unused applications, and clearing the recycle bin help free up space.",
// 				options: [
// 					"Deleting temporary files",
// 					"Playing music",
// 					"Removing unused applications",
// 					"Clearing the recycle bin",
// 				],
// 				question: "Which tasks can free up space on your computer?",
// 				question_type: "multiple_choice",
// 				user_answer: [],
// 			},
// 		],
// 		topic: "Computer Performance Optimization",
// 		total_no_of_questions: 8,
// 	},
// 	attempted: 0,
// 	remaining: 8,
// };

export const quizSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		setQuiz: (state, action: PayloadAction<QuizResponse>) => {
			state.value = action.payload;
			state.attempted = 0;
			state.remaining = action.payload.total_no_of_questions;
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
		},
	},
});

// Action creators are generated for each case reducer function
export const { setQuiz, setSingleChoiceOption, setMultipleChoiceOption } =
	quizSlice.actions;

export default quizSlice.reducer;
