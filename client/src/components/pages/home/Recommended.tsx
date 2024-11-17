import type { FC } from "react";
import style from "./Recommended.module.css";
import { Box, Stack, useTheme } from "@mui/material";
import french_revolution from "../../../assets/french_revolution.webp";
import The_Rise_and_Fall_of_the_Roman_Empire from "../../../assets/The Rise and Fall of the Roman Empire.webp";
import the_impact_of_industrial_revolution from "../../../assets/the_impact_of_indutrial_revolution.jpeg";
import women_suffrage_movement from "../../../assets/women_suffrage_movement.jpeg";
import invention_and_discoveries from "../../../assets/invention_and_discoveries.jpeg";
import tech_history from "../../../assets/tech_history.jpeg";

const topics = [
	{
		image: french_revolution,
		name: "French Revolution",
	},
	{
		image: The_Rise_and_Fall_of_the_Roman_Empire,
		name: "The Rise and Fall of the Roman Empire",
	},
	{
		name: "Inventions and Discoveries",
		image: invention_and_discoveries,
	},
	{
		image: women_suffrage_movement,
		name: "Women Suffrage Movement",
	},
	{
		name: "Tech History",
		image: tech_history,
	},
	{
		image: the_impact_of_industrial_revolution,
		name: "The Impact Of Industrial Revolution",
	},
];

type RecommendedType = {
	onRecommendedClick: (topicName: string) => void;
};
export const Recommended: FC<RecommendedType> = ({ onRecommendedClick }) => {
	const theme = useTheme();
	return (
		<Box
			sx={{
				marginY: "3rem",
				marginX: "4rem",
				[theme.breakpoints.down("sm")]: {
					marginX: "1rem",
				},
			}}
		>
			<span className={style.newTopicText}>Try these Topic : </span>
			<Stack
				direction="row"
				sx={{
					paddingX: "1rem",
					paddingY: "2rem",
					overflowX: "auto",
					"&::-webkit-scrollbar": {
						display: "none",
					},
					"-ms-overflow-style": "none",
					"scrollbar-width": "none",
					[theme.breakpoints.down("sm")]: {
						paddingX: "0.5rem",
						paddingY: "1rem",
						gap: 2,
					},
				}}
				gap={5}
			>
				{topics.map((topic) => (
					<Topic
						key={topic.name}
						name={topic.name}
						image={topic.image}
						onRecommendedClick={onRecommendedClick}
					/>
				))}
			</Stack>
		</Box>
	);
};

type TopicProps = {
	name: string;
	image: string;
	onRecommendedClick: (topicName: string) => void;
};
const Topic: FC<TopicProps> = ({ name, image, onRecommendedClick }) => {
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			onClick={() => onRecommendedClick(name)}
			className={style.module}
			style={{
				background: `
          linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0),
            rgba(0, 0, 0, 0.9)
          ),
          url(${image})
        `,
				backgroundSize: "cover",
				backgroundPosition: "center",
				backgroundRepeat: "no-repeat",
			}}
		>
			<header>
				<span>{name}</span>
			</header>
		</div>
	);
};
