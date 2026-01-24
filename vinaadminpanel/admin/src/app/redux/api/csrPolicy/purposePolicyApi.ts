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

    // Update Main Fields
    updateMainFields: builder.mutation({
      query: (data) => ({
        url: "/main-fields",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["PurposePolicy"],
    }),

    // Add Card
    addCard: builder.mutation({
      query: (formData) => ({
        url: "/card",
        method: "POST",
        body: formData,
        // FormData will automatically set correct Content-Type with boundary
      }),
      invalidatesTags: ["PurposePolicy"],
    }),

    // Update Card
    updateCard: builder.mutation({
      query: (formData) => ({
        url: "/card",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["PurposePolicy"],
    }),

    // Delete Card
    deleteCard: builder.mutation({
      query: (id) => ({
        url: "/card",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["PurposePolicy"],
    }),
  }),
});

export const {
  useGetPurposePolicyQuery,
  useUpdateMainFieldsMutation,
  useAddCardMutation,
  useUpdateCardMutation,
  useDeleteCardMutation,
} = purposePolicyApi;
