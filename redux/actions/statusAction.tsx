import { Dispatch } from "redux";
import axios from "../axios.config";
import { setStatus } from "../slices/statusSlice";
const fetchStatus = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get(`/status`);
    console.log(response.data, "asi viene la data");
    dispatch(setStatus(response.data));
  } catch (error) {
    console.error("Error fetching status", error);
  }
};
export { fetchStatus };
