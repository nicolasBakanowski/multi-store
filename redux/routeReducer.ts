import { combineReducers } from "redux";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import folderReducer from "./slices/folderSlice";
// Importa y agrega otros reducers según sea necesario

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  folders: folderReducer,
  // Agrega otros reducers aquí
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
