import {
	Button,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormLabel,
	Stack,
	TextField,
} from "@mui/material";
import type { FC } from "react";
import homeApi from "../../../api/home.api";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch } from "react-redux";
import { setQuiz } from "../../../redux/slices/quizSlice";
import { useNavigate } from "react-router-dom";

export type NewQuiz = {
	topic: string;
	noOfQuestion: number;
	questionTypes: ("single_choice" | "multiple_choice")[];
};
export type CreateQuizDialogType = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	value: NewQuiz;
	setValue: <T extends keyof NewQuiz>(key: T, value: NewQuiz[T]) => void;
};
const CreateQuizDialog: FC<CreateQuizDialogType> = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { value, setValue, open, setOpen } = props;
	const [createQuizTrigger, { isLoading: isCreateQuizLoading }] =
		homeApi.useCreateQuizMutation();
	const onQuestionNumberChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		const input = e.target;
		let value = input.value.replace(/[^0-9]/g, "");

		if (value.length > 1 && value.startsWith("0")) {
			value = value.slice(1);
		}
		input.value = value;
		if (!/^[0-9]*$/.test(input.value)) {
			console.error(
				"Only positive integers are allowed without leading zeros.",
			);
		} else {
			setValue("noOfQuestion", Number.parseInt(input.value));
		}
	};

	const toggleQuestionType = (
		questionType: "single_choice" | "multiple_choice",
	) => {
		let all = [...value.questionTypes];
		if (all.includes(questionType)) {
			all = all.filter((vl) => vl !== questionType);
		} else {
			all.push(questionType);
		}
		setValue("questionTypes", all);
	};
	const onQuizCreateClicked = () => {
		console.log(value);
		createQuizTrigger({
			no_of_questions: value.noOfQuestion,
			question_types: value.questionTypes,
			topic: value.topic,
		})
			.unwrap()
			.then((res) => {
				console.log(res);
				dispatch(setQuiz(res.result.quiz));
				navigate(`/quiz/${res.result._id}?newQuiz=true`);
			});
	};

	if (isCreateQuizLoading) {
		return (
			<Dialog
				open={open}
				sx={{
					"& .MuiDialog-container": {
						"& .MuiPaper-root": {
							width: "100%",
							maxWidth: "40rem",
							height: "25rem",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							flexDirection: "column",
							gap: "1rem",
						},
					},
				}}
			>
				<span
					style={{
						fontSize: "1.4rem",
						fontWeight: "600",
						color: "var(--text-color)",
					}}
				>
					This may take a while. Please wait!!
				</span>
				<CircularProgress />
			</Dialog>
		);
	}
	return (
		<Dialog
			open={open}
			// onClose={() => setOpen(false)}
			sx={{
				"& .MuiDialog-container": {
					"& .MuiPaper-root": {
						width: "100%",
						maxWidth: "40rem", // Set your width here
						height: "25rem",
					},
				},
			}}
		>
			<DialogTitle>{value.topic}</DialogTitle>
			<DialogContent>
				<Stack direction="column">
					<TextField
						variant="outlined"
						placeholder="Number of Question"
						onChange={onQuestionNumberChange}
					/>
					<FormControl
						required
						component="fieldset"
						sx={{ mt: 3 }}
						variant="standard"
					>
						<FormLabel component="legend">Pick Question Types</FormLabel>
						<FormGroup>
							<FormControlLabel
								control={
									<Checkbox
										checked={value.questionTypes.includes("single_choice")}
										onChange={() => toggleQuestionType("single_choice")}
										name="gilad"
									/>
								}
								label="Single Choice"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={value.questionTypes.includes("multiple_choice")}
										onChange={() => toggleQuestionType("multiple_choice")}
										name="jason"
									/>
								}
								label="Multiple Choice"
							/>
						</FormGroup>
					</FormControl>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setOpen(false)} variant="text">
					Cancel
				</Button>
				<Button onClick={onQuizCreateClicked} variant="outlined">
					{isCreateQuizLoading ? <CircularProgress /> : "Create"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CreateQuizDialog;
