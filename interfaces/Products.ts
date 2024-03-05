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
export interface ProductEdit{
  name: string;
  description: string;
  stock: number;
  price: number;
}

export interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    description: string;
    stock: number;
    price: number;
  };
  onSave: (formData: FormData) => void;
  onHide: () => void;
}

export const initialState: ProductState = {
  products: [],
  currentProduct: null,
};

export interface ProductCardProps {
  product: Product;
  onEditClick: any; // Agrega esta prop para el modal
}
