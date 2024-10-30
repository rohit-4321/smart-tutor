import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { Home } from "./components/pages/home/Home";
import { Quiz } from "./components/pages/quiz/Quiz";
import { useRef, useState } from "react";
import { SideDrawer } from "./components/Drawer";
import { Header } from "./components/header";

const Template = () => {
	const isDrawerOpenRef = useRef<boolean>(true);
	const onDrawerOpen = () => {
		if (isDrawerOpenRef.current) {
			document.documentElement.style.setProperty("--drawer-width", "0px");
			isDrawerOpenRef.current;
		} else {
			document.documentElement.style.setProperty("--drawer-width", "240px");
		}
		isDrawerOpenRef.current = !isDrawerOpenRef.current;
	};
	return (
		<div>
			<Header onDrawerOpen={onDrawerOpen} />
			<SideDrawer />
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
