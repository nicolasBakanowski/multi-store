import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Order {
  id: number;
  userInfo: {
    name: string;
    phoneNumber: string;
    address: string;
  };
  extraCommentary: string;
  updatedAt: string;
  createdAt: string;
}

const orderSlice = createSlice({
  name: "order",
  initialState: [] as Order[], // Inicializa el estado como un array de tipo Order
  reducers: {
    setNewOrder: (state, action: PayloadAction<Order>) => {
      const existingOrder = state.find(
        (order) => order.id === action.payload.id
      );
      if (!existingOrder) {
        state.push(action.payload);
      }
    },
  },
});

export const { setNewOrder } = orderSlice.actions;
export default orderSlice.reducer;
