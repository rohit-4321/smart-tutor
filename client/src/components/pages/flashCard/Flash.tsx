import flashCard from "../../../api/flashCard.api";
import { CreateFlashCard } from "../../ui/CreateFlashCard";
import style from "./Flash.module.css";
import { ActionMenu } from "./ActionMenu";
import { CircularProgress, Stack } from "@mui/material";
import { EditDeck } from "./EditDeckDialog";
import { useState } from "react";
import type { ResponseDeckItem } from "../../../api/flashCard.interface";
import { NoRowOverlay } from "../../ui/NoRowOverlay";

function formatDate(dateStr: string) {
	const date = new Date(dateStr);
	const day = String(date.getUTCDate()).padStart(2, "0");
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const year = String(date.getUTCFullYear()).slice(2);

	return `${day}-${month}-${year}`;
}

export const Flash = () => {
	const { data, isLoading, isFetching } = flashCard.useGetDecksQuery(null);
	const [currentEditDeck, setCurrentEditDeck] = useState<ResponseDeckItem>();

	const onDeckEdit = (tmp: ResponseDeckItem) => {
		setCurrentEditDeck(tmp);
	};

	const onDeckClose = () => {
		setCurrentEditDeck(undefined);
	};
	if (isFetching || isLoading) {
		return (
			<div className={style.container}>
				<Stack
					width="100%"
					sx={{}}
					height="500px"
					justifyContent="center"
					alignItems="center"
				>
					<CircularProgress />
				</Stack>
			</div>
		);
	}
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
						<th data-type="action">Actions</th>
					</tr>
				</thead>

				<tbody>
					{data?.result.map((deck) => (
						<tr key={deck._id}>
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
								<ActionMenu deck={deck} onDeckEdit={onDeckEdit} />
							</td>
						</tr>
					))}
					{data?.result.length === 0 && (
						<tr>
							<td colSpan={6}>
								<Stack
									justifyContent="center"
									alignItems="center"
									height="10rem"
								>
									<NoRowOverlay />
								</Stack>
							</td>
						</tr>
					)}
				</tbody>
			</table>
			<CreateFlashCard />
			{currentEditDeck && (
				<EditDeck open={true} onClose={onDeckClose} deck={currentEditDeck} />
			)}
		</div>
	);
};
