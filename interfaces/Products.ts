export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
}
interface ProductState {
  products: Product[];
  currentProduct: Product | null;
}

export const initialState: ProductState = {
  products: [],
  currentProduct: null,
};

export interface ProductCardProps {
  product: Product;
  onEditClick: any; // Agrega esta prop para el modal
}
