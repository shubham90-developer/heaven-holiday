import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const heroBannerApi = createApi({
  reducerPath: "heroBannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/hero-banner",
  }),
  tagTypes: ["HeroBanner"],
  endpoints: (builder) => ({
    getHeroBanner: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["HeroBanner"],
    }),
  }),
});

export const { useGetHeroBannerQuery } = heroBannerApi;
