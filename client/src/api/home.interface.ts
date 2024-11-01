export interface QuizResponse {
	topic: string;
	total_no_of_questions: number;
	questions: Question[];
	status: "draft" | "completed";
}

export interface Question {
	correct_answer: number[];
	description: string;
	options: string[];
	question: string;
	question_type: "single_choice" | "multiple_choice";
	user_answer: number[];
}
