import { useMemo } from "react";
import style from "./Drawer.module.css";
import { Box, LinearProgress, Stack } from "@mui/material";
import homeApi from "../api/home.api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogoutButton } from "./ui/LogoutButton";
// import userApi from "../api/user.api";

export const SideDrawer = () => {
	const location = useLocation();
	const navigate = useNavigate();
	// const [
	// 	trigger,
	// 	{ isLoading: isLogOutLoading, isFetching: isLogoutFetching },
	// ] = userApi.useLazyLogoutQuery();
	const isHomeScreen = location.pathname === "/quiz";
	const isFlashCardScreen = location.pathname.startsWith("/flashcard");
	const currentQuizId = useMemo(() => {
		const arr = location.pathname.split("/").filter(Boolean);
		console.log(arr);
		if (arr[0] === "quiz") return arr[1];
		return "";
	}, [location]);
	const {
		data: allQuiz,
		isLoading,
		isFetching,
	} = homeApi.useGetAllQuizTopicQuery(null);

	const logOut = () => {
		localStorage.setItem("authToken", "");
		navigate("/login");
		// trigger(null)
		// 	.unwrap()
		// 	.finally(() => {
		// 		navigate("/login");
		// 	});
	};

	return (
		<div className={style.drawer}>
			<Box
				mx={0.5}
				sx={{
					display: "flex",
					flexDirection: "column",
					height: "100%",
				}}
			>
				<Link
					to="/quiz"
					className={`${style.homeLink} ${isHomeScreen ? style.selected : ""}`}
				>
					<span>Home</span>
				</Link>
				<Link
					to="/flashcard"
					className={`${style.homeLink} ${isFlashCardScreen ? style.selected : ""}`}
				>
					<span>Flash Card</span>
				</Link>
				<div className={style.quizLinksHeading}>
					<span>Quizzes</span>
				</div>
				<Stack
					gap={0.4}
					ml={1}
					overflow="auto"
					sx={{ flexGrow: 1, overflow: "auto" }}
				>
					{(isLoading || isFetching) && (
						<Box>
							<LinearProgress
								sx={{
									backgroundColor: "var(--primary-color-light-60)",
									"& .MuiLinearProgress-bar": {
										backgroundColor: "var(--primary-color)",
									},
								}}
							/>
						</Box>
					)}
					{allQuiz?.result.map((topic) => (
						<div
							key={topic._id}
							className={`${style.quizLinkContainer} ${currentQuizId === topic._id ? style.selected : ""}`}
						>
							<Link to={`/quiz/${topic._id}`} className={style.quizLink}>
								<span>{topic.topic}</span>
							</Link>
						</div>
					))}
				</Stack>
				<LogoutButton onClick={logOut} />
			</Box>
		</div>
	);
};
