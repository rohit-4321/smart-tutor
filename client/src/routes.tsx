import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home } from "./components/pages/home/Home";
import type React from "react";

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
		path: "*",
		element: <div>Page Not Found</div>,
	},
]);

export default router;
