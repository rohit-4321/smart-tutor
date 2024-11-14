import DeleteIcon from "@mui/icons-material/Delete";
import { Box, Fade, Menu, MenuItem, Stack, Tooltip } from "@mui/material";
import React, { type FC } from "react";
import { useNavigate } from "react-router-dom";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export const ActionMenu: FC<{ deck_id: string }> = ({ deck_id }) => {
	const navigate = useNavigate();
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget);
	};
	const handleEdit = () => {
		navigate(`${deck_id}`);
		setAnchorEl(null);
	};
	const onPlayClick = () => {
		navigate(`play/${deck_id}`);
	};
	return (
		<Stack direction="row" gap={2}>
			<Tooltip placement="top" title="Practice">
				<button
					onClick={onPlayClick}
					type="button"
					style={{
						all: "unset",
						cursor: "pointer",
						backgroundColor: "#4caf50",
						padding: "3px 5px",
						borderRadius: "3px",
					}}
				>
					<MenuBookIcon sx={{ color: "white", fontSize: "1.2rem" }} />
				</button>
			</Tooltip>
			<Tooltip placement="top" title="Edit">
				<button
					type="button"
					onClick={handleEdit}
					style={{
						all: "unset",
						cursor: "pointer",
						backgroundColor: "#ff9800",
						padding: "3px 5px",
						borderRadius: "3px",
					}}
				>
					<EditIcon sx={{ color: "white", fontSize: "1.2rem" }} />
				</button>
			</Tooltip>
			<Tooltip placement="top" title="Delete">
				<button
					type="button"
					style={{
						all: "unset",
						cursor: "pointer",
						backgroundColor: "#f44336",
						padding: "3px 5px",
						borderRadius: "3px",
					}}
				>
					<DeleteIcon sx={{ color: "white", fontSize: "1.2rem" }} />
				</button>
			</Tooltip>
		</Stack>
	);
};
