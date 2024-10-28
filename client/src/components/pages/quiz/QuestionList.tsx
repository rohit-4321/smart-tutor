import { Box, Checkbox, Radio, Stack } from "@mui/material";
import { memo, type FC } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import style from "./QuestionList.module.css";
import {
	setMultipleChoiceOption,
	setSingleChoiceOption,
} from "../../../redux/slices/quizSlice";

export const QuestionList = () => {
	const questionList = useAppSelector((rd) => rd.quiz.value?.questions);
	if (!questionList) {
		return null;
	}

	return (
		<Box display="flex" flexDirection="column" gap="2rem">
			{questionList.map((vl, index) => {
				if (vl.question_type === "single_choice") {
					return (
						<div key={vl.question}>
							<SingleChoiceQuestion
								correctOption={vl.correct_answer}
								description={vl.description}
								options={vl.options}
								question={vl.question}
								questionNumber={index}
								userAnswer={vl.user_answer}
								key={vl.question}
							/>
						</div>
					);
				}
				return (
					<div key={vl.question}>
						<MultipleChoiceQuestion
							correctOption={vl.correct_answer}
							description={vl.description}
							options={vl.options}
							question={vl.question}
							questionNumber={index}
							key={vl.question}
							userAnswer={vl.user_answer}
						/>
					</div>
				);
			})}
		</Box>
	);
};

type SingleChoiceQuestionProps = {
	question: string;
	questionNumber: number;
	options: string[];
	correctOption: number[];
	description: string;
	userAnswer: number[];
};
const SingleChoiceQuestion: FC<SingleChoiceQuestionProps> = memo((props) => {
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
});

type MultipleChoiceQuestionProps = {
	question: string;
	questionNumber: number;
	options: string[];
	correctOption: number[];
	description: string;
	userAnswer: number[];
};
const MultipleChoiceQuestion: FC<MultipleChoiceQuestionProps> = memo(
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
