import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import class_room from "../../../assets/class_room.webp";
import smart_tutor_logo from "../../../assets/smart_tutor_logo.png";
import google_logo from "../../../assets/google.png";
import style from "./Login.module.css";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "../../../firebase";
import { useState } from "react";
import { enqueueSnackbar } from "notistack";
import authApi from "../../../api/auth.api";
import { useNavigate } from "react-router-dom";

const provider = new GoogleAuthProvider();
const auth = getAuth(firebaseApp);
export const Login = () => {
	const navigate = useNavigate();
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
	const [isLoading, setIsLoading] = useState(false);
	const [loginTrigger] = authApi.useLoginMutation();
	const handleLogin = async () => {
		setIsLoading(true);
		try {
			const result = await signInWithPopup(auth, provider);
			const idToken = await result.user.getIdToken();

			const { token: authToken } = await loginTrigger({
				token: idToken,
			}).unwrap();

			localStorage.setItem("authToken", authToken);
			navigate("/quiz");
		} catch (err) {
			console.error("Error: ", err);
			enqueueSnackbar("Unexpected Error Occured. Please try again", {
				variant: "error",
				autoHideDuration: 4000,
			});
		} finally {
			setIsLoading(false);
		}
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
					[theme.breakpoints.down("sm")]: {
						minWidth: "100%",
					},
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
						disabled={isLoading}
						className={style.googleButton}
						onClick={handleLogin}
					>
						<img src={google_logo} alt="gl" width="20px" />
						<span>Continue with Google</span>
						<KeyboardDoubleArrowRightIcon sx={{ color: "var(--gray-200)" }} />
					</button>
				</Box>
				{!isSmallScreen && (
					<img
						src={class_room}
						alt="Class Room"
						style={{ width: "330px", objectFit: "cover" }}
					/>
				)}
			</Box>
		</Box>
	);
};
