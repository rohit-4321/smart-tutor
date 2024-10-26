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
	"French Revolution",
	"The Impact of the Industrial Revolution",
	"Womens Suffrage Movement",
];
export const Recommended = () => {
	return (
		<div className={style.container}>
			<div>
				<span className={style.newTopicText}>Try these Topic : </span>
			</div>
			<div className={style.topicContainer}>
				{topics.map((topic) => (
					<Topic key={topic} name={topic} />
				))}
			</div>
		</div>
	);
};

type TopicProps = {
	name: string;
};
const Topic: FC<TopicProps> = ({ name }) => {
	return (
		<button type="button" className={style.topic}>
			<span>{name}</span>
		</button>
	);
};
