export interface Category {
  id: number;
  name: string;
}

export interface CategoryState {
  categories: Category[];
  currentCategory: Category | null;
}

export const initialState: CategoryState = {
  categories: [],
  currentCategory: null,
};
