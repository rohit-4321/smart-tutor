import { Box, Button } from "@mui/material";

export const Login = () => {
	const handleLogin = () => {
		window.open("http://localhost:3000/login/google", "_self");
	};

	return (
		<Box
			sx={{
				margin: "50px",
			}}
		>
			<Button variant="contained" onClick={handleLogin}>
				Login in With Google
			</Button>
		</Box>
	);
};
