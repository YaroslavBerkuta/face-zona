import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import config from "../config";
import { storageService } from "../services/system";

const axiosInstance = axios.create({
  baseURL: config.API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
  },
  timeout: 180000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = storageService.get("accessToken");
  if (token) {
    config.headers.Authorization = "Bearer " + token;
  }
  return config;
});

const requestAccessToken = async () => {
  const response = await axiosInstance.post("/auth/refresh-session", {
    refreshToken: storageService.get("refreshToken"),
  });
  storageService.set("accessToken", response.data.accessToken);
  storageService.set("refreshToken", response.data.refreshToken);
};

const request = async <T>(
  func: Function,
  retryCount = 0
): Promise<AxiosResponse<T>> => {
  try {
    let response = await func();
    return response as any as AxiosResponse;
  } catch (e) {
    if (e.response.status === 401) {
      await requestAccessToken();
      return request(func, retryCount);
    }
    if (!e || !e.response || !e.response.status) {
      if (retryCount <= 2) {
        return request(func, retryCount + 1);
      }
    }

    throw e;
  }
};

const api = {
  get: <T>(url: string, params?: AxiosRequestConfig) =>
    request<T>(() => axiosInstance.get<T>(url, params)),

  post: <T>(url: string, data: any, params?: AxiosRequestConfig) =>
    request<T>(() => axiosInstance.post<T>(url, data, params)),

  put: <T>(url: string, data: any, params?: AxiosRequestConfig) =>
    request<T>(() => axiosInstance.put<T>(url, data, params)),

  patch: <T>(url: string, data: any, params?: AxiosRequestConfig) =>
    request<T>(() => axiosInstance.patch<T>(url, data, params)),

  delete: <T>(url: string, params?: AxiosRequestConfig) =>
    request<T>(() => axiosInstance.delete<T>(url, params)),
};
export default api;
