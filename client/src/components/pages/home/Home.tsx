import { Box } from "@mui/material";
import style from "./Home.module.css";
import { Recommended } from "./Recommended";
import CreateQuizDialog, { type NewQuiz } from "./CreateQuizDialog";
import { useCallback, useState } from "react";
import { HomeInputBox } from "../../ui/HomeInputBox";
import { useAppSelector } from "../../../redux/store";
import { ContainedButton } from "../../ui/Button";
export const Home = () => {
	const displayName = useAppSelector((rd) => rd.user.value?.name);
	const name = displayName ? displayName.split(" ")[0] : "";
	const [dialogOpen, setIsDialogOpen] = useState(false);
	const [quizAttr, _setQuizAttr] = useState<NewQuiz>({
		topic: "",
		noOfQuestion: 5,
		questionTypes: ["multiple_choice", "single_choice"],
	});
	const [quizInputError, setQuizIinputError] = useState(false);

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

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuizAttr("topic", e.target.value);
		setQuizIinputError(false);
	};

	const onCreateQuizButtonClick = () => {
		if (quizAttr.topic.length <= 0) {
			setQuizIinputError(true);
		} else {
			setIsDialogOpen(true);
		}
	};

	return (
		<>
			<CreateQuizDialog
				open={dialogOpen}
				setOpen={setIsDialogOpen}
				value={quizAttr}
				setValue={setQuizAttr}
			/>
			<div className={style.textFieldContainer}>
				<Box>
					<span style={{ fontSize: "1.7rem" }}>
						{name
							? `Hii 👋 ${name.split(" ")[0]}! You have somthing in mind?`
							: "You have somthing in mind ?"}
					</span>
				</Box>
				<HomeInputBox
					value={quizAttr.topic}
					onChange={onInputChange}
					error={quizInputError}
				/>
				<ContainedButton onClick={onCreateQuizButtonClick}>
					Create Quiz +{" "}
				</ContainedButton>
			</div>
			<Recommended onRecommendedClick={onRecommendedClick} />
		</>
	);
};
