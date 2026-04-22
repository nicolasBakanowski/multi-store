import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // Importa el almacenamiento que prefieras: local storage, session storage, etc.
import { combineReducers } from "redux";
import cartReducer from "./slices/cartSlice";
import productReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";
import notificationReducer from "./slices/notificationSlice";
// Configura la persistencia para los reducers que deseas persistir
const persistConfig = {
  key: "root", // Puedes personalizar la clave si lo deseas
  storage,
  whitelist: ["user", "cart"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userReducer,
    cart: cartReducer,
    product: productReducer,
    notification: notificationReducer,
    // Agrega otros reducers aquí
  }
  )
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store); // Crea el persistor
setTimeout(() => {
  persistor.purge(); // Esto eliminará los datos persistidos
}, 3600000 * 2);
export default store;
