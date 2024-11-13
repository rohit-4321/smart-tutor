import { useLocation, useNavigate } from "react-router-dom";
import style from "./HomeTab.module.css";
export const HomeTab = () => {
	const navigate = useNavigate();
	const location = useLocation();
	console.log("Current URL:", location);
	const isQuizPage = location.pathname === "/home/quiz";
	const isFlashCardPage = location.pathname === "/home/flashcard";

	return (
		<div className={style.tabContainer}>
			<button
				type="button"
				onClick={() => navigate("quiz")}
				className={style.tab}
				data-selected={isQuizPage ? "true" : ""}
			>
				<span>Quiz</span>
			</button>
			<button
				type="button"
				onClick={() => navigate("flashcard")}
				className={style.tab}
				data-selected={isFlashCardPage ? "true" : ""}
			>
				<span>Flash Card</span>
			</button>
		</div>
	);
};
