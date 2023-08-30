import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Importa el almacenamiento que prefieras: local storage, session storage, etc.
import { combineReducers } from "redux";

import cartReducer from "./slices/cartSlice";
import categoryReducer from "./slices/categorySlice";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice"; // Asegúrate de corregir el nombre del slice si es "userSlice"

// Configura la persistencia para los reducers que deseas persistir
const persistConfig = {
  key: "root", // Puedes personalizar la clave si lo deseas
  storage,
  // Añade los nombres de los reducers que deseas persistir aquí
  whitelist: ["user", "cart"], // Por ejemplo, persiste los estados de usuario y carrito
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    cart: cartReducer,
    category: categoryReducer,
    product: productReducer,
    // Agrega otros reducers aquí
  })
);

const store = configureStore({
  reducer: persistedReducer, // Usa el reducer con persistencia
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store); // Crea el persistor

export default store;
