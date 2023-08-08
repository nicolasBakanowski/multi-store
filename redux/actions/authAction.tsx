import axios from "../axios.config";
import store from "../store";
import { setUser } from "../slices/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "../routeReducer";

export const loginAction = async (email: string, password: string) => {
  try {
    /// const response = await axios.post("/login", { email, password });
    // store.dispatch(setUser(response.data));

    //   } catch (error) {
    //     console.error("Error de autenticación:", error);
    //     return false;
    //   }
    return true;
  } catch (error) {
    console.error("Error de autenticación:", error);
    return false;
  }
};
