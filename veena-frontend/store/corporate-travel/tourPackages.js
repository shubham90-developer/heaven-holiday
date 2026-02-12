import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tourApi = createApi({
  reducerPath: "tourApi",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/tour-package", // 👈 change if needed
  }),

  endpoints: (builder) => ({
    getTourPackages: builder.query({
      query: () => ({
        url: "/tour-package-cards", // 👈 your GET route
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTourPackagesQuery } = tourApi;
