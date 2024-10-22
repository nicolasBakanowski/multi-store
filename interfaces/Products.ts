export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
  available: boolean;
  costPrice: number;  // Nuevo campo
}

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
}

export interface ProductEdit {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  costPrice: number;  // Nuevo campo en la edición del producto
}

export interface ProductEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: any;
    name: string;
    description: string;
    stock: number;
    price: number;
    costPrice: number;  // Nuevo campo en el modal
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
  onEditClick: any;  // Si quieres tiparlo más estrictamente, puedes usar: (product: Product) => void;
}
