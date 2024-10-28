export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryId: number;
  available: boolean;
  costPrice: number; 
  totalSold: string;
}

interface ProductState {
  products: Product[];
  currentProduct: Product | null;
  topSellingProducts: Product[]}

export interface ProductEdit {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  costPrice: number;  
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
    costPrice: number;  
  };
  onSave: (formData: FormData) => void;
  onHide: () => void;
}

export const initialState: ProductState = {
  products: [],
  currentProduct: null,
  topSellingProducts: []
};

export interface ProductCardProps {
  product: Product;
  onEditClick: any; 
}
