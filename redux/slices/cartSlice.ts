// En tu cartSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../interfaces/Products";

export interface CartItem extends Product {
  quantity: number; // Añadimos el campo para la cantidad
}

const cartSlice = createSlice({
  name: "cart",
  initialState: [] as CartItem[],
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.find((item) => item.id === action.payload.id);

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.push({ ...action.payload });
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    discountProduct: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingItem = state.find((item) => item.id === productId);

      if (existingItem && existingItem.quantity > 0) {
        existingItem.quantity -= 1;
      }
    },
  },
});

export const { addItem, removeItem, discountProduct } = cartSlice.actions;
export default cartSlice.reducer;
