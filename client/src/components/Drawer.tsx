import { useEffect, useMemo, type FC } from "react";
import style from "./Drawer.module.css";
import { Box, LinearProgress, Stack } from "@mui/material";
import homeApi from "../api/home.api";
import { Loader } from "./utils/Loading";
import { Link, useLocation } from "react-router-dom";

export const SideDrawer = () => {
	const location = useLocation();

	const isHomeScreen = location.pathname === "/home";
	const currentQuizId = useMemo(() => {
		const arr = location.pathname.split("/").filter(Boolean);
		console.log(arr);
		if (arr[0] === "quiz") return arr[1];
		return "";
	}, [location]);
	const {
		data: allQuiz,
		isError,
		isLoading,
		isFetching,
	} = homeApi.useGetAllQuizTopicQuery(null);

	return (
		<div className={style.drawer}>
			<Stack mx={0.5}>
				<Link
					to="/home"
					className={`${style.homeLink} ${isHomeScreen ? style.selected : ""}`}
				>
					<span>Home</span>
				</Link>
				<div className={style.quizLinksHeading}>
					<span>Quizzes</span>
				</div>
				<Stack gap={0.4} ml={1}>
					{(isLoading || isFetching) && (
						<Box>
							<LinearProgress color="info" />
						</Box>
					)}
					{allQuiz?.result.map((topic) => (
						<Link
							to={`/quiz/${topic._id}`}
							className={`${style.quizLink} ${currentQuizId === topic._id ? style.selected : ""}`}
							key={topic._id}
						>
							<span>{topic.topic}</span>
						</Link>
					))}
				</Stack>
			</Stack>
		</div>
	);
};
