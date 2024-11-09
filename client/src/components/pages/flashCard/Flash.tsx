import flashCard from "../../../api/flashCard.api";
import { CreateFlashCard } from "../../ui/CreateFlashCard";
import style from "./Flash.module.css";
import { ActionMenu } from "./ActionMenu";
import { useNavigate } from "react-router-dom";

const decks = [
	{
		name: "Science Basics",
		createdAt: "2024-11-01",
		noOfCards: 20,
		lastAttemptAt: "2024-11-05",
		lastAttemptProgress: 80,
	},
	{
		name: "Math Essentials",
		createdAt: "2024-10-20",
		noOfCards: 15,
		lastAttemptAt: null,
		lastAttemptProgress: null,
	},
	// Add more deck data as needed
];

function formatDate(dateStr: string) {
	const date = new Date(dateStr);

	const day = String(date.getUTCDate()).padStart(2, "0");
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const year = String(date.getUTCFullYear()).slice(2);

	return `${day}-${month}-${year}`;
}

export const Flash = () => {
	const { data, isLoading, isFetching } = flashCard.useGetDecksQuery(null);
	const navigate = useNavigate();
	console.log(data);
	const onPracticeClick = (_id: string) => {
		console.log("practice", _id);
	};
	const onListItemClicked = (_id: string) => {
		console.log("item clicked", _id);
	};
	return (
		<div className={style.container}>
			<table className={style.deckTable}>
				<thead>
					<tr>
						<th>Deck Name</th>
						<th>Created At</th>
						<th>No of Cards</th>
						<th>Last Attempt At</th>
						<th>Last Attempt Progress (%)</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{data?.result.map((deck) => (
						// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
						<tr
							onClickCapture={() => {
								navigate(`${deck._id}`);
							}}
							key={deck._id}
							onClick={() => {
								onListItemClicked(deck._id);
							}}
						>
							<td>{deck.name}</td>
							<td>{formatDate(deck.created_at)}</td>
							<td>{deck.cards_count}</td>
							<td>
								{deck.last_attempt_at !== "NA"
									? formatDate(deck.last_attempt_at)
									: "NA"}
							</td>
							<td>
								{typeof deck.last_attempt_score === "number"
									? `${deck.last_attempt_score}%`
									: "NA"}
							</td>
							<td>
								<ActionMenu />
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<CreateFlashCard />
		</div>
	);
};
