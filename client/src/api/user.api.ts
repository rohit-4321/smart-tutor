import baseApi from "./baseApi";

export interface UserInfo {
	auth_time: number; // Unix timestamp (seconds)
	email: string;
	exp: number; // Unix timestamp (seconds)
	id: string;
	name: string;
	picture: string; // URL to the profile picture
}
const userApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		getUserInfo: build.query<
			{
				result: UserInfo;
			},
			null
		>({
			query: () => ({
				url: "userInfo",
				method: "GET",
			}),
		}),
		logout: build.query<any, any>({
			query: () => ({
				url: "logout",
				method: "GET",
			}),
		}),
	}),
	overrideExisting: false,
});

export default userApi;
