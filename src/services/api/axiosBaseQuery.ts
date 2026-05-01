import type { AxiosError, AxiosRequestConfig } from "axios";
import { apiClient } from "@/lib/apiClient";

type BaseQueryArgs = {
  url: string;
  method?: AxiosRequestConfig["method"];
  params?: AxiosRequestConfig["params"];
  data?: AxiosRequestConfig["data"];
  headers?: AxiosRequestConfig["headers"];
};

export const axiosBaseQuery =
  () =>
  async ({ url, method = "get", params, data, headers }: BaseQueryArgs) => {
    try {
      const result = await apiClient.request({ url, method, params, data, headers });
      return { data: result.data };
    } catch (axiosError) {
      const error = axiosError as AxiosError;
      return {
        error: {
          status: error.response?.status ?? "FETCH_ERROR",
          data: error.response?.data ?? error.message,
        },
      };
    }
  };

