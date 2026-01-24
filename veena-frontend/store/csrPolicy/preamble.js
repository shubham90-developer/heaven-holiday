import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const preambleApi = createApi({
  reducerPath: "preambleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/csr-preamble",
  }),
  tagTypes: ["Preamble"],
  endpoints: (builder) => ({
    // Get Preamble
    getPreamble: builder.query({
      query: () => "/preamble",
      providesTags: ["Preamble"],
    }),
  }),
});

export const { useGetPreambleQuery } = preambleApi;
