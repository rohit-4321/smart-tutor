import { Button, TextField } from "@mui/material";
import style from "./Home.module.css";
import { Recommended } from "./Recommended";
export const Home = () => {
	return (
		<div className={style.home}>
			<div className={style.textFieldContainer}>
				<TextField
					variant="outlined"
					placeholder="Enter Quiz Topic"
					slotProps={{
						input: {
							style: {
								color: "var(--text-color)", // Label color
								fontSize: "1.2rem", // Label font size
								fontWeight: "bold", // Label font weight
							},
						},
					}}
					sx={{
						width: "40%",
						marginX: "auto",
					}}
				/>
				<Button
					variant="contained"
					disableRipple
					disableElevation
					disableTouchRipple
					sx={{
						backgroundColor: "#E8F0FE",
						color: "var(--text-color)",
						border: "1px solid var(--gray-50)",
						":hover": {
							boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
						},
					}}
				>
					Create Quiz +{" "}
				</Button>
			</div>
			<Recommended />
		</div>
	);
};
