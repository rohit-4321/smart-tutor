import { useParams } from "react-router-dom";
import create_card_svg from "../../../assets/create-card.svg";

import style from "./FlashCard.module.css";
import { CreateCardDialog } from "./CreateCardDialog";
import { useEffect, useState } from "react";
import flashCard from "../../../api/flashCard.api";
import CardDialog from "./CardDialog";
import { Box, LinearProgress } from "@mui/material";
import FlipCard from "./FlipCard";
import type { CardResponse } from "../../../api/flashCard.interface";
import { enqueueSnackbar } from "notistack";

export const FlashCard = () => {
	const { _id } = useParams();
	if (_id === undefined) return;
	const [cards, setCard] = useState<CardResponse[]>([]);
	const {
		data: result,
		isLoading,
		isFetching,
		refetch: refetchCards,
	} = flashCard.useGetCardsQuery({
		deck_id: _id,
	});
	const [deleteCardTrigger, { isLoading: isDeletingCard }] =
		flashCard.useDeleteCardMutation();

	const onCardDelete = (card_id: string) => {
		setCard((prev) => prev.filter((vl) => vl._id !== card_id));
		deleteCardTrigger({
			card_id: card_id,
			deck_id: _id,
		})
			.unwrap()
			.catch(() => {
				refetchCards();
				enqueueSnackbar("Error in deleting card", {
					variant: "error",
					autoHideDuration: 2000,
				});
			});
	};

	useEffect(() => {
		if (result) {
			setCard(result?.result.cards);
		}
	}, [result]);

	const [createCardDialogOpen, setCreateCardDialogOpen] = useState(false);
	const [selectedCard, setSelectedCard] = useState<number>();

	const closeDialog = () => {
		if (!(isLoading || isFetching)) {
			setSelectedCard(undefined);
		}
	};

	return (
		<div>
			<Box sx={{ width: "100%" }}>
				<LinearProgress
					sx={{
						height: "3px",
						visibility:
							isLoading || isFetching || isDeletingCard ? "visible" : "hidden",
						backgroundColor: "var(--primary-color-light-60)",
						"& .MuiLinearProgress-bar": {
							backgroundColor: "var(--primary-color)",
						},
					}}
				/>
			</Box>
			<div className={style.container}>
				<button
					type="button"
					className={style.addCard}
					onClick={() => !isLoading && setCreateCardDialogOpen(true)}
				>
					<img src={create_card_svg} alt="as" width="27px" />
					<span>Add Card</span>
				</button>
				{cards.map((vl, ind) => {
					return (
						<FlipCard
							vl={vl}
							onClick={() => setSelectedCard(ind)}
							key={vl._id}
							deleteCard={onCardDelete}
							isLoading={isDeletingCard || isFetching || isLoading}
						/>
					);
				})}
			</div>
			{createCardDialogOpen && (
				<CreateCardDialog
					deckId={_id}
					open={createCardDialogOpen}
					setOpen={setCreateCardDialogOpen}
				/>
			)}
			{selectedCard !== undefined && (
				<CardDialog
					deckId={_id}
					closeDialog={closeDialog}
					open={selectedCard !== undefined}
					index={selectedCard}
				/>
			)}
		</div>
	);
};
