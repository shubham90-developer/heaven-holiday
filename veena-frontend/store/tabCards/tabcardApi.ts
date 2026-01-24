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
  }),
});

export const { useGetAllTabCardsQuery } = tabCardsApi;
