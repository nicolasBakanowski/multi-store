import axios from "../axios.config";
import { setEarnings } from "../slices/earningSlice";
import { setNotification } from "../slices/notificationSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchEarnings = createAsyncThunk(
    'earnings/fetchEarnings',
    async (params: { date: string }, { dispatch }) => {
        try {
            const { date } = params;
            const config = {
                headers: {

                },
            };
            const response = await axios.post(`/earning/earningGenerate`, { date }, config);

            dispatch(setEarnings(response.data));
            return response.data;
        } catch (error) {
            console.error("Error fetching earnings:", error);
            dispatch(setNotification({ message: "Error al cargar ganancias", type: "error" }));
        }
    }
);
