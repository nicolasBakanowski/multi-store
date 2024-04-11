import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface loadinSlice {
  isLoading: boolean;
  error: string | null;
}

const initialState: loadinSlice = {
  isLoading: false,
  error: null,
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setError } = statusSlice.actions;

export default statusSlice.reducer;
