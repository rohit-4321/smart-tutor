import { Box, CircularProgress } from "@mui/material";

export const QuizLoading = () => {
	return (
		<Box
			sx={{
				height: "100%",
				width: "100%",
			}}
		>
			<Box
				sx={{
					maxWidth: "70rem",
					marginX: "auto",
					backgroundColor: "var(--background-color-primary)",
					paddingTop: "2rem",
					height: "100%",
					paddingBottom: "2rem",
					boxShadow:
						"0 4px 8px rgba(30, 21, 39, 0.082), 0 6px 20px rgba(22, 22, 22, 0.048)",
				}}
			>
				<Box
					sx={{
						height: "100%",
						width: "100%",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<CircularProgress
						size="50px"
						sx={{
							color: "var(--primary-color)",
						}}
					/>
				</Box>
			</Box>
		</Box>
	);
};
