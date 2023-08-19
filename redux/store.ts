// store.ts
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import categoryReducer from "./slices/categorySlice";
import productReducer from "./slices/productSlice";
// Importa el slice de categorías
// Importa otros slices según sea necesario

const store = configureStore({
  reducer: {
    cart: cartReducer,
    category: categoryReducer,
    product: productReducer, // Agrega el reducer de categorías aquí
    // Agrega otros reducers aquí
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
