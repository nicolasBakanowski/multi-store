import { Dispatch } from "redux";
import axios from "../axios.config";
import { LoginData, UserRegisterData } from "../../interfaces/User";
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
      return false;
    }
  };

export const registerAction =
  (userData: UserRegisterData) => async (dispatch: Dispatch) => {
    try {
      const response = await axios.post("/user/register", userData);
      return true;
    } catch (error) {
      dispatch(setError("fallo en el registro"));
      return false;
    }
  };
