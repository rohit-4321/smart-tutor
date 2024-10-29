import { Box, Stack, Checkbox } from "@mui/material";
import { type FC, memo } from "react";
import { setMultipleChoiceOption } from "../../../../redux/slices/quizSlice";
import { useAppDispatch } from "../../../../redux/store";
import style from "./MultipleChoiceQuestion.module.css";
type MultipleChoiceQuestionProps = {
	question: string;
	questionNumber: number;
	options: string[];
	correctOption: number[];
	description: string;
	userAnswer: number[];
};
export const MultipleChoiceQuestion: FC<MultipleChoiceQuestionProps> = memo(
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
									setMultipleChoiceOption({
										optionClickedIndex: optionIndex,
										questionIndex: questionNumber,
									}),
								);
							}}
							direction="row"
							alignItems="center"
						>
							<Checkbox checked={userAnswer.includes(optionIndex)} />
							<span>{vl}</span>
						</Stack>
					))}
				</Stack>
			</Box>
		);
	},
);
