import { Dispatch } from "redux";
import axios from "../axios.config";
import { setProducts } from "../slices/productSlice";
import { CartItem } from "../../interfaces/Cart";
import { setNotification } from "../slices/notificationSlice";

export const fetchProductsByCategory =
  (categoryId: number) => async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`product/category/${categoryId}`);
      dispatch(setProducts(response.data));
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };

export const addProduct =
  (productData: FormData, token: string) => async (dispatch: Dispatch) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.post("/product/new", productData, config);
      dispatch(setNotification({message:"se EL PRODUCTO con exito", type:"success"}))
      return true;
    } catch (error) {
      dispatch(setNotification({message:"ERROR AL AGREGAR PRUDOCTO", type:"error"}))
    }
  };
export const createOrderAction =
  (
    cartItems: CartItem[],
    name: string,
    phone: string,
    address: string,
    deliveryMethod: string
  ) =>
  async (dispatch: Dispatch) => {
    const simplifiedCartItems = cartItems.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));
    const response = await axios.post("/order/new", {
      simplifiedCartItems,
      userInfo: { name, phone, address },
      deliveryMethod,
    });
    console.log("que onda con esto", response.data);
    return true;
  };
