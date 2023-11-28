import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "http://18.218.116.205/", // Reemplaza con la URL base de tu servidor API
});

export default instance;
