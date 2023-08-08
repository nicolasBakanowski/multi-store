import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1", // Reemplaza con la URL base de tu servidor API
});

export default instance;
