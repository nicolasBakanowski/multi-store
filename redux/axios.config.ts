import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Reemplaza con la URL base de tu servidor API
});

export default instance;
