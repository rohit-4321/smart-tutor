import type React from "react";
import { type FC, useState } from "react";
import style from "./FlipCard.module.css"; // Assuming you have your styles here
import type { CardResponse } from "../../../api/flashCard.interface";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";

type FlipCardProps = {
	vl: CardResponse;
	onClick: () => void;
	deleteCard: (card_id: string) => void;
	isLoading: boolean;
};

const FlipCard: FC<FlipCardProps> = ({
	onClick,
	vl,
	deleteCard,
	isLoading,
}) => {
	// State to track whether the card is flipped
	const [isFlipped, setIsFlipped] = useState(false);

	const handleFlip = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.stopPropagation();
		setIsFlipped((prev) => !prev);
	};

	const deleteClick = (
		event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
	) => {
		event.stopPropagation();
		if (!isLoading) {
			deleteCard(vl._id);
		}
	};

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			onClick={onClick}
			key={vl._id}
			className={style.item}
			data-flipped={isFlipped ? "true" : "false"}
		>
			<IconButton
				className="delete"
				onClick={deleteClick}
				size="small"
				sx={{
					position: "absolute",
					bottom: 2,
					right: 2,
					color: isFlipped
						? "var(--flash-card-back-font-color)"
						: "var(--flash-card-front-font-color)",
				}}
			>
				<DeleteIcon />
			</IconButton>
			<button
				type="button"
				onClick={handleFlip}
				className={style.flipButton}
				data-flipped={isFlipped ? "true" : "false"}
			>
				Flip
			</button>
			<span>{isFlipped ? vl.answer : vl.question}</span>
		</div>
	);
};

export default FlipCard;
