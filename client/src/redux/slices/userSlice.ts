import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UserInfo } from "../../api/user.api";

export interface UserState {
	value: UserInfo | undefined;
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
