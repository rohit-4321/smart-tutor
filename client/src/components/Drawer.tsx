import type { FC } from "react";
import style from "./Drawer.module.css";
import { Box, Stack } from "@mui/material";
import homeApi from "../api/home.api";
import { Loader } from "./utils/Loading";
type SideDrawerProps = {
	open: boolean;
};
const allTopics = [
	{
		topic: "French Revolution",
		_id: "asdasd",
	},
	{
		topic: "The Rise and Fall of the Roman Empire",
		_id: "23",
	},
	{
		topic: "The Impact of the Industrial Revolution",
		_id: "34",
	},
	{
		topic: "Womens Suffrage Movement",
		_id: "67",
	},
	{
		topic: "Computer Architecture and Working",
		_id: "87",
	},
];
export const SideDrawer: FC<SideDrawerProps> = (props) => {
	const { open } = props;
	const {
		data: allQuiz,
		isError,
		isLoading,
		isFetching,
	} = homeApi.useGetAllQuizTopicQuery(null);
	console.log(open);
	return (
		<div className={style.drawer}>
			<Stack mx={0.5}>
				<a href="/home" className={style.homeLink}>
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
						<a href="/asd" className={style.quizLink} key={topic._id}>
							<span>{topic.topic}</span>
						</a>
					))}
				</Stack>
			</Stack>
		</div>
	);
};
