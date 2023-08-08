import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  data: UserData | null;
}

interface UserData {
  // Propiedades del usuario, como nombre, correo electrónico, etc.
  name: string;
  email: string;
  // ...
}

const initialState: UserState = {
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.data = action.payload;
    },
    clearUser: (state) => {
      state.data = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
