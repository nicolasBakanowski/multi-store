import { Dispatch } from "redux";
import axios from "../axios.config";
import { LoginData, UserRegisterData } from "../../interfaces/User";
import { setUserInfoAndToken} from "../slices/userSlice";
import { setNotification, clearNotification}from"../slices/notificationSlice"
export const loginAction =
  (loginData: LoginData) => async (dispatch: Dispatch) => {
    try {
      const response = await axios.post("/user/login", loginData);
      const { user, token } = response.data.token;
      dispatch(setUserInfoAndToken({ user, token }));
      dispatch(clearNotification()); // Clear error on successful login
      return true;
    } catch (error) {
      dispatch(setNotification({ message: "Error en las credenciales", type: "error" }));
      return false;
    }
  };

export const registerAction =
  (userData: UserRegisterData) => async (dispatch: Dispatch) => {
    try {
      const response = await axios.post("/user/register", userData);
      return true;
    } catch (error) {
      dispatch(setNotification({message: "Error en el registro", type: "error" }));
      return false;
    }
  };
