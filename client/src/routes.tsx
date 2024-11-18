import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { Home } from "./components/pages/home/Home";
import { Quiz } from "./components/pages/quiz/Quiz";
import { useEffect, useState } from "react";
import { SideDrawer } from "./components/Drawer";
import { Header } from "./components/header";
import { Login } from "./components/pages/auth/Login";
import userApi from "./api/user.api";
import { useAppDispatch } from "./redux/store";
import { setUser } from "./redux/slices/userSlice";
import { Deck } from "./components/pages/decks/Deck";
import { FlashCard } from "./components/pages/flashCard/FlashCard";
import { FlashCardPlay } from "./components/pages/flashcardplay/FlashCardPlay";
const Template = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(true);
	const dispatch = useAppDispatch();
	const { data: userDate } = userApi.useGetUserInfoQuery(null);

	useEffect(() => {
		dispatch(setUser(userDate?.result));
	});
	const onDrawerOpen = () => {
		if (isDrawerOpen) {
			document.documentElement.style.setProperty("--drawer-width", "0px");
		} else {
			document.documentElement.style.setProperty("--drawer-width", "240px");
		}
		setIsDrawerOpen((prev) => !prev);
	};
	return (
		<div>
			<Header onDrawerOpen={onDrawerOpen} />
			<SideDrawer />
			<div className="rightPanel">
				<Outlet />
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
				element: <Deck />,
			},
			{
				path: "flashcard/play/:_id",
				element: <FlashCardPlay />,
			},
			{
				path: "/flashcard/:_id",
				element: <FlashCard />,
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
