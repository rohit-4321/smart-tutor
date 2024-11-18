import { Box, Stack, Radio } from "@mui/material";
import { type FC, memo, useMemo } from "react";
import { setSingleChoiceOption } from "../../../../redux/slices/quizSlice";
import { useAppDispatch } from "../../../../redux/store";
import ReactMarkdown from "react-markdown";
import style from "./SingleChoiceQuestion.module.css";
import Latex from "../../../ui/RenderMarkDownLatex";
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
					<Latex>
						<ReactMarkdown>
							{/* {
								"What does the following PHP code do? ``` $x = 5; $y = $x; echo $y; ```"
							} */}
							{question}
						</ReactMarkdown>
						{/* <span
							className={style.questionName}
							dangerouslySetInnerHTML={{ __html: question }}
						/> */}
					</Latex>
					{/* <RenderMarkDown markdownString={question} /> */}
				</Box>
				<Stack mt="0.5rem" gap="10px">
					{options.map((vl, optionIndex) => (
						<Stack
							key={vl}
							sx={{
								cursor: "pointer",
							}}
							onClick={() => {
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
							<Latex>
								<ReactMarkdown>{vl}</ReactMarkdown>
								{/* <span
							className={style.questionName}
							dangerouslySetInnerHTML={{ __html: question }}
						/> */}
							</Latex>
							{/* <span dangerouslySetInnerHTML={{ __html: vl }} /> */}
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
					<Latex>
						<ReactMarkdown>{question}</ReactMarkdown>
					</Latex>
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
						DESCRIPTION :{" "}
						<Latex>
							<ReactMarkdown>{description}</ReactMarkdown>
						</Latex>
					</Box>
				)}
			</Box>
		);
	},
);
