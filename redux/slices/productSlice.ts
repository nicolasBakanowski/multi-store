import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, initialState,ProductEditModalProps } from "../../interfaces/Products";

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
      editProductSuccess(state, action: PayloadAction<Product>) {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        index !== -1 ? state.products[index] = action.payload : null;

      },
  },
});

export const { setProducts, setCurrentProduct, editProductSuccess} = productSlice.actions;
export default productSlice.reducer;
