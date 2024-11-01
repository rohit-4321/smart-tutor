import type { FC } from "react";
import style from "./Recommended.module.css";

const topics = [
	"The Rise and Fall of the Roman Empire",
	"French Revolution",
	"The Impact of the Industrial Revolution",
	"Womens Suffrage Movement",
	"French Revolution",
	"The Impact of the Industrial Revolution",
	"Womens Suffrage Movement",
];
type RecommendedType = {
	onRecommendedClick: (topicName: string) => void;
};
export const Recommended: FC<RecommendedType> = ({ onRecommendedClick }) => {
	return (
		<div className={style.container}>
			<div>
				<span className={style.newTopicText}>Try these Topic : </span>
			</div>
			<div className={style.topicContainer}>
				{topics.map((topic) => (
					<Topic
						key={topic}
						name={topic}
						onRecommendedClick={onRecommendedClick}
					/>
				))}
			</div>
		</div>
	);
};

type TopicProps = {
	name: string;
	onRecommendedClick: (topicName: string) => void;
};
const Topic: FC<TopicProps> = ({ name, onRecommendedClick }) => {
	return (
		<button
			type="button"
			className={style.topic}
			onClick={() => onRecommendedClick(name)}
		>
			<span>{name}</span>
		</button>
	);
};
