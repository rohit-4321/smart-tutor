import { Box, DialogActions, DialogContent, Stack } from "@mui/material";
import { useState, type FC } from "react";
import { ContainedButton, OutlineButton } from "../../ui/Button";
import bouncing_svg from "../../../assets/bouncing-circles.svg";
import { DialogInput } from "../../ui/DialogInput";
import { DialogTextArea } from "../../ui/DialogTextArea";
import flashCard from "../../../api/flashCard.api";
import { enqueueSnackbar } from "notistack";

export type CreateCardDialogManualProps = {
	deckId: string;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const CreateCardDialogManual: FC<CreateCardDialogManualProps> = (
	props,
) => {
	// const navigate = useNavigate();
	// const dispatch = useDispatch();
	const { setOpen, deckId } = props;
	const [prompt, setPrompt] = useState("");
	const [answer, setAnswer] = useState("");

	//Validation
	const [promptError, setPromptError] = useState(false);
	const [answerError, setAnswerError] = useState(false);
	const [trigger, { isLoading }] = flashCard.useAddCardMutation();

	const onSave = () => {
		if (prompt) {
			setPromptError(false);
		} else {
			setPromptError(true);
			return;
		}
		if (answer) {
			setAnswerError(false);
		} else {
			setAnswerError(true);
			return;
		}
		trigger({
			deck_id: deckId,
			answer: answer,
			question: prompt,
		})
			.unwrap()
			.then(() => {
				setOpen(false);
			})
			.catch(() => {
				enqueueSnackbar("Error while saving", {
					variant: "error",
					autoHideDuration: 2000,
				});
			});
	};
	if (isLoading) {
		return (
			<Box
				sx={{
					width: "100%",
					height: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "column",
					gap: "1rem",
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
					Saving...
				</span>
				<img src={bouncing_svg} alt="as" width="50px" />
			</Box>
		);
	}
	return (
		<>
			{/* <DialogTitle
				sx={{
					fontFamily: "Open Sans",
					color: "var(--gray-500)",
					fontWeight: "600",
				}}
			>
				Add Card
			</DialogTitle> */}
			<DialogContent>
				<Stack direction="column" gap={2}>
					<DialogInput
						error={promptError}
						errorLabel="Enter a valid value"
						label=""
						type="text"
						placeholder="Prompt"
						value={prompt}
						onChange={(e) => {
							setPrompt(e.target.value);
						}}
					/>

					<DialogTextArea
						label=""
						error={answerError}
						errorLabel="Enter a valid value"
						style={{ height: "100px" }}
						placeholder="Answer"
						value={answer}
						onChange={(e) => {
							setAnswer(e.target.value);
						}}
					/>
				</Stack>
			</DialogContent>
			<DialogActions>
				<OutlineButton onClick={() => setOpen(false)}>Cancel</OutlineButton>
				<ContainedButton onClick={onSave}>Save</ContainedButton>
			</DialogActions>
		</>
	);
};

export default CreateCardDialogManual;
