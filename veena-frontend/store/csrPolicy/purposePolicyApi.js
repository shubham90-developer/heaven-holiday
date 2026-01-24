import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const purposePolicyApi = createApi({
  reducerPath: "purposePolicyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/csr-purpose-policy",
    prepareHeaders: (headers) => {
      // Don't set Content-Type for FormData - browser will set it automatically
      return headers;
    },
  }),
  tagTypes: ["PurposePolicy"],
  endpoints: (builder) => ({
    // Get Purpose Policy
    getPurposePolicy: builder.query({
      query: () => "/",
      providesTags: ["PurposePolicy"],
    }),
  }),
});

export const { useGetPurposePolicyQuery } = purposePolicyApi;
