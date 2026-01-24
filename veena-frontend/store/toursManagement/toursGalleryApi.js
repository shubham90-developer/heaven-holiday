// features/gallery/galleryApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const toursGalleryApi = createApi({
  reducerPath: "toursGalleryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/tours-gallery",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ["Gallery", "Images"],
  endpoints: (builder) => ({
    getGallery: builder.query({
      query: () => "/gallery",
      providesTags: ["Gallery"],
    }),
  }),
});

export const { useGetGalleryQuery } = toursGalleryApi;
