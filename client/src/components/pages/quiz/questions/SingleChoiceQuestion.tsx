import { Box, Stack, Radio, type SxProps, type Theme } from "@mui/material";
import { type FC, memo, useMemo } from "react";
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
			<Box
				sx={{
					borderRadius: "10px",
					padding: "2rem",
					// backgroundColor: "red",
				}}
			>
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
							<Radio
								style={{ color: "var(--primary-color)" }}
								checked={userAnswer.includes(optionIndex)}
							/>
							<span>{vl}</span>
						</Stack>
					))}
				</Stack>
			</Box>
		);
	},
);

export const SingleChoiceQuestionResult: FC<SingleChoiceQuestionProps> = memo(
	(props) => {
		const {
			options,
			questionNumber,
			question,
			userAnswer,
			correctOption,
			description,
		} = props;
		const isQuestionCorrect = useMemo(() => {
			if (userAnswer.length === 0) return false;
			return correctOption[0] === userAnswer[0];
		}, [correctOption, userAnswer]);

		return (
			<Box
				sx={{
					borderRadius: "10px",
					padding: "2rem",
					backgroundColor: isQuestionCorrect
						? "var(--right-answer-background)"
						: "var(--wrong-answer-background)",
				}}
			>
				<Box>
					<span className={style.questionNumber}>{questionNumber + 1}. </span>
					<span className={style.questionName}>{question}</span>
				</Box>
				<Stack mt="0.5rem" gap="10px">
					{options.map((vl, optionIndex) => (
						<Stack
							key={vl}
							direction="row"
							alignItems="center"
							sx={{
								borderRadius: "10px",
								...(optionIndex === correctOption[0] && !isQuestionCorrect
									? { backgroundColor: "var(--right-option-background)" }
									: {}),
							}}
						>
							<Radio
								style={{ color: "var(--primary-color)" }}
								disabled
								checked={userAnswer.includes(optionIndex)}
							/>
							<span>{vl}</span>
						</Stack>
					))}
				</Stack>
				{!isQuestionCorrect && (
					<Box mt="0.5rem" ml="1rem" fontWeight={400}>
						DESCRIPTION : <span>{description}</span>
					</Box>
				)}
			</Box>
		);
	},
);
