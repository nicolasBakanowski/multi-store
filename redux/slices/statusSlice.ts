import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const statusSlice = createSlice({
  name: "status",
  initialState: [] as any,
  reducers: {
    setStatus: (state, action: PayloadAction<any[]>) => {
      const existingOrderIds = state.map((status: any) => status.id);
      const status = action.payload.filter((status: any) => {
        return !existingOrderIds.includes(status.id);
      });
      state.push(...status);
    },
  },
});

export const { setStatus } = statusSlice.actions;
export default statusSlice.reducer;
