import { Box, DialogActions, DialogContent, Stack } from "@mui/material";
import type { FC } from "react";
import { ContainedButton, OutlineButton } from "../../ui/Button";
import style from "./CreateCardDialogAI.module.css";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import flashCard from "../../../api/flashCard.api";
import { enqueueSnackbar } from "notistack";
import bouncing_svg from "../../../assets/bouncing-circles.svg";
type CreateCardDialogAIProp = {
	deck_id: string;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export const CreateCardDialogAI: FC<CreateCardDialogAIProp> = ({
	deck_id,
	setOpen,
}) => {
	const [trigger, { isLoading }] = flashCard.useAddAiGeneratedCardMutation();
	const onAiGenerate = () => {
		trigger({
			deck_id: deck_id,
		})
			.unwrap()
			.then(() => {
				setOpen(false);
			})
			.catch(() => {
				enqueueSnackbar(
					"Error in creating flash card! Make sure you have proper description and name for the deck",
					{
						variant: "error",
						autoHideDuration: 10000,
					},
				);
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
					Please wait this may take a while...
				</span>
				<img src={bouncing_svg} alt="as" width="50px" />
			</Box>
		);
	}
	return (
		<>
			<DialogContent>
				<div className={style.aiText}>
					"Generate an AI-powered flashcard tailored to the chosen deck, using
					the deck's <span>Name</span> and <span>Description</span> to create
					relevant, engaging content. The AI will generate 10 cards focused on
					key concepts for a concise learning experience."
				</div>
				<Stack
					justifyContent="center"
					alignItems="center"
					direction="row"
					mt="1rem"
				>
					<ContainedButton onClick={onAiGenerate}>
						<Stack
							direction="row"
							gap={1}
							justifyContent="center"
							alignItems="center"
						>
							<AutoAwesomeIcon sx={{ fontSize: "1rem" }} />
							<span>Generate card using AI</span>
						</Stack>
					</ContainedButton>
				</Stack>
			</DialogContent>
			<DialogActions>
				<OutlineButton onClick={() => setOpen(false)}>Cancel</OutlineButton>
			</DialogActions>
		</>
	);
};
