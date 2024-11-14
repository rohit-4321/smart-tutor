import baseApi from "./baseApi";
import type {
	CardResponse,
	DeckResponse,
	FlashCard,
} from "./flashCard.interface";

const flashCard = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createDeck: build.mutation<any, FlashCard>({
			query: (build) => ({
				url: "createFlashCardDeck",
				method: "POST",
				body: build,
			}),
			invalidatesTags: ["updateDecks"],
		}),

		getDecks: build.query<DeckResponse, any>({
			query: () => ({
				url: "decks",
				method: "GET",
			}),
			providesTags: ["updateDecks"],
		}),
		addCard: build.mutation<
			any,
			{
				deck_id: string;
				question: string;
				answer: string;
			}
		>({
			query: (build) => {
				const { deck_id, ...rest } = build;
				return {
					url: `/deck/addcard/${build.deck_id}`,
					method: "PUT",
					body: rest,
				};
			},
			invalidatesTags: ["updateCard"],
		}),

		getCards: build.query<
			{
				result: {
					cards: CardResponse[];
				};
			},
			{ deck_id: string }
		>({
			query: (build) => {
				return {
					url: `/deck/cards/${build.deck_id}`,
					method: "GET",
				};
			},
			providesTags: ["updateCard"],
		}),
		updateCard: build.mutation<any, any>({
			query: (build) => {
				const { deck_id, card_id, ...rest } = build;
				return {
					url: `/deck/card/update/${deck_id}/${card_id}`,
					method: "PUT",
					body: rest,
				};
			},
			invalidatesTags: ["updateCard"],
		}),
		deleteCard: build.mutation<any, { deck_id: string; card_id: string }>({
			query: (build) => {
				const { deck_id, card_id } = build;
				return {
					url: `/deck/card/delete/${deck_id}/${card_id}`,
					method: "DELETE",
				};
			},
		}),
		addAiGeneratedCard: build.mutation<any, { deck_id: string }>({
			query: (build) => {
				const { deck_id, ...rest } = build;
				return {
					url: `/deck/card/aigenerate/${build.deck_id}`,
					method: "PUT",
					body: rest,
				};
			},
			invalidatesTags: ["updateCard"],
		}),
		updateDeckScore: build.mutation<
			{
				result: number;
			},
			{
				deck_id: string;
				last_attempt_at?: number | string;
				last_attempt_score: number | string;
			}
		>({
			query: (build) => {
				const { deck_id, ...rest } = build;
				return {
					url: `/deck/updateScore/${deck_id}`,
					method: "PUT",
					body: rest,
				};
			},
			invalidatesTags: ["updateDecks"],
		}),
		deleteDeck: build.mutation<any, string>({
			query: (deck_id) => ({
				url: `/deck/delete/${deck_id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["updateDecks"],
		}),
	}),
	overrideExisting: false,
});

export default flashCard;
