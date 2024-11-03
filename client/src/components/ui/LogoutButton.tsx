import LogoutIcon from "@mui/icons-material/Logout";
import style from "./LogoutButton.module.css";
import { CircularProgress } from "@mui/material";
import type { FC } from "react";
type LogoutButtonProps = {
	isLoading: boolean;
	onClick: () => void;
};
export const LogoutButton: FC<LogoutButtonProps> = ({ isLoading, onClick }) => {
	return (
		<button type="button" className={style.logoutButton} onClick={onClick}>
			{isLoading ? (
				<CircularProgress
					size="18px"
					sx={{ color: "var(--background-color-primary)" }}
				/>
			) : (
				<LogoutIcon
					sx={{ color: "var(--background-color-primary)" }}
					fontSize="small"
				/>
			)}
			<span>Logout</span>
		</button>
	);
};
