import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const trendingDestinationsApi = createApi({
  reducerPath: "trendingDestinationsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/trending-destinations",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ["TrendingDestinations", "Destination"],
  endpoints: (builder) => ({
    getTrendingDestinations: builder.query({
      query: () => "/",
      providesTags: ["TrendingDestinations"],
    }),
  }),
});

export const { useGetTrendingDestinationsQuery } = trendingDestinationsApi;
