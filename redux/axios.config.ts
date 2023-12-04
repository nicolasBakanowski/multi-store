import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://multistore.3utilities.com", // Reemplaza con la URL base de tu servidor API
});

export default instance;
