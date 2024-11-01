import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./redux/store.ts";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
	components: {
		MuiDialog: {
			styleOverrides: {
				paper: {
					boxShadow: "none",
				},
			},
		},
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<SnackbarProvider>
				<ThemeProvider theme={theme}>
					<App />
				</ThemeProvider>
			</SnackbarProvider>
		</Provider>
	</StrictMode>,
);
