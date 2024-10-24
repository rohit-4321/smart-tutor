import { Button } from "@mui/material";
import style from "./NoGroupPresent.module.css";
export const NoGroupPresent = () => {
	return (
		<div className={style.noGroupPresentSection}>
			<div className={style.container}>
				<span>No Group Present</span>
				<div>
					<Button variant="outlined">Create One +</Button>
				</div>
			</div>
		</div>
	);
};
