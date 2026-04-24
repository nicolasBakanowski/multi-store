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
    deactivateProductSuccess(state, action: PayloadAction<number>) {
      state.products = state.products.filter(product => product.id !== action.payload);
    },
    updateProductStocks(
      state,
      action: PayloadAction<{ id: number; stock: number }[]>
    ) {
      for (const u of action.payload) {
        const index = state.products.findIndex((p) => p.id === u.id);
        if (index !== -1) {
          state.products[index] = { ...state.products[index], stock: u.stock };
        }
        if (state.currentProduct?.id === u.id) {
          state.currentProduct = { ...state.currentProduct, stock: u.stock };
        }
      }
    },
  },
});

export const {
  setProducts,
  setCurrentProduct,
  editProductSuccess,
  deactivateProductSuccess,
  updateProductStocks,
} = productSlice.actions;
export default productSlice.reducer;
