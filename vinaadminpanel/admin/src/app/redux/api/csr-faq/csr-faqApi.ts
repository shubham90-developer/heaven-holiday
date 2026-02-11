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

    // Create FAQ
    createFAQ: builder.mutation({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["FAQ"],
    }),

    // Update FAQ
    updateFAQ: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["FAQ"],
    }),

    // Delete FAQ
    deleteFAQ: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FAQ"],
    }),
  }),
});

export const {
  useGetAllFAQsQuery,
  useCreateFAQMutation,
  useUpdateFAQMutation,
  useDeleteFAQMutation,
} = csrfaqApi;
