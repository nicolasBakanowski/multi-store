import { Dispatch } from "redux";
import axios from "../axios.config";
import { editProductSuccess, setProducts } from "../slices/productSlice";
import { CartItem } from "../../interfaces/Cart";
import { setNotification } from "../slices/notificationSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchProductsByCategory = createAsyncThunk(
  'product/fetchProductsByCategory',
  async (categoryId: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`product/category/${categoryId}`);
      dispatch(setProducts(response.data));

      return response.data;
    } catch (error) {
      console.error("Error fetching products by category:", error);
      dispatch(setNotification({ message: "Error al cargar productos por categoría", type: "error" }));
    }
  }
);

export const addProduct = createAsyncThunk(
  'product/addProduct',
  async ({ productData, token }: { productData: FormData; token: string }, { dispatch }) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post("/product/new", productData, config);
      dispatch(setNotification({ message: "El producto se agrego con exito", type: "success" }));
      return response.data;
    } catch (error) {
      dispatch(setNotification({ message: "ERROR AL AGREGAR PRODUCTO", type: "error" }));
      return
    }
  }
);
export const editProduct =
  (idProduct: number, productData: FormData, token: string) => async (dispatch: Dispatch) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.put(`/product/edit/${idProduct}`, productData, config);
      dispatch(editProductSuccess(response.data))
      dispatch(setNotification({ message: "Producto editado con éxito", type: "success" }));
      return true;
    } catch (error) {
      dispatch(setNotification({ message: "Error al editar el producto", type: "error" }));
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
      return true;
    };
