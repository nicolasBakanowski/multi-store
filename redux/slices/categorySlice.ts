// slices/categorySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category, initialState } from "@/interfaces/Category";

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    setCurrentCategory(state, action: PayloadAction<Category>) {
      state.currentCategory = action.payload;
    },
  },
});

export const { setCategories, setCurrentCategory } = categorySlice.actions;
export default categorySlice.reducer;
