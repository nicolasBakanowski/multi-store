import { Dispatch } from "redux";
import axios from "../axios.config";
import { formatOrderData } from "../../utils/orderDataFormater";
import { setNewOrder } from "../slices/orderSlice";
export const fetchOrders = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`/order/`);
    const ordersArray = formatOrderData(response.data);
    dispatch(setNewOrder(ordersArray));
  } catch (error) {
    console.error("Error fetching products by category:", error);
  }
};

export const changeStatusOrder = async (orderId: number, statusId: number) => {
  try {
    const response = await axios.put(`/order/${orderId}`, {
      statusId: statusId,
    });
    return response.data; // Devuelve la respuesta en lugar de la promesa
  } catch (error) {
    console.error("Error al confirmar el pedido:", error);
    throw error; // Lanza el error para que pueda ser manejado en el lugar donde se llama a la acción.
  }
};
