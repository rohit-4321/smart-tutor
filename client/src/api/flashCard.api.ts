import baseApi from "./baseApi";
import type { DeckResponse, FlashCard } from "./flashCard.interface";

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
					cards: { _id: string; question: string; answer: string }[];
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
	}),
	overrideExisting: false,
});

export default flashCard;
