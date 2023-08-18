import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://localhost:30001/", // Reemplaza con la URL base de tu servidor API
});

export default instance;
