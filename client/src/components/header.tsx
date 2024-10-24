import MenuIcon from "@mui/icons-material/Menu";
import style from "./header.module.css";
import { IconButton } from "@mui/material";
import type { FC } from "react";
type HeaderProps = {
	onDrawerOpen: () => void;
};
export const Header: FC<HeaderProps> = (props) => {
	const { onDrawerOpen } = props;
	return (
		<div className={style.headerContainer}>
			<IconButton onClick={onDrawerOpen}>
				<MenuIcon sx={{ color: "var(--gray-500)", fontSize: "1.9rem" }} />
			</IconButton>
		</div>
	);
};
