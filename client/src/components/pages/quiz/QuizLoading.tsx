import { Box, CircularProgress } from "@mui/material";

export const QuizLoading = () => {
	return (
		<Box
			sx={{
				height: "100%",
				width: "100%",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<CircularProgress size="50px" />
		</Box>
	);
};
