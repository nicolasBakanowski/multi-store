export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
  available: boolean;
}
interface ProductState {
  products: Product[];
  currentProduct: Product | null;
}
export interface ProductEdit{
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
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
  onEditClick: any; 
}
