import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
} from "@mui/material";
import type { FC } from "react";
import { useDispatch } from "react-redux";
import { ContainedButton, OutlineButton } from "../../ui/Button";
import bouncing_svg from "../../../assets/bouncing-circles.svg";
import { DialogInput } from "../../ui/DialogInput";
import { DialogTextArea } from "../../ui/DialogTextArea";
import flashCard from "../../../api/flashCard.api";
import { enqueueSnackbar } from "notistack";
import { useAppSelector } from "../../../redux/store";
import { updateCard } from "../../../redux/slices/flashCardSlice";

export type CardDialogProps = {
	index: number;
	deckId: string;
	open: boolean;
	closeDialog: () => void;
};
export const CardDialog: FC<CardDialogProps> = (props) => {
	const dispatch = useDispatch();
	const { open, closeDialog, index, deckId } = props;
	const card = useAppSelector((rd) => rd.flashCard.data[index]);
	const [trigger, { isLoading }] = flashCard.useUpdateCardMutation();
	const onSave = () => {
		trigger({
			card_id: card._id,
			deck_id: deckId,
			...card,
		})
			.unwrap()
			.catch(() => {
				enqueueSnackbar("Error while saving", {
					variant: "error",
					autoHideDuration: 2000,
				});
			});
	};
	const onPromptChange = (value: string) => {
		dispatch(
			updateCard({
				index,
				answer: card.answer,
				question: value,
			}),
		);
	};
	const onAnswerChange = (value: string) => {
		dispatch(
			updateCard({
				index,
				question: card.question,
				answer: value,
			}),
		);
	};

	if (isLoading) {
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
					Saving...
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
			<DialogTitle
				sx={{
					fontFamily: "Open Sans",
					color: "var(--gray-500)",
					fontWeight: "600",
				}}
			>
				Card
			</DialogTitle>
			<DialogContent>
				<Stack direction="column" gap={3}>
					<DialogInput
						label=""
						type="text"
						placeholder="Prompt"
						value={card.question}
						onChange={(e) => {
							onPromptChange(e.target.value);
						}}
					/>

					<DialogTextArea
						label=""
						style={{ height: "100px" }}
						placeholder="Answer"
						value={card.answer}
						onChange={(e) => {
							onAnswerChange(e.target.value);
						}}
					/>
				</Stack>
			</DialogContent>
			<DialogActions>
				<OutlineButton onClick={() => closeDialog()}>Cancel</OutlineButton>
				<ContainedButton onClick={onSave}>Save</ContainedButton>
			</DialogActions>
		</Dialog>
	);
};

export default CardDialog;
