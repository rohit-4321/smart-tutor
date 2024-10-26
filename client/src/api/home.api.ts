import baseApi from "./baseApi";

type CreateGroupPayload = {
	name: string;
};
const homeApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		createGroup: build.mutation<any, CreateGroupPayload>({
			query: (payload) => ({
				url: "createGroup",
				method: "POST",
				body: payload,
			}),
		}),
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		getGroups: build.query<any, any>({
			query: () => "/groups",
		}),
	}),
	overrideExisting: false,
});

export default homeApi;
