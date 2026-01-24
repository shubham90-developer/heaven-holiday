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

    // Get FAQs by category
    getFAQsByCategory: builder.query({
      query: (category) => `/category/${category}`,
      providesTags: ["FAQ"],
    }),

    // Create category
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Category", "FAQ"],
    }),

    // Create FAQ
    createFAQ: builder.mutation({
      query: (data) => ({
        url: "/faq",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["FAQ"],
    }),

    // Update category
    updateCategory: builder.mutation({
      query: ({ categoryId, ...data }) => ({
        url: `/category/${categoryId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Category", "FAQ"],
    }),

    // Update FAQ
    updateFAQ: builder.mutation({
      query: ({ faqId, ...data }) => ({
        url: `/faq/${faqId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["FAQ"],
    }),

    // Delete category
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `/category/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category", "FAQ"],
    }),

    // Delete FAQ
    deleteFAQ: builder.mutation({
      query: (faqId) => ({
        url: `/faq/${faqId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FAQ"],
    }),
  }),
});

export const {
  useGetAllFAQsQuery,
  useGetAllCategoriesQuery,
  useGetFAQsByCategoryQuery,
  useCreateCategoryMutation,
  useCreateFAQMutation,
  useUpdateCategoryMutation,
  useUpdateFAQMutation,
  useDeleteCategoryMutation,
  useDeleteFAQMutation,
} = faqApi;
