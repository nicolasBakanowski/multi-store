import { Dispatch } from "redux";
import axios from "../axios.config";
import { setProducts } from "../slices/productSlice";

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
      console.log("categorydata, aaaaaa ", productData, config);
      const response = await axios.post("/product/new", productData, config);
      return true;
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
