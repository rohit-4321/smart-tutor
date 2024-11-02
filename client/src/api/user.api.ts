import baseApi from "./baseApi";

const userApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUserInfo: build.query<
			{
				result: {
					email: string;
					family_name: string;
					given_name: string;
					name: string;
					picture: string;
					verified_email: boolean;
				};
			},
			null
		>({
			query: () => ({
				url: "userInfo",
				method: "GET",
			}),
		}),
	}),
	overrideExisting: false,
});

export default userApi;
