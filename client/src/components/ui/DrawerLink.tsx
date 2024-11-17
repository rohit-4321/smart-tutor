import { Link, useNavigate } from "react-router-dom";
import style from "./DrawerLink.module.css";
import { useState, type FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	IconButton,
	Stack,
} from "@mui/material";

import { OutlineButton, ContainedButton } from "./Button";
import bouncing_ball from "../../assets/bouncing-circles.svg";
import homeApi from "../../api/home.api";
import { enqueueSnackbar } from "notistack";

type DrawerLinkProps = {
	_id: string;
	currentQuizId: string;
	topic: string;
};
export const DrawerLink: FC<DrawerLinkProps> = ({
	_id,
	currentQuizId,
	topic,
}) => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const [deleteTrigger, { isLoading }] = homeApi.useDeleteQuizMutation();

	const onDelete = () => {
		deleteTrigger({
			quiz_id: _id,
		})
			.unwrap()
			.then(() => {
				setOpen(false);
				if (_id === currentQuizId) navigate("/quiz");
			})
			.catch(() => {
				setOpen(false);
				enqueueSnackbar("Error is deleting this Quiz", {
					variant: "error",
					autoHideDuration: 3000,
				});
			});
	};
	return (
		<>
			<div
				className={`${style.quizLinkContainer} ${currentQuizId === _id ? style.selected : ""}`}
			>
				<Link to={`/quiz/${_id}`} className={style.quizLink}>
					<span>{topic}</span>
				</Link>
				<IconButton className={style.moreIcon} onClick={() => setOpen(true)}>
					<DeleteIcon sx={{ color: "#fc6262" }} />
				</IconButton>
			</div>

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
						"You how sure you want to delete this Quiz?"
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
		</>
	);
};
