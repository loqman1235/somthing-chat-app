import {
  debugLog,
  getItemFromLocalStorage,
  setItemToLocalStorage,
} from "@/utils";
import axios from "axios";

const api = axios.create({
  baseURL: `https://chat-server-19vi.onrender.com/api`,
  withCredentials: true,
});

// Append Authorization header
api.interceptors.request.use((config) => {
  const accessToken = getItemFromLocalStorage("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Refresh token interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/verify-email/") &&
      !originalRequest.url.includes("/auth/signin")
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/auth/refresh-token");

        if (res.status === 200) {
          const { accessToken: newAccessToken } = res.data;

          setItemToLocalStorage("accessToken", newAccessToken);

          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

          return api(originalRequest);
        }
      } catch (error) {
        debugLog("Error while refreshing token", error);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
