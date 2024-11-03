import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const customBaseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:3000/",
	credentials: "include",
});

const baseQueryWithRedirect = async (
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	args: any,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	api: any,
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	extraOptions: any,
) => {
	const result = await customBaseQuery(args, api, extraOptions);
	if (result.error && result.error.status === 401) {
		window.location.href = "/login"; // Change this to your actual login route
	}

	return result;
};

export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithRedirect,
	tagTypes: ["quiz", "updateQuiz"],
	endpoints: () => ({}),
});
export default baseApi;
