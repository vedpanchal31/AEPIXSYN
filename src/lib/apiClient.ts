import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.unsplash.com",
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  if (accessKey) {
    config.headers = (config.headers ?? {}) as any;
    (config.headers as any).Authorization = `Client-ID ${accessKey}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.errors?.[0] ??
      error?.response?.data?.error ??
      error?.message ??
      "Request failed";

    return Promise.reject(Object.assign(error, { message }));
  }
);
