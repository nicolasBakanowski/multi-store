// routeReducer.ts
import { combineReducers } from "redux";
import cartReducer from "./slices/cartSlice";
import categoryReducer from "./slices/categorySlice";
import productReducer from "./slices/cartSlice";
// Importa el slice de categorías
// Importa y agrega otros reducers según sea necesario

const rootReducer = combineReducers({
  cart: cartReducer,
  category: categoryReducer,
  product: productReducer, // Agrega el reducer de categorías aquí
  // Agrega otros reducers aquí
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
