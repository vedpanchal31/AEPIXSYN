import { baseApi } from "@/services/api/baseApi";
import type { UnsplashPhoto, UnsplashSearchParams, UnsplashSearchResponse } from "@/services/unsplash/types";

export const unsplashApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    searchPhotos: build.query<UnsplashSearchResponse, UnsplashSearchParams>({
      query: ({ query, page = 1, perPage = 24, orientation, color, orderBy = "relevant" }) => ({
        url: "/search/photos",
        params: {
          query,
          page,
          per_page: perPage,
          orientation,
          color,
          order_by: orderBy,
        },
      }),
    }),
    getPhoto: build.query<UnsplashPhoto, string>({
      query: (id) => ({
        url: `/photos/${id}`,
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useSearchPhotosQuery, useLazySearchPhotosQuery, useGetPhotoQuery } = unsplashApi;
