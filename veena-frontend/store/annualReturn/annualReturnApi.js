// features/annualReturn/annualReturnApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const annualReturnApi = createApi({
  reducerPath: "annualReturnApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/annual-return",
  }),
  tagTypes: ["AnnualReturn"],
  endpoints: (builder) => ({
    getAnnualReturn: builder.query({
      query: () => ({
        url: "/annual-return",
        method: "GET",
      }),
      providesTags: ["AnnualReturn"],
    }),
  }),
});

export const { useGetAnnualReturnQuery } = annualReturnApi;
