import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const managementApi = createApi({
  reducerPath: "managementApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/csr-management",
  }),
  tagTypes: ["Management"],
  endpoints: (builder) => ({
    // Get Management
    getManagement: builder.query({
      query: () => "/management",
      providesTags: ["Management"],
    }),

    // Update Main Fields
    updateMainFields: builder.mutation({
      query: (data) => ({
        url: "/management/main-fields",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Management"],
    }),

    // Add Card
    addCard: builder.mutation({
      query: (formData) => ({
        url: "/management/card",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Management"],
    }),

    // Update Card
    updateCard: builder.mutation({
      query: (formData) => ({
        url: "/management/card",
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["Management"],
    }),

    // Delete Card
    deleteCard: builder.mutation({
      query: (id) => ({
        url: "/management/card",
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Management"],
    }),
  }),
});

export const {
  useGetManagementQuery,
  useUpdateMainFieldsMutation,
  useAddCardMutation,
  useUpdateCardMutation,
  useDeleteCardMutation,
} = managementApi;
