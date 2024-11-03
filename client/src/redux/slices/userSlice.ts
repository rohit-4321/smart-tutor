import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
	value:
		| {
				email: string;
				family_name: string;
				given_name: string;
				name: string;
				picture: string;
				verified_email: boolean;
		  }
		| undefined;
}

const initialState: UserState = {
	value: undefined,
};

export const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserState["value"]>) => {
			state.value = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
