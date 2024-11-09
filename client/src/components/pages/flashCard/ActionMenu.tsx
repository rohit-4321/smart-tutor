import DeleteIcon from "@mui/icons-material/Delete";
import { Fade, Menu, MenuItem } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";

export const ActionMenu = () => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div>
			<button
				id="fade-button"
				aria-controls={open ? "fade-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				type="button"
				style={{
					all: "unset",
					cursor: "pointer",
					fontSize: "0.9rem",
				}}
			>
				<MoreVertIcon sx={{ fontSize: "1.3rem" }} />
			</button>
			<Menu
				id="fade-menu"
				MenuListProps={{
					"aria-labelledby": "fade-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				TransitionComponent={Fade}
				sx={{
					".MuiMenu-paper": {
						border: "1px solid var(--gray-50)",
						boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
					},
				}}
			>
				<MenuItem
					sx={{
						fontSize: "0.8rem",
						fontFamily: "inherit",
						display: "flex",
						alignItems: "center",
						width: "6rem",
						gap: "0.5rem",
					}}
					onClick={handleClose}
				>
					<EditIcon sx={{ fontSize: "0.9rem" }} />
					Edit
				</MenuItem>
				<MenuItem
					sx={{
						fontSize: "0.8rem",
						fontFamily: "inherit",
						display: "flex",
						alignItems: "center",
						width: "6rem",
						gap: "0.5rem",
					}}
					onClick={handleClose}
				>
					<DeleteIcon
						sx={{
							fontSize: "1.2rem",
							// color: "#c05367",
							cursor: "pointer",
						}}
					/>
					Delete
				</MenuItem>
			</Menu>
		</div>
	);
};
