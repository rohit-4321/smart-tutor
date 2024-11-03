import {
	Box,
	Checkbox,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControlLabel,
	Stack,
	TextField,
} from "@mui/material";
import type { FC } from "react";
import homeApi from "../../../api/home.api";
import { useDispatch } from "react-redux";
import { setQuiz } from "../../../redux/slices/quizSlice";
import { useNavigate } from "react-router-dom";
import { ContainedButton, OutlineButton } from "../../ui/Button";
import bouncing_svg from "../../../assets/bouncing-circles.svg";
import { DialogInput } from "../../ui/DialogInput";

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
						color: "var(--gray-500)",
						fontFamily: "inherit",
					}}
				>
					This may take a while. Please wait!!
				</span>
				<img src={bouncing_svg} alt="as" width="50px" />
			</Dialog>
		);
	}
	return (
		<Dialog
			open={open}
			sx={{
				"& .MuiDialog-container": {
					"& .MuiPaper-root": {
						width: "100%",
						maxWidth: "40rem",
						height: "25rem",
					},
				},
			}}
		>
			<DialogTitle sx={{ fontFamily: "Open Sans" }}>{value.topic}</DialogTitle>
			<DialogContent>
				<Stack direction="column">
					{/* <TextField
						type="number"
						variant="outlined"
						placeholder="Number of Question"
						onChange={onQuestionNumberChange}
					/> */}
					<DialogInput
						type="number"
						placeholder="Number of Question"
						onChange={onQuestionNumberChange}
					/>
					<Box my="1rem">
						<span>Pick Question Type: </span>
						<Stack>
							<FormControlLabel
								control={
									<Checkbox
										style={{ color: "var(--primary-color)" }}
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
										style={{ color: "var(--primary-color)" }}
										checked={value.questionTypes.includes("multiple_choice")}
										onChange={() => toggleQuestionType("multiple_choice")}
										name="jason"
									/>
								}
								label="Multiple Choice"
							/>
						</Stack>
					</Box>
				</Stack>
			</DialogContent>
			<DialogActions>
				<OutlineButton onClick={() => setOpen(false)}>Cancel</OutlineButton>
				<ContainedButton onClick={onQuizCreateClicked}>Create</ContainedButton>
			</DialogActions>
		</Dialog>
	);
};

export default CreateQuizDialog;
