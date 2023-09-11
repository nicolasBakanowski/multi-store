// routeReducer.ts
import { combineReducers } from "redux";
import cartReducer from "./slices/cartSlice";
import categoryReducer from "./slices/categorySlice";
import productReducer from "./slices/cartSlice";
import useReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";

// Importa el slice de categorías
// Importa y agrega otros reducers según sea necesario

const rootReducer = combineReducers({
  user: useReducer,
  cart: cartReducer,
  category: categoryReducer,
  product: productReducer,
  order: orderReducer, // Agrega el reducer de categorías aquí
  // Agrega otros reducers aquí
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
