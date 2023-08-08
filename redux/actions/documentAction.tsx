import axios from "../axios.config";
import store from "../store";
import { setUser } from "../slices/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../routeReducer";

export const createAction = async (
  documentName: string,
  folderId: string,
  s3url: string
) => {
  try {
    return true;
  } catch (error) {
    console.error("error al guardar el documento:", error);
    return false;
  }
};
