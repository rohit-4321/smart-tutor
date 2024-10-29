import { Box, Stack, Radio, type SxProps, type Theme } from "@mui/material";
import { type FC, memo } from "react";
import { setSingleChoiceOption } from "../../../../redux/slices/quizSlice";
import { useAppDispatch } from "../../../../redux/store";
import style from "./SingleChoiceQuestion.module.css";
type SingleChoiceQuestionProps = {
	question: string;
	questionNumber: number;
	options: string[];
	correctOption: number[];
	description: string;
	userAnswer: number[];
};
export const SingleChoiceQuestion: FC<SingleChoiceQuestionProps> = memo(
	(props) => {
		const { options, questionNumber, question, userAnswer } = props;
		const dispatch = useAppDispatch();
		return (
			<Box>
				<Box>
					<span className={style.questionNumber}>{questionNumber + 1}. </span>
					<span className={style.questionName}>{question}</span>
				</Box>
				<Stack mt="0.5rem" gap="10px">
					{options.map((vl, optionIndex) => (
						<Stack
							key={vl}
							sx={{
								cursor: "pointer",
							}}
							onClick={() => {
								console.log("clicked");
								dispatch(
									setSingleChoiceOption({
										optionClickedIndex: optionIndex,
										questionIndex: questionNumber,
									}),
								);
							}}
							direction="row"
							alignItems="center"
						>
							<Radio checked={userAnswer.includes(optionIndex)} />
							<span>{vl}</span>
						</Stack>
					))}
				</Stack>
			</Box>
		);
	},
);

// export const SingleChoiceQuestionResult: FC<SingleChoiceQuestionProps> = memo(
// 	(props) => {
// 		const {
// 			options,
// 			questionNumber,
// 			question,
// 			userAnswer,
// 			correctOption,
// 			description,
// 		} = props;
// 		const getStyle = (
// 			user_index: number,
// 			correct_index: number,
// 			option_index: number,
// 		) => {
// 			if (correct_index === option_index && user_index === correct_index) {
// 				return {
// 					backgroundColor: "lightgreen",
// 				} as SxProps<Theme>;
// 			}
// 			if (correct_index === option_index && user_index !== correct_index) {
// 				return {
// 					backgroundColor: "lightgreen",
// 				} as SxProps<Theme>;
// 			}
// 			if (correct_index !== option_index && user_index === correct_index) {
// 				return {
// 					backgroundColor: "red",
// 				} as SxProps<Theme>;
// 			}
// 			if (correct_index !== option_index && user_index !== correct_index) {
// 				return {
// 					backgroundColor: "lightgreen",
// 				} as SxProps<Theme>;
// 			}
// 			return {} as SxProps<Theme>;
// 		};

// 		return (
// 			<Box>
// 				<Box>
// 					<span className={style.questionNumber}>{questionNumber + 1}. </span>
// 					<span className={style.questionName}>{question}</span>
// 				</Box>
// 				<Stack mt="0.5rem" gap="10px">
// 					{options.map((vl, optionIndex) => (
// 						<Stack key={vl} sx={getStyle(userAnswer)} direction="row" alignItems="center">
// 							<Radio disabled checked={userAnswer.includes(optionIndex)} />
// 							<span>{vl}</span>
// 						</Stack>
// 					))}
// 				</Stack>
// 			</Box>
// 		);
// 	},
// );
