import { Box, Stack, Button } from "@mui/material";
import { QuestionList } from "./QuestionList";
import { QuizHeader } from "./QuizHaeader";
import { useAppSelector } from "../../../redux/store";
import { useSearchParams } from "react-router-dom";

export const NewQuiz = () => {
	// const isQuizAvailable = useAppSelector((state) => Boolean(state.quiz.value));
	const [searchParams] = useSearchParams();

	// Access individual parameters
	const isNew = Boolean(searchParams.get("newQuiz"));

	return (
		<Box mx="3rem">
			<QuizHeader />
			<Box mt="2rem">
				<QuestionList />
			</Box>

			<Stack my="2rem" gap={5} direction="row-reverse">
				<Button variant="outlined">Submit</Button>
				<Button variant="contained">Save As Draft</Button>
			</Stack>
		</Box>
	);
};
