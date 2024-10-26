import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
	endpoints: (build) => ({
		createGroup: build.mutation<any, any>({
			query: (payload) => ({
				url: "createGroup",
				method: "POST",
				body: payload,
			}),
		}),
	}),
});
export default baseApi;
