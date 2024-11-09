export interface FlashCard {
	name: string;
	description: string;
	last_attempt_at: string;
	last_attempt_score: number | "NA";
	cards: Card[];
}
export interface Card {
	question: string;
	answer: string;
}

export type ResponseDeckItem = {
	_id: string; // MongoDB ObjectId as a string
	cards_count: number; // Number of cards
	created_at: string; // ISO string date
	description: string; // Description of the deck
	last_attempt_at: string; // "NA" or an ISO string date
	last_attempt_score: string | number; // "NA" or a score
	last_updated_at: string; // ISO string date
	name: string; // Name of the deck
};

export type DeckResponse = {
	result: ResponseDeckItem[]; // Array of ResultItem objects
};
