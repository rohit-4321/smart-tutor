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
	}),
	overrideExisting: false,
});

export default flashCard;
