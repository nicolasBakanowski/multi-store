import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  devTools: process.env.NODE_ENV !== "production", // Aquí puedes agregar tus reducers
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
