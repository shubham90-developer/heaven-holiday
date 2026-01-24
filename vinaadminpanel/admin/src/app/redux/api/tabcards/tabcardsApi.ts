// redux/api/tabcards/tabCardsApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tabCardsApi = createApi({
  reducerPath: "tabCardsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/tab-cards",
  }),
  tagTypes: ["TabCards"],
  endpoints: (builder) => ({
    // Get all tab cards
    getAllTabCards: builder.query({
      query: () => "/",
      providesTags: ["TabCards"],
    }),

    // Get cards by category
    getCardsByCategory: builder.query({
      query: (category) => `/category/${category}`,
      providesTags: ["TabCards"],
    }),

    // Create tab card
    createTabCard: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["TabCards"],
    }),

    // Update tab card
    updateTabCard: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["TabCards"],
    }),

    // Delete tab card
    deleteTabCard: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["TabCards"],
    }),
  }),
});

export const {
  useGetAllTabCardsQuery,
  useGetCardsByCategoryQuery,
  useCreateTabCardMutation,
  useUpdateTabCardMutation,
  useDeleteTabCardMutation,
} = tabCardsApi;
