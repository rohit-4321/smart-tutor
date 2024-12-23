import baseApi from "./baseApi";

const authApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		login: build.mutation<
			{ result: string; token: string },
			{
				token: string;
			}
		>({
			query: (build) => ({
				url: "/login",
				method: "POST",
				body: build,
			}),
		}),
	}),
	overrideExisting: false,
});

export default authApi;
