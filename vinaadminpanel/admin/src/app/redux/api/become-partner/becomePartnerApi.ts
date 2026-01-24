import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cardApi = createApi({
  reducerPath: "cardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/v1/api/become-partner",
  }),
  tagTypes: ["Card"],
  endpoints: (builder) => ({
    getAllCards: builder.query({
      query: () => "/",
      providesTags: ["Card"],
    }),
    createCard: builder.mutation({
      query: (formData) => ({
        url: "/",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Card"],
    }),
    updateCard: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: formData,
      }),
      invalidatesTags: ["Card"],
    }),
    deleteCard: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Card"],
    }),
  }),
});

export const {
  useGetAllCardsQuery,
  useCreateCardMutation,
  useUpdateCardMutation,
  useDeleteCardMutation,
} = cardApi;
