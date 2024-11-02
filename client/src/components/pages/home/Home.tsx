import { Button, TextField } from "@mui/material";
import style from "./Home.module.css";
import { Recommended } from "./Recommended";
import CreateQuizDialog, { type NewQuiz } from "./CreateQuizDialog";
import { useCallback, useState } from "react";
// import userApi from "../../../api/user.api";
export const Home = () => {
	const [dialogOpen, setIsDialogOpen] = useState(false);
	const [quizAttr, _setQuizAttr] = useState<NewQuiz>({
		topic: "",
		noOfQuestion: 0,
		questionTypes: [],
	});

	const setQuizAttr = useCallback(
		<T extends keyof NewQuiz>(key: T, value: NewQuiz[T]) => {
			_setQuizAttr((prev) => ({
				...prev,
				[key]: value,
			}));
		},
		[],
	);

	const onRecommendedClick = (topicName: string) => {
		console.log("Clicked");
		setQuizAttr("topic", topicName);
		setIsDialogOpen(true);
	};

	return (
		<div className={style.home}>
			<CreateQuizDialog
				open={dialogOpen}
				setOpen={setIsDialogOpen}
				value={quizAttr}
				setValue={setQuizAttr}
			/>
			<div className={style.textFieldContainer}>
				<TextField
					variant="outlined"
					placeholder="Enter Quiz Topic"
					value={quizAttr.topic}
					onChange={(e) => setQuizAttr("topic", e.target.value)}
					slotProps={{
						input: {
							style: {
								color: "var(--text-color)", // Label color
								fontSize: "1.2rem", // Label font size
								fontWeight: "bold", // Label font weight
							},
						},
					}}
					sx={{
						width: "40%",
						marginX: "auto",
					}}
				/>
				<Button
					variant="contained"
					disableRipple
					disableElevation
					disableTouchRipple
					onClick={() => setIsDialogOpen(true)}
					sx={{
						backgroundColor: "#E8F0FE",
						color: "var(--text-color)",
						border: "1px solid var(--gray-50)",
						":hover": {
							boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
						},
					}}
				>
					Create Quiz +{" "}
				</Button>
			</div>
			<Recommended onRecommendedClick={onRecommendedClick} />
		</div>
	);
};
