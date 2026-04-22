import { Dispatch } from "redux";
import axios from "../axios.config";
import { formatOrderData } from "../../utils/orderDataFormater";
import { setNewOrder } from "../slices/orderSlice";
import { RootState } from "../store";

export const fetchOrders =
  () => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
      const token = getState().user.token;
      if (!token) {
        console.error(
          "fetchOrders: no hay token (se requiere admin autenticado)"
        );
        return;
      }
      const response = await axios.get(`/order/`);
      const ordersArray = formatOrderData(response.data);
      dispatch(setNewOrder(ordersArray));
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

export const changeStatusOrder = async (
  orderId: number,
  statusId: number,
  token: string
) => {
  try {
    const response = await axios.put(
      `/order/${orderId}`,
      { statusId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error al confirmar el pedido:", error);
    throw error;
  }
};
