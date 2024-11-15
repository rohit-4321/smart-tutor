import { Box, Stack } from "@mui/material";
import class_room from "../../../assets/class_room.webp";
import smart_tutor_logo from "../../../assets/smart_tutor_logo.png";
import google_logo from "../../../assets/google.png";
import style from "./Login.module.css";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { baseUrl } from "../../../api/baseApi";

export const Login = () => {
	const handleLogin = () => {
		window.open(`${baseUrl}login/google`, "_self");
	};

	return (
		<Box
			sx={{
				width: "100%",
				height: "100vh",
				backgroundColor: "var(--primary-color-dark-90)",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Box
				sx={{
					backgroundColor: "var(--background-color-primary)",
					width: "40%",
					height: "55%",
					minWidth: "45rem",
					borderRadius: "10px",
					overflow: "hidden",
					display: "flex",
				}}
			>
				<Box
					sx={{
						flex: 1,
						padding: "2rem",
					}}
				>
					<Stack direction="row" alignItems="center" gap={1}>
						<span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
							Log in to{" "}
						</span>
						<img
							src={smart_tutor_logo}
							alt="logo"
							style={{ height: "1.9rem" }}
						/>
					</Stack>
					<Box sx={{ my: "1.3rem" }}>
						<span>
							Enter a topic, and let our AI create a custom quiz just for
							you—learn, challenge yourself, and have fun!!
						</span>
					</Box>
					<button
						type="button"
						className={style.googleButton}
						onClick={handleLogin}
					>
						<img src={google_logo} alt="gl" width="20px" />
						<span>Continue with Google</span>
						<KeyboardDoubleArrowRightIcon sx={{ color: "var(--gray-200)" }} />
					</button>
				</Box>
				<img
					src={class_room}
					alt="Class Room"
					style={{ width: "330px", objectFit: "cover" }}
				/>
			</Box>
		</Box>
	);
};
