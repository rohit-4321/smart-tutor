import DeleteIcon from "@mui/icons-material/Delete";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	Tooltip,
} from "@mui/material";
import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { ContainedButton, OutlineButton } from "../../ui/Button";
import flashCard from "../../../api/flashCard.api";
import { enqueueSnackbar } from "notistack";
import bouncing_ball from "../../../assets/bouncing-circles.svg";
import type { ResponseDeckItem } from "../../../api/flashCard.interface";

export const ActionMenu: FC<{
	deck: ResponseDeckItem;
	onDeckEdit: (tmp: ResponseDeckItem) => void;
}> = ({ deck, onDeckEdit }) => {
	const { _id: deck_id } = deck;
	const navigate = useNavigate();
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deleteDeckTrigger, { isLoading: isDeleting }] =
		flashCard.useDeleteDeckMutation();
	const onDelete = () => {
		deleteDeckTrigger(deck_id)
			.unwrap()
			.then(() => {
				setDeleteDialogOpen(false);
			})
			.catch(() => {
				enqueueSnackbar("Error in deleting the record", {
					variant: "error",
					autoHideDuration: 2000,
				});
			});
	};
	const onView = () => {
		navigate(`${deck_id}`);
	};
	const onPlayClick = () => {
		if (deck.cards_count === 0) {
			enqueueSnackbar(
				"You can't practice with this deck. Card count is 0. Add some cards to the deck.",
				{
					variant: "info",
					autoHideDuration: 7000,
					anchorOrigin: {
						horizontal: "center",
						vertical: "top",
					},
				},
			);
		} else {
			navigate(`play/${deck_id}`);
		}
	};
	return (
		<Stack direction="row" gap={2}>
			<DeleteDeckDialog
				isLoading={isDeleting}
				open={deleteDialogOpen}
				onDelete={onDelete}
				setOpen={setDeleteDialogOpen}
			/>
			<Tooltip placement="top" title="Practice">
				<button
					onClick={onPlayClick}
					type="button"
					style={{
						all: "unset",
						cursor: "pointer",
						backgroundColor: "#6bc56b",
						padding: "3px 5px",
						borderRadius: "3px",
					}}
				>
					<MenuBookIcon sx={{ color: "white", fontSize: "1.2rem" }} />
				</button>
			</Tooltip>
			<Tooltip placement="top" title="Edit">
				<button
					type="button"
					onClick={() => onDeckEdit(deck)}
					style={{
						all: "unset",
						cursor: "pointer",
						backgroundColor: "#dfb40b",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						padding: "3px 5px",
						borderRadius: "3px",
					}}
				>
					<EditIcon sx={{ color: "white", fontSize: "1.2rem" }} />
				</button>
			</Tooltip>
			<Tooltip placement="top" title="View">
				<button
					type="button"
					onClick={onView}
					style={{
						all: "unset",
						cursor: "pointer",
						backgroundColor: "#50b6cf",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						padding: "3px 5px",
						borderRadius: "3px",
					}}
				>
					<RemoveRedEyeIcon sx={{ color: "white", fontSize: "1.2rem" }} />
				</button>
			</Tooltip>
			<Tooltip placement="top" title="Delete">
				<button
					type="button"
					onClick={() => setDeleteDialogOpen(true)}
					style={{
						all: "unset",
						cursor: "pointer",
						backgroundColor: "#E57373",
						padding: "3px 5px",
						borderRadius: "3px",
					}}
				>
					<DeleteIcon sx={{ color: "white", fontSize: "1.2rem" }} />
				</button>
			</Tooltip>
		</Stack>
	);
};
type DeleteDeckDialogProps = {
	open: boolean;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	setOpen: any;
	isLoading?: boolean;
	onDelete: () => void;
};
const DeleteDeckDialog: FC<DeleteDeckDialogProps> = ({
	onDelete,
	open,
	setOpen,
	isLoading,
}) => {
	return (
		<Dialog open={open} onClose={() => setOpen(false)}>
			<DialogTitle
				sx={{
					fontFamily: "Open Sans",
					fontWeight: "600",
					color: "var(--gray-600)",
				}}
			>
				Delete
			</DialogTitle>
			<DialogContent sx={{ color: "var(--gray-500)", minWidth: "30rem" }}>
				{isLoading ? (
					<Stack justifyContent="center" alignItems={"center"}>
						<img src={bouncing_ball} alt="as" width="35px" />
					</Stack>
				) : (
					"You how sure you want to delete this Deck?"
				)}
			</DialogContent>
			<DialogActions>
				<OutlineButton onClick={() => setOpen(false)}>Cancel</OutlineButton>
				<ContainedButton
					style={{
						backgroundColor: "#c75454",
					}}
					disabled={isLoading}
					onClick={onDelete}
				>
					Delete
				</ContainedButton>
			</DialogActions>
		</Dialog>
	);
};
