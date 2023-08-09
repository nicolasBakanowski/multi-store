import { combineReducers } from "redux";
import cartReducer from "./slices/cartSlice";
// Importa y agrega otros reducers según sea necesario

const rootReducer = combineReducers({
  cart: cartReducer,
  // Agrega otros reducers aquí
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
