import { Dispatch } from "redux";
import axios from "../axios.config";
import { setProducts } from "../slices/productSlice";
import { CartItem } from "../../interfaces/Cart";

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
      return true;
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
export const createOrderAction =
  (
    cartItems: CartItem[],
    name: string,
    phoneNumber: string,
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
      userInfo: { name, phoneNumber, address },
      deliveryMethod,
    });
    return true;
  };
