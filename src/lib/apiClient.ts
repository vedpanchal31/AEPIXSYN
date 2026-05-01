import axios, { AxiosHeaders } from "axios";

export const apiClient = axios.create({
  baseURL: "https://api.unsplash.com",
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
  if (accessKey) {
    const headers = AxiosHeaders.from(config.headers);
    headers.set("Authorization", `Client-ID ${accessKey}`);
    config.headers = headers;
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
