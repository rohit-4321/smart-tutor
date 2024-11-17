import baseApi from "./baseApi";
import type { QuizResponse } from "./home.interface";

const homeApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
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
			{ no_of_questions: number; question_types: string[]; topic: string }
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
			providesTags: ["updateQuiz"],
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
			invalidatesTags: ["updateQuiz"],
		}),
		deleteQuiz: build.mutation<
			any,
			{
				quiz_id: string;
			}
		>({
			query: (build) => ({
				url: `quiz/delete/${build.quiz_id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["quiz"],
		}),
	}),
	overrideExisting: false,
});

export default homeApi;
