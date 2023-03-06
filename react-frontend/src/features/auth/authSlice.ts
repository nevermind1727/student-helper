import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../utils/types";

// Define a type for the slice state
interface AuthState {
  user: User | null | undefined;
}

// Define the initial state using that type
const initialState: AuthState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<AuthState>) => {
      const { user } = action.payload;
      state.user = user;
    },
  },
});

export const { setAuthUser } = authSlice.actions;

export default authSlice.reducer;
