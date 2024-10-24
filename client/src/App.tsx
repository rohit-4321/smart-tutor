import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./routes";
import { Header } from "./components/header";
import { SideDrawer } from "./components/Drawer";
import { useState } from "react";

function App() {
	const [drawerOpen, setDrawerOpen] = useState(true);
	const onDrawerOpen = () => {
		setDrawerOpen((prev) => {
			if (prev) {
				document.documentElement.style.setProperty("--drawer-width", "0px");
			} else {
				document.documentElement.style.setProperty("--drawer-width", "240px");
			}
			return !prev;
		});
	};
	return (
		<div>
			<Header onDrawerOpen={onDrawerOpen} />
			<SideDrawer open={drawerOpen} />
			<div className="rightPanel">
				<RouterProvider router={router} />
			</div>
		</div>
	);
}

export default App;
