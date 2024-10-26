import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EarningsState {
  totalRevenue: number;
  totalCost: number;
  totalProfit: number;
}

const initialState: EarningsState = {
  totalRevenue: 0,
  totalCost: 0,
  totalProfit: 0,
};

const earningsSlice = createSlice({
  name: "earnings",
  initialState,
  reducers: {
    setEarnings(state, action: PayloadAction<EarningsState>) {
      return action.payload;
    },
  },
});

export const { setEarnings } = earningsSlice.actions;
export default earningsSlice.reducer;
