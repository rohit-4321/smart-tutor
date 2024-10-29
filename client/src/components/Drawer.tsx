import { useMemo, type FC } from "react";
import style from "./Drawer.module.css";
import { Box, Stack } from "@mui/material";
import homeApi from "../api/home.api";
import { Loader } from "./utils/Loading";
import { useLocation } from "react-router-dom";
type SideDrawerProps = {
	open: boolean;
};

export const SideDrawer: FC<SideDrawerProps> = (props) => {
	const location = useLocation();

	const isHomeScreen = location.pathname === "/home";
	const currentQuizId = useMemo(() => {
		const arr = location.pathname.split("/").filter(Boolean);
		console.log(arr);
		if (arr[0] === "quiz") return arr[1];
		return "";
	}, [location]);
	console.log(currentQuizId);
	const {
		data: allQuiz,
		isError,
		isLoading,
		isFetching,
	} = homeApi.useGetAllQuizTopicQuery(null);
	return (
		<div className={style.drawer}>
			<Stack mx={0.5}>
				<a
					href="/home"
					className={`${style.homeLink} ${isHomeScreen ? style.selected : ""}`}
				>
					<span>Home</span>
				</a>
				<div className={style.quizLinksHeading}>
					<span>Quizzes</span>
				</div>
				<Stack gap={0.4} ml={1}>
					{(isLoading || isFetching) && (
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								height: "300px",
							}}
						>
							<Loader />
						</Box>
					)}
					{allQuiz?.result.map((topic) => (
						<a
							href={`/quiz/${topic._id}`}
							className={`${style.quizLink} ${currentQuizId === topic._id ? style.selected : ""}`}
							key={topic._id}
						>
							<span>{topic.topic}</span>
						</a>
					))}
				</Stack>
			</Stack>
		</div>
	);
};
