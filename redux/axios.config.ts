import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

let getToken: () => string | null = () => null;

export function configureApiAuth(getter: () => string | null): void {
  getToken = getter;
}

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const t = getToken();
  if (t) {
    config.headers.Authorization = `Bearer ${t}`;
  }
  return config;
});

export default instance;
