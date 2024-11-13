import { useState, type FC } from "react";
import style from "./Card.module.css";
import type { CardResponse } from "../../../api/flashCard.interface";
import { ContainedButton } from "../../ui/Button";

export const Card: FC<CardResponse> = (props) => {
	const [isAnswerVisible, setIsAnswerVisible] = useState(false);
	const { _id, answer, question } = props;
	return (
		<div className={style.container} key={_id}>
			<div className={style.question}>
				<span>{question}</span>
			</div>
			{isAnswerVisible && (
				<div className={style.answer}>
					<span>{answer}</span>
				</div>
			)}
			<div
				style={{
					position: "absolute",
					width: "100%",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					bottom: "3px",
				}}
			>
				<ContainedButton
					style={{ padding: "2px 6px", borderRadius: "3px" }}
					onClick={() => setIsAnswerVisible((prev) => !prev)}
				>
					{isAnswerVisible ? "Hide Answer" : "Show Answer"}
				</ContainedButton>
			</div>
		</div>
	);
};
