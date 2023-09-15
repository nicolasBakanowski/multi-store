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
