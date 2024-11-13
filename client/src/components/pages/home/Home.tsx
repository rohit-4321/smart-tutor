import { Box, Button } from "@mui/material";
import style from "./Home.module.css";
import { Recommended } from "./Recommended";
import CreateQuizDialog, { type NewQuiz } from "./CreateQuizDialog";
import { useCallback, useState } from "react";
import { HomeInputBox } from "../../ui/HomeInputBox";
import { useAppSelector } from "../../../redux/store";
import { HomeTab } from "../../ui/HomeTab";
export const Home = () => {
	const userName = useAppSelector((rd) => rd.user.value?.given_name);
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
		// <div className={style.home}>
		<>
			{/* <HomeTab /> */}
			<CreateQuizDialog
				open={dialogOpen}
				setOpen={setIsDialogOpen}
				value={quizAttr}
				setValue={setQuizAttr}
			/>
			<div className={style.textFieldContainer}>
				<Box sx={{}}>
					<span style={{ fontSize: "1.7rem" }}>
						{userName
							? `Hii 👋 ${userName}! You have somthing in mind?`
							: "You have somthing in mind ?"}
					</span>
				</Box>
				<HomeInputBox
					value={quizAttr.topic}
					onChange={(e) => setQuizAttr("topic", e.target.value)}
				/>
				<Button
					variant="contained"
					disableRipple
					disableElevation
					disableTouchRipple
					onClick={() => setIsDialogOpen(true)}
					sx={{
						backgroundColor: "var(--primary-color-light-80)",
						color: "var(--text-color)",
						border: "1px solid var(--gray-100)",
						boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
						":hover": {
							boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
						},
					}}
				>
					Create Quiz +{" "}
				</Button>
			</div>
			<Recommended onRecommendedClick={onRecommendedClick} />
		</>
		// </div>
	);
};
