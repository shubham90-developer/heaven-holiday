import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tourManagerDirectoryApi = createApi({
  reducerPath: "tourManagerDirectoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/tour-manager-team",
  }),
  tagTypes: ["TourManagerDirectory", "Manager"],
  endpoints: (builder) => ({
    // Get tour manager directory (with optional search, letter, and status filter)
    getTourManagerDirectory: builder.query({
      query: () => ({
        url: "/",
      }),
      providesTags: ["TourManagerDirectory"],
    }),
  }),
});

export const { useGetTourManagerDirectoryQuery } = tourManagerDirectoryApi;
