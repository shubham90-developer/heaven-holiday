// faqApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const csrfaqApi = createApi({
  reducerPath: "csrfaqApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/csr-faq",
  }),
  tagTypes: ["FAQ"],
  endpoints: (builder) => ({
    // Get all FAQs
    getAllFAQs: builder.query({
      query: () => "/",
      providesTags: ["FAQ"],
    }),
  }),
});

export const { useGetAllFAQsQuery } = csrfaqApi;
