import { Product } from "../interfaces/Products";

export interface CartItem extends Product {
  quantity: number; // Añadimos el campo para la cantidad
}
