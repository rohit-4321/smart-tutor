import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { motion } from "framer-motion";
import create_card_svg from "../../../assets/create-card.svg";

import style from "./Deck.module.css";
import { CreateCardDialog } from "./CreateCardDialog";
import { useEffect, useState } from "react";
import flashCard from "../../../api/flashCard.api";
import CardDialog from "./CardDialog";
import { Box, LinearProgress } from "@mui/material";

export const Deck = () => {
	const { _id } = useParams();
	if (_id === undefined) return;
	const {
		data: result,
		isLoading,
		isFetching,
		// refetch,
	} = flashCard.useGetCardsQuery({
		deck_id: _id,
	});

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
						visibility: isLoading || isFetching ? "visible" : "hidden",
						backgroundColor: "var(--primary-color-light-60)",
						"& .MuiLinearProgress-bar": {
							backgroundColor: "var(--primary-color)",
						},
					}}
				/>
			</Box>
			<div className={style.container}>
				<motion.button
					layoutId="create"
					className={style.addCard}
					onClick={() => !isLoading && setCreateCardDialogOpen(true)}
				>
					<img src={create_card_svg} alt="as" width="27px" />
					<span>Add Card</span>
				</motion.button>
				{result?.result.cards.map((vl, ind) => {
					return (
						<motion.div
							onClick={() => setSelectedCard(ind)}
							key={vl._id}
							className={style.item}
						>
							<span className={style.itemQuestion}>{vl.question}</span>
							<span className={style.itemAnswer}>{vl.answer}</span>
						</motion.div>
					);
				})}
			</div>
			<CreateCardDialog
				deckId={_id}
				open={createCardDialogOpen}
				setOpen={setCreateCardDialogOpen}
			/>
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
