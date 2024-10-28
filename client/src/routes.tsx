import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home } from "./components/pages/home/Home";
import type React from "react";
import { Quiz } from "./components/pages/quiz/Quiz";

const Wrapper = (props: { children: React.ReactNode }) => {
	return <div className="page-wrapper">{props.children}</div>;
};
const router = createBrowserRouter([
	{
		path: "/",
		element: <Navigate to="/home" />,
	},
	{
		path: "/home",
		element: (
			<Wrapper>
				<Home />
			</Wrapper>
		),
	},
	{
		path: "/quiz/:_id",
		element: (
			<Wrapper>
				<Quiz />
			</Wrapper>
		),
	},

	{
		path: "*",
		element: <div>Page Not Found</div>,
	},
]);

export default router;
