import {
	Dialog,
	DialogTitle,
	DialogContent,
	Stack,
	DialogActions,
} from "@mui/material";
import { ContainedButton } from "../../ui/Button";
import { DialogInput } from "../../ui/DialogInput";
import type { ResponseDeckItem } from "../../../api/flashCard.interface";
import { useState, type FC } from "react";
import flashCard from "../../../api/flashCard.api";
import { enqueueSnackbar } from "notistack";
import bouncing_svg from "../../../assets/bouncing-circles.svg";

type EditDeckProps = {
	deck: ResponseDeckItem;
	open: boolean;
	onClose: any;
};
export const EditDeck: FC<EditDeckProps> = ({
	deck: deckInput,
	open,
	onClose,
}) => {
	const [deck, setDeck] = useState<ResponseDeckItem>({ ...deckInput });
	//Validation
	const [deckNameError, setDeckNameError] = useState(false);
	const [deckDescriptionError, setDeckDescriptionError] = useState(false);

	const [trigger, { isLoading }] = flashCard.useUpdateDeckMutation();

	const onDeckNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 0) setDeckNameError(false);
		setDeck((prev) => ({ ...prev, name: e.target.value }));
	};
	const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 0) setDeckDescriptionError(false);
		setDeck((prev) => ({ ...prev, description: e.target.value }));
	};
	const onSave = () => {
		if (!deck.name) {
			setDeckNameError(true);
			return;
		}
		if (!deck.description) {
			setDeckDescriptionError(true);
			return;
		}
		trigger({
			deck_id: deck._id,
			name: deck.name,
			description: deck.description,
		})
			.unwrap()
			.then(() => {
				onClose();
			})
			.catch(() => {
				enqueueSnackbar("Error in saving Deck Name and Description", {
					variant: "error",
					autoHideDuration: 2000,
				});
				onClose();
			});
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
			<DialogTitle sx={{ fontFamily: "Open Sans" }}>Edit Deck</DialogTitle>
			<DialogContent>
				<Stack direction="column" gap={1}>
					<DialogInput
						label="Name"
						type="text"
						error={deckNameError}
						errorLabel="Enter a valid name"
						placeholder="Name"
						value={deck.name}
						onChange={onDeckNameChange}
					/>
					<DialogInput
						type="text"
						error={deckDescriptionError}
						errorLabel="Enter valid description "
						label="Description"
						value={deck.description}
						placeholder="Description"
						onChange={onDescriptionChange}
					/>
				</Stack>
			</DialogContent>
			<DialogActions>
				<ContainedButton onClick={onClose}>Cancel</ContainedButton>
				<ContainedButton onClick={onSave}>Save</ContainedButton>
			</DialogActions>
		</Dialog>
	);
};
