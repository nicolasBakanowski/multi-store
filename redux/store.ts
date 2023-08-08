import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import folderReducer from "./slices/folderSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    folders: folderReducer,
  }, // Aquí puedes agregar tus reducers
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
