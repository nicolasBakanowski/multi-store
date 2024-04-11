import axios from "../axios.config";
import { setCategories } from "../slices/categorySlice";
import { setNotification } from "../slices/notificationSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (_, { dispatch }) => {
    try {
      const response = await axios.get("/category/all");
      dispatch(setCategories(response.data));

      return response.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      dispatch(setNotification({ message: "Error al cargar categorías", type: "error" }));
    }
  }
);
export const addCategory = createAsyncThunk(
  'category/addCategory',
  async (params: { categoryData: FormData; userToken: string }, { rejectWithValue, dispatch }) => {
    try {
      const { categoryData, userToken } = params;
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "multipart/form-data",
        },
      };
      const response = await axios.post("/category/new", categoryData, config);
      dispatch(setNotification({ message: "Se agregó con éxito", type: "success" }));
      return response.data;
    } catch (error) {
      dispatch(setNotification({ message: "Error al agregar", type: "error" }));
      return
    }
  }
);
