import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: [] as any[],
  reducers: {
    setNewOrder: (state, action: PayloadAction<any>) => {
      const existingOrderIds = state.map((order) => order.order_id);
      const newOrders = action.payload.filter((order: any) => {
        return !existingOrderIds.includes(order.order_id);
      });
      state.push(...newOrders);
    },
    addOrder: (state, action: PayloadAction<any>) => {
      const newOrder = action.payload[0];
      const existingOrder = state.find(
        (order) => order.order_id === newOrder.order_id
      );
      if (!existingOrder) {
        state.push(newOrder);
      }
    },
    nextOrderStatus: (state, action) => {
      const { id, statusId } = action.payload;
      state.forEach((order) => {
        if (order.order_id === id) {
          order.orderStatusId = statusId;
        }
      });
    },
  },
});

export const { setNewOrder, addOrder, nextOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;
