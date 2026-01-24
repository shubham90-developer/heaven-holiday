import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const principlesApi = createApi({
  reducerPath: "principlesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/",
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  tagTypes: ["Principle"],
  endpoints: (builder) => ({
    // Get all principles
    getAllPrinciples: builder.query({
      query: () => "/principles",
      providesTags: ["Principle"],
    }),
  }),
});

export const { useGetAllPrinciplesQuery } = principlesApi;
