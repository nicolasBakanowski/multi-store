import { Dispatch } from "redux";
import axios from "../axios.config";
import { LoginData } from "../../interfaces/User";
import { setUserInfoAndToken, setError, clearError } from "../slices/userSlice";

export const loginAction =
  (loginData: LoginData) => async (dispatch: Dispatch) => {
    try {
      const response = await axios.post("/user/login", loginData);
      const { user, token } = response.data.token;
      dispatch(setUserInfoAndToken({ user, token }));
      dispatch(clearError()); // Clear error on successful login
      return true;
    } catch (error) {
      dispatch(setError("Login failed. Please check your credentials."));
      return false; // Set error message
    }
  };
