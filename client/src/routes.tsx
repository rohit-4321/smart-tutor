import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { Home } from "./components/pages/home/Home";
import { NewQuiz } from "./components/pages/quiz/NewQuiz";
import { Quiz } from "./components/pages/quiz/Quiz";
import { useState } from "react";
import { SideDrawer } from "./components/Drawer";
import { Header } from "./components/header";

const Template = () => {
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
				<div className="page-wrapper">
					<Outlet />
				</div>
			</div>
		</div>
	);
};
const router = createBrowserRouter([
	{
		element: <Template />,
		children: [
			{
				path: "/",
				element: <Navigate to="/home" />,
			},
			{
				path: "/home",
				element: <Home />,
			},
			{
				path: "/newquiz",
				element: <NewQuiz />,
			},
			{
				path: "/quiz/:_id",
				element: <Quiz />,
			},
			{
				path: "*",
				element: <div>Page Not Found</div>,
			},
		],
	},
]);

export default router;
