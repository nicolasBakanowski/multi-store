import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  email: string;
  googleId: string | null;
  roleId: number;
  // ... other user properties
}

interface UserState {
  user: User | null;
  token: string | null;
  error: string | null; // Add an error property
}

const initialState: UserState = {
  user: null,
  token: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfoAndToken: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.error = null; // Reset error when successful
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
    },
  },
});

export const { setUserInfoAndToken, setError, clearError, logout } =
  userSlice.actions;
export default userSlice.reducer;
