// actions/categoryActions.ts
import { Dispatch } from "redux";
import axios from "../axios.config"; // Asegúrate de importar correctamente axios y configurarlo con la URL de tu backend.
import { setCategories } from "../slices/categorySlice";

export const fetchCategories = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get("/category/all");
    dispatch(setCategories(response.data));
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
