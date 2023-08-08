import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginAction } from "../actions/authAction";

interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; password: string }>) {
      const { email, password } = action.payload;
      loginAction(email, password);
      state.isLoggedIn = true;
    },
    logout(state) {
      // Lógica de cierre de sesión
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
