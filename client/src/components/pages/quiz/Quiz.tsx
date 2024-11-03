import { useParams } from "react-router-dom";
import homeApi from "../../../api/home.api";
import { useEffect } from "react";
import { store, useAppDispatch, useAppSelector } from "../../../redux/store";
import { setQuiz } from "../../../redux/slices/quizSlice";
import { Box, Stack, Button, CircularProgress } from "@mui/material";
import { QuestionList } from "./QuestionList";
import { QuizHeader } from "./QuizHaeader";
import { useSnackbar } from "notistack";
import { QuizLoading } from "./QuizLoading";

export const Quiz = () => {
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useAppDispatch();

	const status = useAppSelector((rd) => rd.quiz.value?.status);

	const { _id } = useParams();
	if (!_id) return;
	const {
		data,
		isFetching: isGetQuizFetching,
		isLoading: isGetQuizLoading,
		isError,
	} = homeApi.useGetQuizQuery({
		_id,
	});
	const [updateQuizTrigger, { isLoading: isUpdateQuizLoading }] =
		homeApi.useUpdateQuizMutation();

	const onSubmit = () => {
		const currQuizState = store.getState().quiz.value;
		if (!currQuizState) {
			return;
		}
		updateQuizTrigger({
			_id,
			quiz: {
				...currQuizState,
				status: "completed",
			},
		})
			.unwrap()
			.then(() => {
				enqueueSnackbar("Quiz Submitted Successfully", { variant: "success" });
			})
			.catch(() => {
				enqueueSnackbar("Problem in saving the quiz", { variant: "error" });
			});
	};
	const onSaveAsDraft = () => {
		const currQuizState = store.getState().quiz.value;

		if (!currQuizState) {
			return;
		}
		updateQuizTrigger({
			_id,
			quiz: currQuizState,
		})
			.unwrap()
			.then(() => {
				enqueueSnackbar("Quiz saved as Draft", { variant: "success" });
			})
			.catch(() => {
				enqueueSnackbar("Problem in saving the quiz", { variant: "error" });
			});
	};
	useEffect(() => {
		if (data) {
			dispatch(setQuiz(data.result.quiz));
		}
	}, [data, dispatch]);
	if (isError) return <div>Error Occurs</div>;
	if (isGetQuizLoading || isGetQuizFetching || isUpdateQuizLoading || !data)
		return <QuizLoading />;
	return (
		<Box mx="3rem" mb="3rem">
			<Box
				sx={{
					maxWidth: "70rem",
					marginX: "auto",
					backgroundColor: "var(--background-color-primary)",
					paddingTop: "2rem",
					paddingBottom: "2rem",
					boxShadow:
						"0 4px 8px rgba(30, 21, 39, 0.082), 0 6px 20px rgba(22, 22, 22, 0.048)",
				}}
			>
				<QuizHeader />
				<Box
					mt="2rem"
					sx={{
						paddingX: "2rem",
					}}
				>
					<QuestionList />
				</Box>
				{status === "completed" ? null : (
					<Stack my="2rem" gap={5} direction="row-reverse">
						<Button variant="outlined" onClick={onSubmit}>
							Submit
						</Button>
						<Button
							variant="contained"
							onClick={onSaveAsDraft}
							disabled={isUpdateQuizLoading}
						>
							Save As Draft
						</Button>
					</Stack>
				)}
			</Box>
		</Box>
	);
};
