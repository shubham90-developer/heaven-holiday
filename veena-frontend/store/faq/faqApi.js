// redux/api/faq/faqApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const faqApi = createApi({
  reducerPath: "faqApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/faqs",
  }),
  tagTypes: ["FAQ", "Category"],
  endpoints: (builder) => ({
    // Get all FAQs and categories
    getAllFAQs: builder.query({
      query: () => "/",
      providesTags: ["FAQ"],
    }),

    // Get only categories
    getAllCategories: builder.query({
      query: () => "/categories",
      providesTags: ["Category"],
    }),
  }),
});

export const { useGetAllFAQsQuery, useGetAllCategoriesQuery } = faqApi;
