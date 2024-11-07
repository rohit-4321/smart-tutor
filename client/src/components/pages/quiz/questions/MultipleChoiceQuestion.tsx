import { Box, Stack, Checkbox } from "@mui/material";
import { type FC, memo, useMemo } from "react";
import { setMultipleChoiceOption } from "../../../../redux/slices/quizSlice";
import { useAppDispatch } from "../../../../redux/store";
import style from "./MultipleChoiceQuestion.module.css";
import Latex from "../../../ui/RenderMarkDownLatex";
import ReactMarkdown from "react-markdown";
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
			<Box
				sx={{
					borderRadius: "10px",
					padding: "2rem",
				}}
			>
				<Box>
					<span className={style.questionNumber}>{questionNumber + 1}. </span>
					<Latex>
						<ReactMarkdown>{question}</ReactMarkdown>
					</Latex>
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
							<Checkbox
								style={{ color: "var(--primary-color)" }}
								checked={userAnswer.includes(optionIndex)}
							/>
							<Latex>
								<ReactMarkdown>{vl}</ReactMarkdown>
							</Latex>
						</Stack>
					))}
				</Stack>
			</Box>
		);
	},
);

export const MultipleChoiceQuestionResult: FC<MultipleChoiceQuestionProps> =
	memo((props) => {
		const {
			options,
			questionNumber,
			question,
			userAnswer,
			correctOption,
			description,
		} = props;

		const isQuestionCorrect = useMemo(() => {
			if (
				userAnswer.length === 0 ||
				userAnswer.length !== correctOption.length
			) {
				return false;
			}
			const allExist = correctOption.every((item) => userAnswer.includes(item));
			return allExist;
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
					<Latex>
						<ReactMarkdown>{question}</ReactMarkdown>
					</Latex>
				</Box>
				<Stack mt="0.5rem" gap="10px">
					{options.map((vl, optionIndex) => (
						<Stack
							key={vl}
							sx={{
								borderRadius: "10px",
								...(correctOption.includes(optionIndex) && !isQuestionCorrect
									? { backgroundColor: "var(--right-option-background)" }
									: {}),
							}}
							direction="row"
							alignItems="center"
						>
							<Checkbox
								disabled
								style={{ color: "var(--primary-color)" }}
								checked={userAnswer.includes(optionIndex)}
							/>
							<Latex>
								<ReactMarkdown>{vl}</ReactMarkdown>
							</Latex>
						</Stack>
					))}
				</Stack>
				{!isQuestionCorrect && (
					<Box mt="0.5rem" ml="1rem" fontWeight={400}>
						DESCRIPTION :{" "}
						<Latex>
							<ReactMarkdown>{description}</ReactMarkdown>
						</Latex>
					</Box>
				)}
			</Box>
		);
	});
