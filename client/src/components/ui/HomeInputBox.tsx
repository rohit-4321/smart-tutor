import { Box } from "@mui/material";
import { useRef, useState, type FC } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import style from "./HomeInputBox.module.css";
type HomeIputBox = {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	error: boolean;
};
export const HomeInputBox: FC<HomeIputBox> = ({ value, onChange, error }) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [isInputFocused, setIsInputFocused] = useState(false);
	return (
		<Box
			sx={{
				position: "relative",
				padding: "1rem 0.5rem 1rem 0rem",
				display: "flex",
				alignItems: "center",
				backgroundColor: "var(--background-color-primary)",
				boxShadow:
					"0 4px 8px rgba(30, 21, 39, 0.082), 0 6px 20px rgba(22, 22, 22, 0.048)",
				borderRadius: "10px",
				borderColor: "var(--gray-900)",

				border: isInputFocused
					? "2px solid var(--primary-color) !important"
					: error
						? "2px solid #f74c4c"
						: "2px solid transparent",
				":hover": {
					border: "2px solid var(--primary-color-light-40)",
				},
				width: "40%",
			}}
		>
			<input
				ref={inputRef}
				value={value}
				onChange={onChange}
				onFocus={() => {
					setIsInputFocused(true);
				}}
				onBlur={() => setIsInputFocused(false)}
				className={style.input}
				placeholder="Enter Your Topic"
			/>
			<KeyboardArrowRightIcon
				sx={{
					fontSize: "2rem",
				}}
			/>
			{error && (
				<span
					style={{
						position: "absolute",
						bottom: -20,
						left: 5,
						color: "red",
						fontSize: "0.8rem",
					}}
				>
					Enter a valid topic
				</span>
			)}
		</Box>
	);
};
