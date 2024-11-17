import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl =
	import.meta.env.MODE === "development"
		? "http://localhost:3000/"
		: "https://smart-tutor-server.vercel.app/";
const customBaseQuery = fetchBaseQuery({
	baseUrl: baseUrl,
	credentials: "include",
	prepareHeaders(headers, _api) {
		const token = localStorage.getItem("authToken") || "";
		if (token) {
			headers.set("Authorization", `Bearer ${token}`);
		}
		return headers;
	},
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
	console.log(result);
	if (result.error && result.error.status === 401) {
		window.location.href = "/login";
	}
	return result;
};

export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: baseQueryWithRedirect,
	tagTypes: ["quiz", "updateQuiz", "updateDecks", "updateCard"],
	endpoints: () => ({}),
});
export default baseApi;
