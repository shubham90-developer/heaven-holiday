import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const galleryApi = createApi({
  reducerPath: "galleryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/gallery",
  }),
  endpoints: (builder) => ({
    getGallery: builder.query({
      query: () => "/",
    }),
  }),
});

export const { useGetGalleryQuery } = galleryApi;
