import { Dispatch } from "redux";
import axios from "../axios.config";
import { setProducts } from "../slices/productSlice";

export const fetchProductsByCategory =
  (categoryId: number) => async (dispatch: Dispatch) => {
    try {
      const response = await axios.get(`product/category/${categoryId}`);
      console.log(response, "esta es la data");
      dispatch(setProducts(response.data));
    } catch (error) {
      console.error("Error fetching products by category:", error);
    }
  };
