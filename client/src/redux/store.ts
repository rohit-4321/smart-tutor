import { configureStore } from "@reduxjs/toolkit";
import baseApi from "../api/baseApi";
import {
	useDispatch,
	useSelector,
	type TypedUseSelectorHook,
} from "react-redux";
import quizSlice from "./slices/quizSlice";
import userSlice from "./slices/userSlice";
import flashCardSlice from "./slices/flashCardSlice";

export const store = configureStore({
	reducer: {
		[baseApi.reducerPath]: baseApi.reducer,
		quiz: quizSlice,
		user: userSlice,
		flashCard: flashCardSlice,
	},
	devTools: process.env.NODE_ENV !== "production",
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Define `useAppSelector` as a typed version of `useSelector`
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
