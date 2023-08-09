import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../interfaces/Products";

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as Product[],
  reducers: {
    addItem: (state, action: PayloadAction<Product>) => {
      return [...state, action.payload];
    },
  },
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;
