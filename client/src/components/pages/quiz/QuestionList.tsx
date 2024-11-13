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
						<div key={index}>
							<SingleChoiceQuestionResult
								correctOption={vl.correct_answer}
								description={vl.description}
								options={vl.options}
								question={vl.question}
								questionNumber={index}
								userAnswer={vl.user_answer}
							/>
						</div>
					) : (
						<div key={index}>
							<SingleChoiceQuestion
								correctOption={vl.correct_answer}
								description={vl.description}
								options={vl.options}
								question={vl.question}
								questionNumber={index}
								userAnswer={vl.user_answer}
							/>
						</div>
					);
				}
				return status === "completed" ? (
					<div key={index}>
						<MultipleChoiceQuestionResult
							correctOption={vl.correct_answer}
							description={vl.description}
							options={vl.options}
							question={vl.question}
							questionNumber={index}
							userAnswer={vl.user_answer}
						/>
					</div>
				) : (
					<div key={index}>
						<MultipleChoiceQuestion
							correctOption={vl.correct_answer}
							description={vl.description}
							options={vl.options}
							question={vl.question}
							questionNumber={index}
							userAnswer={vl.user_answer}
						/>
					</div>
				);
			})}
		</Box>
	);
};
