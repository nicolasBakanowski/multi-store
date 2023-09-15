import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: [] as any[], // Inicializa el estado como un array de tipo Order
  reducers: {
    setNewOrder: (state, action: PayloadAction<any>) => {
      action.payload.map((order: any) => {
        state.push(order);
      });
    },
    addOrder: (state, action: PayloadAction<any>) => {
      state.push(action.payload[0]);
    },
  },
});

export const { setNewOrder, addOrder } = orderSlice.actions;
export default orderSlice.reducer;
