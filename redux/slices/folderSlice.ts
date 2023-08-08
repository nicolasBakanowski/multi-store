import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchFolders } from "../actions/folderAction";
import { FolderState, Folder, CurrentFolder } from "@/interfaces/Folder";

const initialState: FolderState = {
  folders: [],
  loading: false,
  error: null,
  currentFolder: {
    name: "",
    folderId: "",
  },
};

const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    setFolders: (state, action: PayloadAction<Folder[]>) => {
      state.folders = action.payload;
    },
    setCurrentFolder: (state, action: PayloadAction<CurrentFolder>) => {
      state.currentFolder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFolders.fulfilled, (state, action) => {
        state.folders = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchFolders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Error al obtener los folders";
      });
  },
});

export const { setFolders, setCurrentFolder } = folderSlice.actions;

export default folderSlice.reducer;
