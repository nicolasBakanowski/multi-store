import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, initialState } from "../../interfaces/Products";

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
    },
    setCurrentProduct(state, action: PayloadAction<Product>) {
      state.currentProduct = action.payload;
    },
  },
});

export const { setProducts, setCurrentProduct } = productSlice.actions;
export default productSlice.reducer;
