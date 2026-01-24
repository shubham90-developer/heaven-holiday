import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tourPackageApi = createApi({
  reducerPath: "tourPackageApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/tour-package",
  }),
  tagTypes: ["TourPackage", "PackageCard"],
  endpoints: (builder) => ({
    // Get tour package (with all cards)
    getTourPackage: builder.query({
      query: () => "/",
      providesTags: ["TourPackage"],
    }),
  }),
});

export const { useGetTourPackageQuery } = tourPackageApi;
