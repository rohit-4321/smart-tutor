import { CreateFlashCard } from "../../ui/CreateFlashCard";
import style from "./Flash.module.css";

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
export const Flash = () => {
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
					</tr>
				</thead>
				<tbody>
					{decks.map((deck, index) => (
						<tr key={index}>
							<td>{deck.name}</td>
							<td>{deck.createdAt || "N/A"}</td>
							<td>{deck.noOfCards}</td>
							<td>{deck.lastAttemptAt || "N/A"}</td>
							<td>
								{deck.lastAttemptProgress
									? `${deck.lastAttemptProgress}%`
									: "N/A"}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<CreateFlashCard />
		</div>
	);
};
