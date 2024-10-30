import { Box, Stack } from "@mui/material";
import { useAppSelector } from "../../../redux/store";

export const QuizHeader = () => {
	const topicName = useAppSelector(
		(reduxState) => reduxState.quiz.value?.topic,
	);
	const attempted = useAppSelector((reduxState) => reduxState.quiz.attempted);
	const no_of_question = useAppSelector(
		(reduxState) => reduxState.quiz.value?.total_no_of_questions,
	);

	return (
		<Box
			sx={{
				mb: "3rem",
			}}
		>
			<Stack
				justifyContent="center"
				alignItems="center"
				my={4}
				fontSize="1.2rem"
			>
				<h1>{topicName}</h1>
			</Stack>
			<Stack
				mb="2rem"
				justifyContent="space-between"
				direction="row"
				fontWeight={600}
				fontSize="1.2rem"
			>
				<span>No of Question: {no_of_question}</span>
				<span>Total Marks: 30</span>
			</Stack>
			<Stack
				justifyContent="space-between"
				direction="row"
				fontWeight={600}
				fontSize="1.2rem"
			>
				<span>Attempted: {attempted}</span>
				<span>
					Question Remaining:{" "}
					{no_of_question !== undefined ? no_of_question - attempted : ""}
					{""}
				</span>
			</Stack>
		</Box>
	);
};
