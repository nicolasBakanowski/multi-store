import { Dispatch } from "redux";
import axios from "../axios.config";
import { setCategories } from "../slices/categorySlice";
import { setNotification } from "../slices/notificationSlice";

export const fetchCategories = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get("/category/all");
    dispatch(setCategories(response.data));
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const addCategory =
  (categoryData: FormData, token: string) => async (dispatch: Dispatch) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.post("/category/new", categoryData, config);
      dispatch(setNotification({message:"se agrego con exito", type:"success"}))
      return true;
    } catch (error) {
      dispatch(setNotification({message:"Error al agregar", type:"error"}))
    }
  };
