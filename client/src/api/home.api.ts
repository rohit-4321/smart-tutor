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
			{ result: { _id: string; quiz: QuizResponse } },
			{ no_of_questions: number; question_type: string[]; topic_name: string }
		>({
			query: (build) => ({
				url: "createQuiz",
				method: "POST",
				body: build,
			}),
			invalidatesTags: ["quiz"],
		}),

		getQuiz: build.query<
			{ result: { _id: string; quiz: QuizResponse } },
			{ _id: string }
		>({
			query: (build) => ({
				url: `quiz/${build._id}`,
			}),
		}),

		updateQuiz: build.mutation<
			any,
			{
				quiz: QuizResponse;
				_id: string;
			}
		>({
			query: (build) => ({
				url: `updateQuiz/${build._id}`,
				method: "PUT",
				body: build.quiz,
			}),
		}),
	}),
	overrideExisting: false,
});

export default homeApi;
