import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/",
		element: <div>Hello world!</div>,
	},
	{
		path: "/DA",
		element: <div>daa!</div>,
	},
	{
		path: "*",
		element: <div>Page Not Found</div>,
	},
]);

export default router;
