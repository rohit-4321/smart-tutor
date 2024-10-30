import { Box } from "@mui/material";
import { useAppSelector } from "../../../redux/store";
import {
	SingleChoiceQuestion,
	SingleChoiceQuestionResult,
} from "./questions/SingleChoiceQuestion";
import {
	MultipleChoiceQuestion,
	MultipleChoiceQuestionResult,
} from "./questions/MultipleChoiceQuestion";

export const QuestionList = () => {
	const questionList = useAppSelector((rd) => rd.quiz.value?.questions);
	const status = useAppSelector((rd) => rd.quiz.value?.status);
	if (!questionList) {
		return null;
	}

	return (
		<Box display="flex" flexDirection="column" gap="2rem">
			{questionList.map((vl, index) => {
				if (vl.question_type === "single_choice") {
					return status === "completed" ? (
						<div key={vl.question}>
							<SingleChoiceQuestionResult
								correctOption={vl.correct_answer}
								description={vl.description}
								options={vl.options}
								question={vl.question}
								questionNumber={index}
								userAnswer={vl.user_answer}
								key={vl.question}
							/>
						</div>
					) : (
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
				return status === "completed" ? (
					<div key={vl.question}>
						<MultipleChoiceQuestionResult
							correctOption={vl.correct_answer}
							description={vl.description}
							options={vl.options}
							question={vl.question}
							questionNumber={index}
							key={vl.question}
							userAnswer={vl.user_answer}
						/>
					</div>
				) : (
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
