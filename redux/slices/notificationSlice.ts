// notificationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  message: string | null;
  type: "success" | "error";
}

const initialState: NotificationState = {
  message: null,
  type: "error",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (
      state,
      action: PayloadAction<{ message: string; type: "success" | "error" }>
    ) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
    clearNotification: (state) => {
      state.message = null;
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
