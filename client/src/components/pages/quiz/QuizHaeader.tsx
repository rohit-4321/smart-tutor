import { Box, Stack, useTheme } from "@mui/material";
import { useAppSelector } from "../../../redux/store";

export const QuizHeader = () => {
	const theme = useTheme();
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
				pb: "3rem",
				paddingX: "2rem",
				borderBottom: "1px solid var(--gray-100)",
			}}
		>
			<Stack
				justifyContent="center"
				alignItems="center"
				sx={{
					fontSize: "1.2rem",
					marginY: "2rem",
					[theme.breakpoints.down("sm")]: {
						fontSize: "0.9rem",
						marginTop: "0rem",
					},
				}}
			>
				<h1>{topicName}</h1>
			</Stack>
			<Stack
				mb="2rem"
				justifyContent="space-between"
				direction="row"
				fontWeight={600}
				sx={{
					fontSize: "1.2rem",
					[theme.breakpoints.down("sm")]: {
						fontSize: "0.9rem",
					},
				}}
			>
				<span>No of Question: {no_of_question}</span>
				<span>Total Marks: 30</span>
			</Stack>
			<Stack
				justifyContent="space-between"
				direction="row"
				fontWeight={600}
				sx={{
					fontSize: "1.2rem",
					[theme.breakpoints.down("sm")]: {
						fontSize: "0.9rem",
					},
				}}
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
