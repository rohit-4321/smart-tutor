import { useParams } from "react-router-dom";
import flashCard from "../../../api/flashCard.api";
import { useEffect, useState, useRef } from "react";
import type { CardResponse } from "../../../api/flashCard.interface";
import { Box, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper/types";
// Import Swiper styles
import "swiper/css";
import { ContainedButton } from "../../ui/Button";
import { Card } from "./Card";

export const FlashCardPlay = () => {
	const { _id } = useParams();
	if (_id === undefined) return;

	const [cards, setCards] = useState<CardResponse[]>([]);
	const swiperRef = useRef<SwiperType>();
	const [progressWidth, setProgressWidth] = useState(0);
	const {
		data: result,
		isLoading,
		isFetching,
	} = flashCard.useGetCardsQuery({
		deck_id: _id,
	});

	useEffect(() => {
		if (result?.result.cards) {
			setCards(result.result.cards);
		}
	}, [result]);

	if (isLoading || isFetching) {
		return <div>Loading.......</div>;
	}
	if (!cards.length) return null;

	const goToNextSlide = () => {
		if (swiperRef.current) {
			console.log(swiperRef.current.activeIndex);
			swiperRef.current.slideNext();
			setProgressWidth(
				(swiperRef.current.width / cards.length) *
					(swiperRef.current.activeIndex + 1),
			);
		}
	};
	console.log(swiperRef.current?.width, progressWidth);

	return (
		<Box
			sx={{
				padding: "2rem",
				height: "100%",
			}}
		>
			<Box
				sx={{
					marginX: "auto",
					maxWidth: "40rem",
					height: "100%",
					display: "flex",
					flexDirection: "column",
					gap: "10px",
				}}
			>
				<Box
					flex={1}
					sx={{
						minHeight: 0,
						border: "1px solid var(--gray-50)",
						overflowX: "hidden",
						borderRadius: "5px",
						boxShadow:
							"0 1px 3px rgba(30, 21, 39, 0.082), 0 2px 3px rgba(22, 22, 22, 0.048)",
					}}
				>
					<div
						style={{
							position: "absolute",
							backgroundColor: "var(--primary-color-light-20)",
							borderRadius: "1px",
							width: `${progressWidth}px`,
							height: "3px",
							transition: "width 0.2s ease",
						}}
					/>
					<Swiper
						style={{ height: "100%" }}
						allowTouchMove={false}
						simulateTouch={false}
						onSwiper={(swiper) => {
							swiperRef.current = swiper; // Save swiper instance to ref
						}}
						spaceBetween={50}
						slidesPerView={1} // Shows only one slide at a time
					>
						{cards.map((card) => (
							<SwiperSlide key={card._id}>
								<Card
									key={card._id}
									_id={card._id}
									answer={card.answer}
									question={card.question}
								/>
								{/* <Box
									sx={{
										padding: "2rem",
										fontSize: "1.5rem",
										textAlign: "center",
									}}
								>
									{card.answer}
								</Box> */}
							</SwiperSlide>
						))}
					</Swiper>
				</Box>
				<Box
					sx={{
						display: "flex",
						gap: "10px",
						height: "3rem",
					}}
				>
					<ContainedButton
						style={{
							backgroundColor: "#973434",
							borderBlockColor: "var(--gray-50)",
							fontWeight: "600",
							borderRadius: "3px",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flex: "1",
						}}
						onClick={goToNextSlide}
					>
						I don't know
					</ContainedButton>
					<ContainedButton
						style={{
							backgroundColor: "#24a150",
							borderBlockColor: "var(--gray-50)",
							fontWeight: "600",
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							borderRadius: "3px",
							flex: "1",
						}}
						onClick={goToNextSlide}
					>
						I know
					</ContainedButton>
				</Box>
			</Box>
		</Box>
	);
};
