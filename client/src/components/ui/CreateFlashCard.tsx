import { useState } from "react";
import style from "./CreateFlashCard.module.css";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	Stack,
	DialogActions,
} from "@mui/material";
import { OutlineButton, ContainedButton } from "./Button";
import { DialogInput } from "./DialogInput";
import flashCard from "../../api/flashCard.api";
import { useSnackbar } from "notistack";
import bouncing_svg from "../../assets/bouncing-circles.svg";
export const CreateFlashCard = () => {
	const { enqueueSnackbar } = useSnackbar();
	const [open, setOpen] = useState(false);
	const [deckName, setDeckName] = useState("");
	const [description, setDescription] = useState("");

	//Validation
	const [deckNameError, setDeckNameError] = useState(false);
	const [deckDescriptionError, setDeckDescriptionError] = useState(false);

	const [createDeckTrigger, { isLoading }] = flashCard.useCreateDeckMutation();

	const onDeckNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 0) setDeckNameError(false);
		setDeckName(e.target.value);
	};
	const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.value.length > 0) setDeckDescriptionError(false);
		setDescription(e.target.value);
	};
	const onCreateNewDeck = () => {
		if (!deckName) {
			setDeckNameError(true);
			return;
		}
		if (!description) {
			setDeckDescriptionError(true);
			return;
		}
		createDeckTrigger({
			cards: [],
			description: description,
			last_attempt_at: "NA",
			last_attempt_score: "NA",
			name: deckName,
		})
			.unwrap()
			.then(() => {
				setOpen(false);
			})
			.catch(() => {
				enqueueSnackbar("Error in creating a deck. Please try later", {
					variant: "error",
					autoHideDuration: 2000,
				});
			});
	};
	if (isLoading) {
		return (
			<>
				<ContainedButton
					type="button"
					className={style.container}
					onClick={() => {
						setOpen(true);
					}}
				>
					Create Deck +{" "}
				</ContainedButton>
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
			</>
		);
	}
	return (
		<>
			<ContainedButton
				type="button"
				className={style.container}
				onClick={() => {
					setOpen(true);
				}}
			>
				Create Deck +{" "}
			</ContainedButton>
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
				<DialogTitle sx={{ fontFamily: "Open Sans" }}>Create Deck</DialogTitle>
				<DialogContent>
					<Stack direction="column" gap={1}>
						<DialogInput
							label="Name"
							type="text"
							error={deckNameError}
							errorLabel="Enter a valid name"
							placeholder="Name"
							value={deckName}
							onChange={onDeckNameChange}
						/>
						<DialogInput
							type="text"
							error={deckDescriptionError}
							errorLabel="Enter valid description "
							label="Description"
							value={description}
							placeholder="Description"
							onChange={onDescriptionChange}
						/>
					</Stack>
				</DialogContent>
				<DialogActions>
					<ContainedButton onClick={() => setOpen(false)}>
						Cancel
					</ContainedButton>
					<ContainedButton onClick={onCreateNewDeck}>Create</ContainedButton>
				</DialogActions>
			</Dialog>
		</>
	);
};
