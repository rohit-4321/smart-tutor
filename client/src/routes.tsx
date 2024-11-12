import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { Home } from "./components/pages/home/Home";
import { Quiz } from "./components/pages/quiz/Quiz";
import { useEffect, useRef } from "react";
import { SideDrawer } from "./components/Drawer";
import { Header } from "./components/header";
import { Login } from "./components/pages/auth/Login";
import userApi from "./api/user.api";
import { useAppDispatch } from "./redux/store";
import { setUser } from "./redux/slices/userSlice";
import { HomeTab } from "./components/ui/HomeTab";
import { Flash } from "./components/pages/flashCard/Flash";
import { Deck } from "./components/pages/deck/Deck";
const Template = () => {
	const isDrawerOpenRef = useRef<boolean>(true);
	const dispatch = useAppDispatch();
	const { data: userDate } = userApi.useGetUserInfoQuery(null);

	useEffect(() => {
		dispatch(setUser(userDate?.result));
	});
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
				element: <Navigate to="/quiz" />,
			},
			{
				path: "/quiz",
				element: <Home />,
			},
			{
				path: "/flashcard",
				element: <Flash />,
			},
			{
				path: "/flashcard/:_id",
				element: <Deck />,
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
	{
		path: "/login",
		element: <Login />,
	},
]);

export default router;
