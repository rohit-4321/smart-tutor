import baseApi from "./baseApi";
import type { QuizResponse } from "./home.interface";

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

		getAllQuizTopic: build.query<
			{ result: { _id: string; topic: string }[] },
			null
		>({
			query: () => ({
				url: "allTopics",
				method: "GET",
			}),
			providesTags: ["quiz"],
		}),
		createQuiz: build.mutation<
			{ result: QuizResponse },
			{ no_of_questions: number; question_type: string[]; topic_name: string }
		>({
			query: (build) => ({
				url: "createQuiz",
				method: "POST",
				body: build,
			}),
			invalidatesTags: ["quiz"],
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			transformResponse: (res: any) => {
				console.log("asddasdsa");
				console.log({
					result: {
						...res.result.quiz,
						_id: res.result._id,
					},
				});
				return {
					result: {
						...res.result.quiz,
						_id: res.result._id,
					},
				};
			},
		}),
	}),
	overrideExisting: false,
});

export default homeApi;
