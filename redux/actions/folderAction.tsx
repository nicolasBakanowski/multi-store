import axios from "../axios.config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Folder } from "@/interfaces/Folder";

export const fetchFolders = createAsyncThunk(
  "folders/fetchFolders",
  async () => {
    try {
      const response = await axios.get("/folders");
      return response.data.folders as Folder[];
    } catch (error) {
      throw new Error("Error al obtener los folders");
    }
  }
);
