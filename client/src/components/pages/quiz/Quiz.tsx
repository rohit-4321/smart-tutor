import { useParams } from "react-router-dom";
import homeApi from "../../../api/home.api";
import { useEffect } from "react";
import { store, useAppDispatch } from "../../../redux/store";
import { setQuiz } from "../../../redux/slices/quizSlice";
import { Box, Stack, Button, CircularProgress } from "@mui/material";
import { QuestionList } from "./QuestionList";
import { QuizHeader } from "./QuizHaeader";
import { useSnackbar } from "notistack";

export const Quiz = () => {
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useAppDispatch();

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
				enqueueSnackbar("Quiz saved as Draft");
			})
			.catch(() => {
				enqueueSnackbar("Problem in saving the quiz");
			});
	};
	useEffect(() => {
		if (data) {
			dispatch(setQuiz(data.result.quiz));
		}
	}, [data, dispatch]);
	if (isError) return <div>Error Occurs</div>;
	if (isGetQuizLoading || isGetQuizFetching || !data)
		return <div>Loading..</div>;
	return (
		<Box mx="3rem">
			<QuizHeader />
			<Box mt="2rem">
				<QuestionList />
			</Box>

			<Stack my="2rem" gap={5} direction="row-reverse">
				<Button variant="outlined">Submit</Button>
				<Button
					variant="contained"
					onClick={onSaveAsDraft}
					disabled={isUpdateQuizLoading}
				>
					{isUpdateQuizLoading ? <CircularProgress /> : "Save As Draft"}
				</Button>
			</Stack>
		</Box>
	);
};
